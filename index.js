require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

// Importing the pages
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

    // Person Number is required for the automation
    const { personNumber } = req.body;

    if (!personNumber) {
        await browser.close();
        return res.status(400).json({ error: 'Person Number is Missing!' });
    }
    // Continue with your Puppeteer automation using the extracted values

    try {
        const browser = await puppeteer.launch({ headless: false }); // Set true if you don't want UI
        const page = await browser.newPage();
        
        //Login to Oracle Fusion
        await Login(page, url, username, password);

        // Navigate to Person Management page
        await PersonManagement(page, personNumber);

        // Award Compensation
        await awardCompensation(
            page,
            req.body,
            res,
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
            browser
        );

        //Delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        //Continue
        await page.waitForFunction(() => {
            const buttons = Array.from(document.querySelectorAll('a[role="button"]'));
            return buttons.some(btn => btn.innerText.replace(/\s+/g, '').includes('Continue'));
        }, { timeout: 30000 });

        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('a[role="button"]'));
            for (let btn of buttons) {
                if (btn.innerText.replace(/\s+/g, '').includes('Continue')) {
                    btn.focus();
                    btn.click();
                    break;
                }
            }
        });

        //Delay
         await new Promise(resolve => setTimeout(resolve, 3000));

        //submit
        await page.waitForFunction(() => {
            const buttons = Array.from(document.querySelectorAll('a[role="button"]'));
            return buttons.some(btn => btn.innerText.replace(/\s+/g, '').includes('Submit'));
        }, { timeout: 30000 });

        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('a[role="button"]'));
            for (let btn of buttons) {
                if (btn.innerText.replace(/\s+/g, '').includes('Submit')) {
                    btn.focus();
                    btn.click();
                    break;
                }
            }
        });

        // Delay for submission
        await new Promise(resolve => setTimeout(resolve, 3000));

        //final submit
        await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okWarningDialog', { timeout: 30000 });
        await page.evaluate(() => {
            const btn = document.querySelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okWarningDialog');
            if (btn) {
                btn.focus();
                btn.click();
            }
        });

        // Delay for submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        //final ok button
        await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okConfirmationDialog');
        await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okConfirmationDialog');


        // Close the browser
        // await browser.close();
        
        // Respond with success
        res.json({ success: true, message: 'Request has been Successfully Submitted in Oracle Fusion' });
    } catch (error) {
        // Handle any errors that occur during the automation
        console.error('Automation Error:', error);
        res.status(500).json({ success: false, message: 'Automation failed', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
