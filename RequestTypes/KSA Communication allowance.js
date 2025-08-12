async function KSACommunicationAllowance(browser, page, body, res) {
    // Destructure required fields from req.body
    const { plan, option, PaymentType } = body;

    // Validate required fields
    const missingFields = [];
    if (!plan) missingFields.push('plan');
    if (!option) missingFields.push('option');
    if (!PaymentType) missingFields.push('PaymentType');
    if (missingFields.length > 0) {
        await browser.close();
        return res.status(400).json({ error: `Missing required field(s): ${missingFields.join(', ')}` });
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
        if(error.message.includes('Node is detached from document')) {
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
            console.log("Error in Payment Type selection:", error);
            res.status(500).send("Error selecting Payment Type. Please try again.");
        }
    }

    //Wait for error popup
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

module.exports = KSACommunicationAllowance;