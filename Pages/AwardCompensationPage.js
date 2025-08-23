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
        return res.status(400).json({ success: false, error: 'Plan is Missing!' });
    }
    
    try{
    await page.$eval(
    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:commandToolbarButton1 a',
    el => el.click()
    );
    }
    catch(error){
        await page.waitForSelector('tr.p_AFReadOnly td.x51');
        // Extract the messages
        const messages = await page.evaluate(() => {
        const elements = document.querySelectorAll('tr.p_AFReadOnly td.x51');
        return Array.from(elements).map(el => el.innerText.trim()).filter(Boolean);
        });
        await browser.close();
        return res.status(400).json({ success: false, error: 'Warning - Individual Compensation: ' + messages.join(', ') });
    }

    try{
    // Wait for Modal
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:CreatePopup\\:\\:popup-container', { visible: true });
    }
    catch(error){
    // Clicking the Award Compensation Button
    console.log('No modal found, clicking the button again.');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:commandToolbarButton1', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:commandToolbarButton1 a');
    }

    console.log('plan name:', plan);

    //Call function based on plan name
    if (plan === 'IND Communication Allowance') { 
        await INDCommunicationAllowance(browser, page, body, res);
    }
    else if (plan === 'IND Overtime Request') { 
        await INDOvertimeRequest(browser, page, body, res);
    }
    else if (plan === 'KSA Business Trip Request') { 
        await KSABusinessTripRequest(browser, page, body, res);
    }
    else if (plan === 'KSA Communication allowance') { 
        await KSACommunicationAllowance(browser, page, body, res);
    }  
    else if (plan === 'KSA Overtime Request') { 
        await KSAOvertimeRequest(browser, page, body, res);
    }
    else if (plan === 'KSA School Support Program') { 
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
        return res.status(400).json({ success: false, error: 'Invalid plan name' });
    }

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

   // Submit request button
    const submitButtonSelector = '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:d2\\:\\:ok';
    await page.waitForSelector(submitButtonSelector, { visible: true });
    await page.click(submitButtonSelector);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    //Wait for error popup
    const errorSelector = '[id*="msgDlg"] [class*="x1mu"]';
    for (let i = 0; i < 3; i++) {
    try {
        await page.waitForSelector(errorSelector, { visible: true, timeout: 2000 });
        const errorText = await page.$eval(errorSelector, el => el.innerText.trim());
        await browser.close();
        return res.status(400).json({ success: false, error: errorText });
    } catch (e) {
        await new Promise(r => setTimeout(r, 1000));
        console.log('attempting to find error message : ' + i);
    }
    }
    
    // Wait for the confirmation message
    try{
        await page.waitForSelector('#DhtmlZOrderManagerLayerContainer #_FOd1\\:\\:popup-container', { visible: true, timeout: 3000 });
        errorMessage = await page.$eval('#_FOd1\\:\\:msgDlg\\:\\:_ccntr .x1mu span',(el) => el.textContent.trim());
        await page.click('#_FOd1\\:\\:msgDlg\\:\\:cancel');
        browser.close();
        return res.status(400).json({ success: false, error: errorMessage });
    } catch (error) {
        console.log('No error message displayed, proceeding with the request.');
    }
}
module.exports = awardCompensation;