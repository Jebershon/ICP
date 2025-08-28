const { error } = require("winston");
const AutomationError = require("../Utils/CustomError");

async function KSAOvertimeRequest(browser, page, body, res, plan, personNumber, RequestID, HandleResponse) {
    // Destructure required fields from req.body
    const { option, ToDate, Fromdate, RequestedOvertimeRegular, RequestedOvertimeWeekend, RequestedOvertimePublicHolidays, Comments, Information } = body;

    console.log('validating fields of :' + plan);

    // Validate required fields
    if (
        !option || !ToDate || !Fromdate || !Comments || !RequestedOvertimeRegular
    ) {
        // Find which fields are missing
        const missingFields = [];
        if (!option) missingFields.push('option');
        if (!ToDate) missingFields.push('ToDate');
        if (!Fromdate) missingFields.push('Fromdate');
        if (!Comments) missingFields.push('Comments');
        if (!RequestedOvertimeRegular) missingFields.push('RequestedOvertimeRegular');
        throw new AutomationError('Missing required field(s): ' + missingFields.join(', '), plan, personNumber, RequestID);
    }

    //Begin form
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

    try {
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
    } catch (error) {
        console.error('plan may not available:', error);
        throw new AutomationError('plan may not available', plan, personNumber, RequestID);
    }

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

    try {
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
        await page.type(inputSelector4, RequestedOvertimeRegular + '');

        if (RequestedOvertimeWeekend !== '' || RequestedOvertimeWeekend !== null) {
            // Requested Overtime Weekend
            const inputSelector5 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:screenEntryValue\\:\\:content"]';
            await page.waitForSelector(inputSelector5, { visible: true });
            await page.click(inputSelector5, { clickCount: 3 }); // Optional: Select all to replace existing value
            await page.type(inputSelector5, RequestedOvertimeWeekend + '');
        }

        if (RequestedOvertimePublicHolidays !== '' || RequestedOvertimePublicHolidays !== null) {
            // Requested Overtime Public Holidays
            const inputSelector6 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:screenEntryValue\\:\\:content"]';
            await page.waitForSelector(inputSelector6, { visible: true });
            await page.click(inputSelector6, { clickCount: 3 }); // Selects the whole existing text if any
            await page.type(inputSelector6, RequestedOvertimePublicHolidays + '');
            await page.keyboard.press('Tab');
        }

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

        // Comments
        const inputSelector7 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:11\\:screenEntryValue\\:\\:content"]';
        await page.waitForSelector(inputSelector7, { visible: true });
        await page.click(inputSelector7, { clickCount: 3 }); // Optional: selects existing value
        await page.type(inputSelector7, Comments + '');

        // Information
        const inputSelector8 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:12\\:screenEntryValue\\:\\:content"]';
        await page.waitForSelector(inputSelector8, { visible: true });
        await page.click(inputSelector8, { clickCount: 3 }); // Optional: select existing value
        await page.type(inputSelector8, Information + '');
        await page.keyboard.press('Tab');
    } catch (error) {
        console.error('Retrying..|Error filling out form:' + plan);
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
        await page.type(inputSelector4, RequestedOvertimeRegular + '');

        if (RequestedOvertimeWeekend !== '' || RequestedOvertimeWeekend !== null) {
            // Requested Overtime Weekend
            const inputSelector5 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:screenEntryValue\\:\\:content"]';
            await page.waitForSelector(inputSelector5, { visible: true });
            await page.click(inputSelector5, { clickCount: 3 }); // Optional: Select all to replace existing value
            await page.type(inputSelector5, RequestedOvertimeWeekend + '');
        }

        if (RequestedOvertimePublicHolidays !== '' || RequestedOvertimePublicHolidays !== null) {
            // Requested Overtime Public Holidays
            const inputSelector6 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:screenEntryValue\\:\\:content"]';
            await page.waitForSelector(inputSelector6, { visible: true });
            await page.click(inputSelector6, { clickCount: 3 }); // Selects the whole existing text if any
            await page.type(inputSelector6, RequestedOvertimePublicHolidays + '');
            await page.keyboard.press('Tab');
        }

        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

        // Comments
        const inputSelector7 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:11\\:screenEntryValue\\:\\:content"]';
        await page.waitForSelector(inputSelector7, { visible: true });
        await page.click(inputSelector7, { clickCount: 3 }); // Optional: selects existing value
        await page.type(inputSelector7, Comments + '');

        // Information
        const inputSelector8 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:12\\:screenEntryValue\\:\\:content"]';
        await page.waitForSelector(inputSelector8, { visible: true });
        await page.click(inputSelector8, { clickCount: 3 }); // Optional: select existing value
        await page.type(inputSelector8, Information + '');
        await page.keyboard.press('Tab');
    }

    //Wait for error popup
    try {
        await page.waitForSelector('#DhtmlZOrderManagerLayerContainer #_FOd1\\:\\:popup-container', { visible: true, timeout: 3000 });
        errorMessage = await page.$eval('#_FOd1\\:\\:msgDlg\\:\\:_ccntr .x1mu span', (el) => el.textContent.trim());
        await page.click('#_FOd1\\:\\:msgDlg\\:\\:cancel');
        throw new AutomationError(errorMessage, plan, personNumber, RequestID);
    } catch (error) {
        if (error instanceof AutomationError) {
            throw new AutomationError(error.message, error.plan, error.personNumber, error.RequestID);
        }
        console.log('No error message displayed, proceeding with the request.');
    }
}

module.exports = KSAOvertimeRequest;