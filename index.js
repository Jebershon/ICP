require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

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

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Endpoint to automate login and perform actions
app.post('/automate-login', async (req, res) => {
    const url = process.env.URL;
    const username = process.env.GCPUSERNAME;
    const password = process.env.GCPPASSWORD;
    try {
    // Continue with your Puppeteer automation using the extracted values
    try {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']}); // Set true if you don't want UI
        const page = await browser.newPage();
        await Scenario(res,req.body,page, browser, username, password,url,
        Login, 
        PersonManagement, 
        awardCompensation,
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
        return res.status(200).json({ success: true, message: 'Request has been Successfully Submitted in Oracle Fusion' });
    } catch (error) {
        // Handle any errors that occur during the automation
        console.error('Automation Error:', error);
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')) {
            const url = process.env.URL;
            const username = process.env.GCPUSERNAME;
            const password = process.env.GCPPASSWORD;
            const browser = await puppeteer.launch({ headless: false }); // Set true if you don't want UI
            const page = await browser.newPage();
            await page.reload({ waitUntil: 'networkidle2' });
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 10000)));
            await Scenario(res,req.body,page, browser, username, password,url,
            Login, 
            PersonManagement, 
            awardCompensation,
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
        return res.status(200).json({ success: true, message: 'Request has been Successfully Submitted in Oracle Fusion' });
        }
        else{
        return res.status(400).json({ success: false, error: 'Automation failed : Please try Again!, '+error.message });
        }
    }
    }
    catch(error){
        console.error('Error occurred during automation:', error);
        return res.status(400).json({ success: false, error: 'Automation failed : Please try Again!, '+error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment Variables: URL=${process.env.URL}, GCPUSERNAME=${process.env.GCPUSERNAME}, GCPPASSWORD=${process.env.GCPPASSWORD}`);
});
