async function Scenario(res,body,page, browser, username, password,url, Login, PersonManagement, awardCompensation,
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
) {
        // Person Number is required for the automation
        const { personNumber } = body;

        if (!personNumber) {
            await browser.close();
            return res.status(500).json({ error: 'Person Number is Missing!' });
        }

        //Login to Oracle Fusion
        await Login(page, url, username, password);

        // Navigate to Person Management page
        await PersonManagement(page, personNumber);

        // Award Compensation
        await awardCompensation(
            page,            
            browser,
            body,
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
            UAESchoolSupportProgram
        );

        //Delay
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

        //Continue
        await page.waitForFunction(() => {
            const buttons = Array.from(document.querySelectorAll('a[role="button"]'));
            return buttons.some(btn => btn.innerText.replace(/\s+/g, '').includes('Continue'));
        }, { timeout: 4000 });

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

        //submit
        await page.waitForFunction(() => {
            const buttons = Array.from(document.querySelectorAll('a[role="button"]'));
            return buttons.some(btn => btn.innerText.replace(/\s+/g, '').includes('Submit'));
        }, { timeout: 4000 });
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

        // Wait for the warning
        await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okWarningDialog', 
        { timeout: 4000 });
        await page.evaluate(() => {
            const btn = document.querySelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okWarningDialog');
            if (btn) {
                btn.focus();
                btn.click();
            }
        });

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 4000)));
        
        //final ok button
        await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okConfirmationDialog');
        await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:1\\:AP1\\:tt1\\:okConfirmationDialog');

        
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
        
        // Close the browser
        await browser.close();
}

module.exports = Scenario;