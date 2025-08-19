const { error } = require("winston");

async function UAEOvertimeRequest(browser, page, body, res) {
    // Destructure required fields from req.body
    const { plan, option, ToDate, Fromdate, RequestedOvertimeRegular, RequestedOvertimeWeekend, RequestedOvertimePublicHolidays, Comments, OvertimeProcessing, ASG_DATE} = body;

    // Validate required fields
    if (
        !plan || !option || !ToDate || !Fromdate || !Comments || !RequestedOvertimeRegular || !OvertimeProcessing
    ) {
        await browser.close();
        // Find which fields are missing
        const missingFields = [];
        if (!plan) missingFields.push('plan');
        if (!option) missingFields.push('option');
        if (!ToDate) missingFields.push('ToDate');
        if (!Fromdate) missingFields.push('Fromdate');
        if (!Comments) missingFields.push('Comments');
        if (!RequestedOvertimeRegular) missingFields.push('RequestedOvertimeRegular');
        if (!OvertimeProcessing) missingFields.push('OvertimeProcessing');
        return res.status(400).json({ success:false, error: 'Missing required fields: ' + missingFields.join(', ') });
    }

    //Begin form filling
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
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

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

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

    // From Date
    const fromDateSelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:2\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(fromDateSelector, { visible: true });
    await page.click(fromDateSelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(fromDateSelector, Fromdate); // Replace Fromdate with a string like "08/01/25"
    await page.keyboard.press('Tab');

    // To Date
    const toDateSelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(toDateSelector, { visible: true });
    await page.click(toDateSelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(toDateSelector, ToDate); // Replace `ToDate` with your actual variable or string like "08/31/25"
    await page.keyboard.press('Tab');

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

    // Requested Overtime Regular
    const inputSelector4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:7\\:screenEntryValueNumber\\:\\:content"]';
    await page.waitForSelector(inputSelector4, { visible: true });
    await page.click(inputSelector4, { clickCount: 3 }); // Optional: Select all to replace existing value
    await page.type(inputSelector4, RequestedOvertimeRegular+'');

    if(RequestedOvertimeWeekend !== '' || RequestedOvertimeWeekend !== null){
    // Requested Overtime Weekend
    const inputSelector5 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector5, { visible: true });
    await page.click(inputSelector5, { clickCount: 3 }); // Optional: Select all to replace existing value
    await page.type(inputSelector5, RequestedOvertimeWeekend+'');
    }

    if(RequestedOvertimePublicHolidays !== '' || RequestedOvertimePublicHolidays !== null){
    // Requested Overtime Public Holidays
    const inputSelector6 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector6, { visible: true });
    await page.click(inputSelector6, { clickCount: 3 }); // Selects the whole existing text if any
    await page.type(inputSelector6, RequestedOvertimePublicHolidays+'');
    await page.keyboard.press('Tab');
    }

    try{
    //Overtime Processing
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:drop',{ visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:drop',{ clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:pop',{ visible: true });
    await page.evaluate((OvertimeProcessingValue) => {
    const options = document.querySelectorAll('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:pop li');
    for (let option of options) {
        if (option.innerText.trim() === OvertimeProcessingValue) {
        option.scrollIntoView();
        option.click();
        break;
        }
    }
    }, OvertimeProcessing); // Example: "Pay Overtime" or "Compensate as Leave"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            //Overtime Processing
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:drop',{ visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:drop',{ clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:pop',{ visible: true });
            await page.evaluate((OvertimeProcessingValue) => {
            const options = document.querySelectorAll('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:lovScreenEntryValue\\:\\:pop li');
            for (let option of options) {
                if (option.innerText.trim() === OvertimeProcessingValue) {
                option.scrollIntoView();
                option.click();
                break;
                }
            }
            }, OvertimeProcessing); // Example: "Pay Overtime" or "Compensate as Leave"
        }else{
            await browser.close();
            console.log("Error occurred while selecting Overtime Processing:", error);
            res.status(400).json({success: false, error: "Error occurred while selecting Overtime Processing." });
        }
    }

    // Comments
    const inputSelector7 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:11\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector7, { visible: true });
    await page.click(inputSelector7, { clickCount: 3 }); // Optional: selects existing value
    await page.type(inputSelector7, Comments+'');

    if(ASG_DATE === '' || ASG_DATE === null){
    // ASG_Date
    const inputSelectorASGDate = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorASGDate, { visible: true });
    await page.click(inputSelectorASGDate, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorASGDate, ASG_DATE); // e.g., "09/15/2025"
    await page.keyboard.press('Tab');
    }

    //Wait for error popup
    try{
        await page.waitForSelector('#DhtmlZOrderManagerLayerContainer #_FOd1\\:\\:popup-container', { visible: true, timeout: 3000 });
        errorMessage = await page.$eval('#_FOd1\\:\\:msgDlg\\:\\:_ccntr .x1mu span',(el) => el.textContent.trim());
        await page.click('#_FOd1\\:\\:msgDlg\\:\\:cancel');
        await browser.close();
        return res.status(400).json({ success: false, error: errorMessage });
    } catch (error) {
        console.log('No error message displayed, proceeding with the request.');
    }
}

module.exports = UAEOvertimeRequest;