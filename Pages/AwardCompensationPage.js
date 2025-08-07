async function awardCompensation(page,browser,body, res,
        INDCommunicationAllowance,
        INDOvertimeRequest,
        KSABusinessTripRequest,
        KSACommunicationAllowance,
        KSAOvertimeRequest,
        KSASchoolSupportProgram,
        UAEBusinessTripRequest,
        UAECommunicationAllowance,
        UAEOvertimeRequest,
        UAESchoolSupportProgram) {

    // Destructure required fields from req.body
    const { plan } = body;

    // Validate required fields
    if (!plan) {
        await browser.close();
        return res.status(400).json({ error: 'Plan is Missing!' });
    }
    
    try{
    // Clicking the Award Compensation Button
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:commandToolbarButton1', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:commandToolbarButton1 a');
    }
    catch(error){
        await page.waitForSelector('tr.p_AFReadOnly td.x51');
        // Extract the messages
        const messages = await page.evaluate(() => {
        const elements = document.querySelectorAll('tr.p_AFReadOnly td.x51');
        return Array.from(elements).map(el => el.innerText.trim()).filter(Boolean);
        });
        return res.status(400).json({ error: 'Warning - Individual Compensation: ' + messages.join(', ') });
    }

    // Wait for Modal
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:CreatePopup\\:\\:popup-container', { visible: true });

    //Call function based on plan name
    if (plan === 'IND Communication Allowance') { //Completed
        await INDCommunicationAllowance(browser, page, body, res);
    }
    else if (plan === 'IND Overtime Request') { //Completed
        await INDOvertimeRequest(browser, page, body, res);
    }
    else if (plan === 'KSA Business Trip Request') { //in progress
        await KSABusinessTripRequest(browser, page, body, res);
    }
    else if (plan === 'KSA Communication allowance') { //Completed 
        await KSACommunicationAllowance(browser, page, body, res);
    }  
    else if (plan === 'KSA Overtime Request') { //Completed
        await KSAOvertimeRequest(browser, page, body, res);
    }
    else if (plan === 'KSA School Support Program') { //in progress
        await KSASchoolSupportProgram(browser, page, body, res);
    }   
    else if (plan === 'UAE Business Trip Request') {
        await UAEBusinessTripRequest(browser, page, body, res);
    }
    else if (plan === 'UAE Communication Allowance') {
        await UAECommunicationAllowance(browser, page, body, res);
    }
    else if (plan === 'UAE Overtime Request') {
        await UAEOvertimeRequest(browser, page, body, res);
    }
    else if (plan === 'UAE School Support Program') {
        await UAESchoolSupportProgram(browser, page, body, res);
    }
    else {
        await browser.close();
        return res.status(400).json({ error: 'Invalid plan name' });
    }

   // Submit request button
    const submitButtonSelector = '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:d2\\:\\:ok';
    await page.waitForSelector(submitButtonSelector, { visible: true });
    await page.click(submitButtonSelector, { delay: 1000 });

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // Wait for the confirmation message
    try{
        await page.waitForSelector('#DhtmlZOrderManagerLayerContainer #_FOd1\\:\\:popup-container', { visible: true, timeout: 3000 });
        errorMessage = await page.$eval('#_FOd1\\:\\:msgDlg\\:\\:_ccntr .x1mu span',(el) => el.textContent.trim());
        await page.click('#_FOd1\\:\\:msgDlg\\:\\:cancel');
        browser.close();
        return res.status(200).json({ message: errorMessage });
    } catch (error) {
        console.log('No error message displayed, proceeding with the request.');
    }
}
module.exports = awardCompensation;