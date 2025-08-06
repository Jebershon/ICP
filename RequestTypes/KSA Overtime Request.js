async function KSAOvertimeRequest(browser, page, body, res) {
    // Destructure required fields from req.body
    const { plan, option, ToDate, Fromdate, RequestedOvertimeRegular, RequestedOvertimeWeekend, RequestedOvertimePublicHolidays, Comments, Information, SystemCalculatedRegularOvertime, SystemCalculatedWeekendOvertime, SystemCalculatedPublicHolidayOvertime } = body;

    // Validate required fields
    if (
        !plan || !option || !ToDate || !Fromdate || !Comments || !RequestedOvertimeRegular
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
        return res.status(400).json({ error: 'Missing required fields', missingFields });
    }
    
    //Begin form
    // Open Plans Dropdown
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc3\\:\\:drop');

    // Wait for List
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc3\\:\\:pop', { visible: true });

    // Set plan
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

    // Wait for List
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:soc4\\:\\:pop', { visible: true });

    // Set Option
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

    if(SystemCalculatedRegularOvertime !== undefined && SystemCalculatedRegularOvertime !== null && SystemCalculatedRegularOvertime !== '') {
    // System Calculated Regular Overtime	
    const inputSelector1 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:4\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector1, { visible: true });
    await page.click(inputSelector1, { clickCount: 3 }); // Optional: Select all to replace existing value
    await page.type(inputSelector1, SystemCalculatedRegularOvertime+'');
    }

    if(SystemCalculatedWeekendOvertime !== undefined && SystemCalculatedWeekendOvertime !== null && SystemCalculatedWeekendOvertime !== '') {
    // System Calculated Weekend Overtime
    const inputSelector2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:5\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector2, { visible: true });
    await page.click(inputSelector2, { clickCount: 3 }); // Optional: select existing text
    await page.type(inputSelector2, SystemCalculatedWeekendOvertime+'');
    }

    if(SystemCalculatedPublicHolidayOvertime !== undefined && SystemCalculatedPublicHolidayOvertime !== null && SystemCalculatedPublicHolidayOvertime !== '') {
    // System Calculated Public Holiday Overtime
    const inputSelector3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:6\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector3, { visible: true });
    await page.click(inputSelector3, { clickCount: 3 }); // Optional: Select all to replace existing value
    await page.type(inputSelector3, SystemCalculatedPublicHolidayOvertime+'');
    await page.keyboard.press('Tab');
    }

    // Requested Overtime Regular
    const inputSelector4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:7\\:screenEntryValueNumber\\:\\:content"]';
    await page.waitForSelector(inputSelector4, { visible: true });
    await page.click(inputSelector4, { clickCount: 3 }); // Optional: Select all to replace existing value
    await page.type(inputSelector4, RequestedOvertimeRegular+'');

    // Requested Overtime Weekend
    const inputSelector5 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector5, { visible: true });
    await page.click(inputSelector5, { clickCount: 3 }); // Optional: Select all to replace existing value
    await page.type(inputSelector5, RequestedOvertimeWeekend+'');

    // Requested Overtime Public Holidays
    const inputSelector6 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector6, { visible: true });
    await page.click(inputSelector6, { clickCount: 3 }); // Selects the whole existing text if any
    await page.type(inputSelector6, RequestedOvertimePublicHolidays+'');
    await page.keyboard.press('Tab');

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

    // Comments
    const inputSelector7 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:11\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector7, { visible: true });
    await page.click(inputSelector7, { clickCount: 3 }); // Optional: selects existing value
    await page.type(inputSelector7, Comments+'');

    // Information
    const inputSelector8 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:12\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector8, { visible: true });
    await page.click(inputSelector8, { clickCount: 3 }); // Optional: select existing value
    await page.type(inputSelector8, Information+'');
}

module.exports = KSAOvertimeRequest;