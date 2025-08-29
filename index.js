require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const axios = require('axios');

// Importing the pages
const Scenario = require('./Pages/Scenario');
const Login = require('./Pages/LoginPage');
const PersonManagement = require('./Pages/PersonManagementPage');
const awardCompensation = require('./Pages/AwardCompensationPage');

//importing the request types
const INDCommunicationAllowance = require('./RequestTypes/IND Communication Allowance');
const INDOvertimeRequest = require('./RequestTypes/IND Overtime Request');
const KSABuisnessTripRequest = require('./RequestTypes/KSA Business Trip Request');
const KSACommunicationAllowance = require('./RequestTypes/KSA Communication allowance');
const KSAOvertimeRequest = require('./RequestTypes/KSA Overtime Request');
const KSASchoolSupportProgram = require('./RequestTypes/KSA School Support Program');
const UAEBusinessTripRequest = require('./RequestTypes/UAE Business Trip Request');
const UAECommunicationAllowance = require('./RequestTypes/UAE Communication Allowance');
const UAEOvertimeRequest = require('./RequestTypes/UAE Overtime Request');
const UAESchoolSupportProgram = require('./RequestTypes/UAE School Support Program');
const AutomationError = require('./Utils/CustomError');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

//env variables
const PORT = process.env.PORT || 3000;
const url = process.env.ICP_NODE_URL;
const username = process.env.ICP_GCPUSERNAME;
const password = process.env.ICP_GCPPASSWORD;
const MendixEndpoint = process.env.MENDIX_ENDPOINT;
const XApiKey = process.env.X_API_KEY;
const now = new Date();

//Automate Function perform actions
async function automateAction(req, res) {
    const { plan, personNumber, RequestID } = req.body;
    const browser = await puppeteer.launch({ 
        headless: true, 
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage', 
            '--disable-gpu'] 
    }); // Set true if you don't want UI
    let page = await browser.newPage();
    try {
        try {
            await Scenario(res, req.body, page, browser, username, password, url, Login, PersonManagement, awardCompensation, HandleResponse,
                INDCommunicationAllowance,
                INDOvertimeRequest,
                KSABuisnessTripRequest,
                KSACommunicationAllowance,
                KSAOvertimeRequest,
                KSASchoolSupportProgram,
                UAEBusinessTripRequest,
                UAECommunicationAllowance,
                UAEOvertimeRequest,
                UAESchoolSupportProgram,
            );
            await browser.close();
            HandleResponse(plan, personNumber, RequestID, 'Success', 'Request has been Successfully Submitted in Oracle Fusion');
        } catch (error) {
            if (error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element') || error.message.includes('detached Frame') || error.message.includes('Cannot set headers after they are sent to the client')) {
                await browser.deleteCookie(...(await browser.cookies()));
                await page.close();
                page = await browser.newPage();
                console.error('Trying in new Browser page');
                await Scenario(res, req.body, page, browser, username, password, url, Login, PersonManagement, awardCompensation, HandleResponse,
                    INDCommunicationAllowance,
                    INDOvertimeRequest,
                    KSABuisnessTripRequest,
                    KSACommunicationAllowance,
                    KSAOvertimeRequest,
                    KSASchoolSupportProgram,
                    UAEBusinessTripRequest,
                    UAECommunicationAllowance,
                    UAEOvertimeRequest,
                    UAESchoolSupportProgram,
                );
                await browser.close();
                HandleResponse(plan, personNumber, RequestID, 'Success', 'Request has been Successfully Submitted in Oracle Fusion');
            }
            else {
                if (browser.isConnected()) {
                    await browser.close();
                }
                if (error instanceof AutomationError) {
                    console.error("Custom AutomationError handled: " + error.message);
                    HandleResponse(error.plan, error.personNumber, error.RequestID, error.status, error.message);
                } else {
                    console.error('Error occurred during automation: ' + error.message);
                    HandleResponse(plan, personNumber, RequestID, 'Failed', 'Automation failed : Please try Again!, ' + error.message);
                }
            }
        }
    }
    catch (error) {
        if (browser.isConnected()) {
            await browser.close();
        }
        if (error instanceof AutomationError) {
            console.error("Custom AutomationError handled: " + error.message);
            HandleResponse(error.plan, error.personNumber, error.RequestID, error.status, error.message);
        } else {
            console.error('Error occurred during automation : ' + error.message);
            HandleResponse(plan, personNumber, RequestID, 'Failed', 'Automation failed : Please try Again!, ' + error.message);
        }
    } finally {
        if (browser.isConnected()) {
            await browser.close();
        }
    }
}

//Mendix post API Handling
function HandleResponse(Plan, EmployeeID, RequestID, Status, Message) {
    const payload = {
        Plan: String(Plan),
        EmployeeID: String(EmployeeID),
        Status: String(Status),
        UpdatedDate: new Date().toISOString(),
        RequestID: String(RequestID),
        Message: String(Message)
    };
    console.log('payload:', JSON.stringify(payload, null, 2));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    if (XApiKey) {
        config.headers['x-api-key'] = XApiKey;
    }

    axios.post(MendixEndpoint, payload, config)
        .then(response => {
            if (response.status === 200) {
                console.log('Success:', response.data);
            }
        })
        .catch(error => {
            if (error.response) {
                console.error("Mendix Error:", error.response.status, error.response.data);
            } else {
                console.error("Error sending data to Mendix:", error.message);
            }
        });
}

// Endpoint to automate login and perform actions
app.post('/automate-login', async (req, res) => {
    automateAction(req, res);
    return res.status(200).json({ success: true, message: 'Request has been received Successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (process.env.ICP_NODE_URL && process.env.ICP_GCPUSERNAME && process.env.ICP_GCPPASSWORD && process.env.MENDIX_ENDPOINT) {
        console.log('env successfully recognized...');
    } else {
        console.error('One or more environment variables are missing.');
    }
});
