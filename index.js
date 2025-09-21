require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const envFilePath = path.resolve(__dirname, '.env');

// Importing the pages
const Scenario = require('./Pages/Scenario');
const Login = require('./Pages/LoginPage');
const PersonManagement = require('./Pages/PersonManagementPage');
const awardCompensation = require('./Pages/AwardCompensationPage');

//importing the request types
const INDCommunicationAllowance = require('./RequestTypes/IND Communication Allowance');
const INDOvertimeRequest = require('./RequestTypes/IND Overtime Request');
const INDBusinessTripRequest = require('./RequestTypes/IND Business Trip Request');
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

//count browser
function countBrowsers() {
    const procDir = "/proc";
    let count = 0;
    try {
        const pids = fs.readdirSync(procDir).filter(f => /^\d+$/.test(f)); // only numeric dirs (processes)
        for (const pid of pids) {
            try {
                const commPath = path.join(procDir, pid, "comm");
                const name = fs.readFileSync(commPath, "utf8").trim();
                if (name.includes("chrome") || name.includes("chromium")) {
                    count++;
                }
            } catch (e) {
            }
        }
    } catch (err) {
        console.error("Error scanning /proc:", err.message);
    }
    return count;
}

// Example: log every 5 seconds
setInterval(() => {
    console.log("Total browsers running:", countBrowsers());
}, 10000);

const activeBrowsers = new Set();

//Automate Function perform actions
async function automateAction(req, res) {
    const { plan, personNumber, RequestID } = req.body;
    const browser = await puppeteer.launch({
        headless: true,// Set true if you don't want UI
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-extensions',
            '--no-zygote',
            '--single-process']
    });
    activeBrowsers.add(browser);
    let page = await browser.newPage();
    try {
        try {
            await Scenario(res, req.body, page, browser, username, password, url, Login, PersonManagement, awardCompensation, HandleResponse,
                INDCommunicationAllowance,
                INDOvertimeRequest,
                INDBusinessTripRequest,
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
                    INDBusinessTripRequest,
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
        for (const browser of activeBrowsers) {
            try {
                await browser.close();
            } catch (err) {
                console.error('Unable to close the browser...');
            }
            activeBrowsers.delete(browser);
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

app.get('/', (req, res) => {
    res.send("Welcome to the Automation API");
});

app.get("/kill-browsers", async (req, res) => {
    try {
        execSync("pkill -f chrome");   // kills chrome & chromium processes
        res.send("✅ All Chrome/Chromium processes killed forcefully");
    } catch (err) {
        console.error("Error killing browsers:", err.message);
        res.status(500).send("❌ Failed to kill browsers");
    }
});

app.post('/update-env', (req, res) => {
    const updates = req.body; // Expecting { ICP_NODE_URL: "...", ICP_GCPUSERNAME: "...", ... }

    if (!updates || typeof updates !== 'object') {
        return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    let envContent = '';
    try {
        envContent = fs.readFileSync(envFilePath, 'utf-8');
    } catch (err) {
        console.error('Error reading .env file:', err);
        return res.status(500).json({ success: false, message: 'Failed to read .env file' });
    }

    // Update or add keys
    for (const [key, value] of Object.entries(updates)) {
        const regex = new RegExp(`^${key}=.*$`, 'm');

        if (envContent.match(regex)) {
            envContent = envContent.replace(regex, `${key}=${value}`);
        } else {
            envContent += `\n${key}=${value}`;
        }
    }

    try {
        fs.writeFileSync(envFilePath, envContent, 'utf-8');
        return res.status(200).json({ success: true, message: '.env updated successfully' });
    } catch (err) {
        console.error('Error writing .env file:', err);
        return res.status(500).json({ success: false, message: 'Failed to write .env file' });
    }
});

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
