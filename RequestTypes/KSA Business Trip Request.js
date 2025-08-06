async function KSABusinessTripRequest(page,body) {
    // Destructure required fields from req.body
    const { personNumber, plan, option, ToDate, Fromdate, Description, RequestedAmount} = body;

    // Validate required fields
     if (!personNumber || !ToDate || !Fromdate || !Description || !RequestedAmount || !plan ||!option) {
        await browser.close();
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
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

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    // To Date
    const dateSelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(dateSelector, { visible: true });
    await page.click(dateSelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(dateSelector, ToDate);

    // Description
    const inputSelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector, { visible: true });
    await page.click(inputSelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector, Description);

    // Requested Amount
    const numberInputSelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:screenEntryValueNumber\\:\\:content"]';
    await page.waitForSelector(numberInputSelector, { visible: true });
    await page.type(numberInputSelector, RequestedAmount);

    // From date
    const dateInputSelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:21\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(dateInputSelector, { visible: true });
    await page.click(dateInputSelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(dateInputSelector, Fromdate);

}

module.exports = KSABusinessTripRequest;