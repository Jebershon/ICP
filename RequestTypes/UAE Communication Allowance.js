async function UAECommunicationAllowance(browser, page, body, res) {
    // Destructure required fields from req.body
    const { plan, option, PaymentType, OverrideAmountAbsenceDays} = body;

    // Validate required fields
    const missingFields = [];
    if (!plan) missingFields.push('plan');
    if (!option) missingFields.push('option');  
    if (!PaymentType) missingFields.push('PaymentType');
    if (missingFields.length > 0) {
        await browser.close();
        return res.status(400).json({success: false, error: "Missing required field(s): "+missingFields.join(', ')});
    }

    // Open Plans Dropdown
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc3\\:\\:drop');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc3\\:\\:pop', { visible: true });
    await page.evaluate((plan) => {
        const items = document.querySelectorAll('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc3\\:\\:pop li');
        for (let item of items) {
            if (item.innerText.trim() === plan) {
                item.scrollIntoView();
                item.click();
                break;
            }
        }
    }, plan);

    // Validation Time for the plan
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Open Options Dropdown
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc4\\:\\:drop');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc4\\:\\:pop', { visible: true });
    await page.evaluate((option) => {
        const items = document.querySelectorAll('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc4\\:\\:pop li');
        for (let item of items) {
            if (item.innerText.trim() === option) {
                item.scrollIntoView();
                item.click();
                break;
            }
        }
    }, option);

    // Delay for option selection
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

    try{
    // Open Payment Type Dropdown
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:lovScreenEntryValue\\:\\:content');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((PaymentType) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:lovScreenEntryValue\\:\\:pop li'
        );

        for (let option of options) {
            if (option.innerText.trim() === PaymentType) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, PaymentType);
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retry payment type selection...");
            // Open Payment Type Dropdown
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:lovScreenEntryValue\\:\\:content');
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((PaymentType) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:lovScreenEntryValue\\:\\:pop li'
                );

                for (let option of options) {
                    if (option.innerText.trim() === PaymentType) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, PaymentType);
        }else{
            await browser.close();
            console.log("Error occurred while selecting Payment Type:", error);
            res.status(400).json({success: false, error: "Error occurred while selecting Payment Type." });
        }
    }

    if(OverrideAmountAbsenceDays !== '' || OverrideAmountAbsenceDays !== null){
    // Override Amount Absence Days
    await page.waitForSelector('input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:25\\:screenEntryValueNumber\\:\\:content"]', { visible: true });
    await page.click('input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:25\\:screenEntryValueNumber\\:\\:content"]', { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type('input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:25\\:screenEntryValueNumber\\:\\:content"]', OverrideAmountAbsenceDays); // e.g. "3"
    await page.keyboard.press('Tab');
    }


    //Wait for error popup
    try{
        await page.waitForSelector('#DhtmlZOrderManagerLayerContainer #_FOd1\\:\\:popup-container', { visible: true, timeout: 3000 });
        errorMessage = await page.$eval('#_FOd1\\:\\:msgDlg\\:\\:_ccntr .x1mu span',(el) => el.textContent.trim());
        await page.click('#_FOd1\\:\\:msgDlg\\:\\:cancel');
        await browser.close();
        return res.status(400).json({ success: false, message: errorMessage });
    } catch (error) {
        console.log('No error message displayed, proceeding with the request.');
    }
}

module.exports = UAECommunicationAllowance;