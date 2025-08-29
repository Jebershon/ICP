const AutomationError = require('../Utils/CustomError');

async function awardCompensation(page,browser,body, res, plan, personNumber, RequestID,
        HandleResponse,
        INDCommunicationAllowance,
        INDOvertimeRequest,
        INDBusinessTripRequest,
        KSABusinessTripRequest,
        KSACommunicationAllowance,
        KSAOvertimeRequest,
        KSASchoolSupportProgram,
        UAEBusinessTripRequest,
        UAECommunicationAllowance,
        UAEOvertimeRequest,
        UAESchoolSupportProgram) {
    try{
        await page.$eval(
        '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:commandToolbarButton1 a',
        el => el.click()
        );
    } catch(error){
        await page.waitForSelector('tr.p_AFReadOnly td.x51');
        // Extract the messages
        const messages = await page.evaluate(() => {
        const elements = document.querySelectorAll('tr.p_AFReadOnly td.x51');
        return Array.from(elements).map(el => el.innerText.trim()).filter(Boolean);
        });
        throw new AutomationError(`Warning : ${messages.join(', ')}`, plan, personNumber, RequestID);
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
        await INDCommunicationAllowance(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'IND Overtime Request') { 
        await INDOvertimeRequest(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'IND Business Trip') {
        await INDBusinessTripRequest(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'KSA Business Trip Request') { 
        await KSABusinessTripRequest(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'KSA Communication allowance') { 
        await KSACommunicationAllowance(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }  
    else if (plan === 'KSA Overtime Request') { 
        await KSAOvertimeRequest(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'KSA School Support Program') { 
        await KSASchoolSupportProgram(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }   
    else if (plan === 'UAE Business Trip Request') {
        await UAEBusinessTripRequest(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'UAE Communication Allowance') {
        await UAECommunicationAllowance(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'UAE Overtime Request') {
        await UAEOvertimeRequest(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else if (plan === 'UAE School Support Program') {
        await UAESchoolSupportProgram(browser, page, body, res, plan, personNumber, RequestID, HandleResponse);
    }
    else {
        throw new AutomationError('Invalid plan name: ' + plan, plan, personNumber, RequestID);
    }
    console.log('Form filled for plan:', plan);
    
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

   // Submit request button
    const submitButtonSelector = '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:d2\\:\\:ok';
    await page.waitForSelector(submitButtonSelector, { visible: true });
    await page.click(submitButtonSelector);
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
    
    try {
        await page.waitForSelector('[id*="popup-container"] [id*="msgDlg"] .x1mu span', { timeout: 5000 });
        const errorMessage = await page.$eval(
            '[id*="popup-container"] [id*="msgDlg"] .x1mu span',
            el => el.textContent.trim()
        );
        console.log("❌ Error popup detected:", errorMessage);
        throw new AutomationError(errorMessage, plan, personNumber, RequestID);
    } catch (error) {
        if (error instanceof AutomationError) {
            throw new AutomationError(error.message, error.plan, error.personNumber, error.RequestID);
        }
        console.error("No Error popup detected");
    }
}
module.exports = awardCompensation;





