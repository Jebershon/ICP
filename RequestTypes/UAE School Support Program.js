async function UAESchoolSupportProgram(browser, page, body, res) {
    // Destructure required fields from req.body
    const { 
        plan, 
        option, 
        ToDate, 
        Fromdate, 
        AcademicYear, 
        ClaimType, 
        SchoolFeeType, 
        PaidAmount, 
        Child 
    } = body;

    // Validate required fields
    const missingFields = [];
    if (!ToDate) missingFields.push('ToDate');
    if (!Fromdate) missingFields.push('Fromdate');
    if (!AcademicYear) missingFields.push('AcademicYear');
    if (!ClaimType) missingFields.push('ClaimType');
    if (!PaidAmount) missingFields.push('PaidAmount');
    if (!Child) missingFields.push('Child');
    if (missingFields.length > 0) {
        await browser.close();
        return res.status(400).json({ success:false,error: "Missing required field(s): "+missingFields.join(', ')});
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
    // Academic Year select dropdown 
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:drop');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((AcademicYear) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === AcademicYear) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, AcademicYear); 
    await page.keyboard.press('Tab');
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Error occurred while selecting Academic Year (retrying):", error);
            // Academic Year select dropdown 
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:drop');
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((AcademicYear) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === AcademicYear) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, AcademicYear); 
            await page.keyboard.press('Tab');
        }else{
            await browser.close();
            console.log("Error occurred while selecting Academic Year:", error);
            res.status(400).json({success: false, error: "Error occurred while selecting Academic Year." });
        }
    }

    try {
    // Claim Type (main section, evIter:31)
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // short delay for stability
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop',{ visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop',{ visible: true });
    await page.evaluate((ClaimType) => {
    const options = document.querySelectorAll(
        '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop li'
    );
    for (let option of options) {
        if (option.innerText.trim() === ClaimType) { // "Tuition", "Books", "Transport"
        option.scrollIntoView();
        option.click();
        break;
        }
    }
    }, ClaimType);
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Error occurred while selecting Claim Type (retrying):", error);
            // Claim Type (main section, evIter:31)
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // short delay for stability
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop',{ visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop');
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop',{ visible: true });
            await page.evaluate((ClaimType) => {
            const options = document.querySelectorAll(
                '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop li'
            );
            for (let option of options) {
                if (option.innerText.trim() === ClaimType) { // "Tuition", "Books", "Transport"
                option.scrollIntoView();
                option.click();
                break;
                }
            }
            }, ClaimType);

        }else{
            await browser.close();
            console.log("Error occurred while selecting Claim Type:", error);
            res.status(400).json({ success: false, error: "Error occurred while selecting Claim Type." });
        }
    }

    if(SchoolFeeType !== '' || SchoolFeeType !== null || SchoolFeeType !== undefined){
    try{
    // School Fee Type (main section, evIter:32)
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // small pause for stability
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:drop',{ visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:drop');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:pop',{ visible: true });
    await page.evaluate((SchoolFeeType) => {
    const options = document.querySelectorAll(
        '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:pop li'
    );
    for (let option of options) {
        if (option.innerText.trim() === SchoolFeeType) { // e.g., "Monthly"
        option.scrollIntoView();
        option.click();
        break;
        }
    }
    }, SchoolFeeType);
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Error occurred while selecting School Fee Type (retrying):", error);
            // School Fee Type (main section, evIter:32)
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // small pause for stability
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:drop',{ visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:drop');
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:pop',{ visible: true });
            await page.evaluate((SchoolFeeType) => {
            const options = document.querySelectorAll(
                '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:lovScreenEntryValue\\:\\:pop li'
            );
            for (let option of options) {
                if (option.innerText.trim() === SchoolFeeType) { // e.g., "Monthly"
                option.scrollIntoView();
                option.click();
                break;
                }
            }
            }, SchoolFeeType);
        }else{
            await browser.close();
            console.log("Error occurred while selecting School Fee Type:", error);
            res.status(400).json({success: false, error: "Error occurred while selecting School Fee Type." });
        }
    }
    }

    // -------- From Date --------
    const inputSelectorFromDateMain = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:33\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorFromDateMain, { visible: true });
    await page.click(inputSelectorFromDateMain, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorFromDateMain, Fromdate); // e.g. "09/01/2025"
    await page.keyboard.press('Tab');

    // -------- To Date --------
    const inputSelectorToDateMain = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:34\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorToDateMain, { visible: true });
    await page.click(inputSelectorToDateMain, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorToDateMain, ToDate); // e.g. "09/30/2025"
    await page.keyboard.press('Tab');

    // -------- Paid Amount --------
    const inputSelectorPaidAmountMain = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:35\\:screenEntryValueNumber\\:\\:content"]';
    await page.waitForSelector(inputSelectorPaidAmountMain, { visible: true });
    await page.click(inputSelectorPaidAmountMain, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorPaidAmountMain, PaidAmount); // e.g. "5000"
    await page.keyboard.press('Tab');

    // Delay 
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    try{
    // -------- Child --------
    const inputSelectorChildMain = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:ValueSetScreenEntryValue1\\:\\:content"]';
    await page.waitForSelector(inputSelectorChildMain, { visible: true });
    await page.click(inputSelectorChildMain, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorChildMain, Child); // e.g. "2"

    // Wait for the suggestions to appear
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:ValueSetScreenEntryValue1\\:\\:_afrautosuggestpopup li[role="option"]', { visible: true });
    const childFound = await page.evaluate((selector, childName) => {
    const items = document.querySelectorAll(selector);
    for (let item of items) {
        if (item.innerText.trim() === childName) {
        item.click();
        return true; // Found and clicked
        }
        if (item.innerText.trim().toLowerCase() === "No results found.".toLowerCase()) {
        return false;
        }
    }
    return false; // Not found
    }, '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:ValueSetScreenEntryValue1\\:\\:_afrautosuggestpopup li[role="option"]', Child);
    if (!childFound) {
    throw new Error("No child exist with this provided name: " + Child);
    }
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying selecting Child:", error);
            // -------- Child --------
            const inputSelectorChildMain = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:ValueSetScreenEntryValue1\\:\\:content"]';
            await page.waitForSelector(inputSelectorChildMain, { visible: true });
            await page.click(inputSelectorChildMain, { clickCount: 3 });
            await page.keyboard.press('Backspace');
            await page.type(inputSelectorChildMain, Child); // e.g. "2"

            // Wait for the suggestions to appear
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:ValueSetScreenEntryValue1\\:\\:_afrautosuggestpopup li[role="option"]', { visible: true });
            const childFound = await page.evaluate((selector, childName) => {
            const items = document.querySelectorAll(selector);
            for (let item of items) {
                if (item.innerText.trim() === childName) {
                item.click();
                return true; // Found and clicked
                }
                if (item.innerText.trim().toLowerCase() === "No results found.".toLowerCase()) {
                return false;
                }
            }
            return false; // Not found
            }, '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:ValueSetScreenEntryValue1\\:\\:_afrautosuggestpopup li[role="option"]', Child);
            if (!childFound) {
            throw new Error("No child exist with this provided name: " + Child);
            }
        }else{
            await browser.close();
            console.log("Error occurred while selecting Child:", error);
            res.status(400).json({success: false, error: "Error occurred while selecting Child." });
        }
    }
    
    //Wait for error popup
    try{
        await page.waitForSelector('#DhtmlZOrderManagerLayerContainer #_FOd1\\:\\:popup-container', { visible: true, timeout: 3000 });
        errorMessage = await page.$eval('#_FOd1\\:\\:msgDlg\\:\\:_ccntr .x1mu span',(el) => el.textContent.trim());
        await page.click('#_FOd1\\:\\:msgDlg\\:\\:cancel');
        await browser.close();
        return res.status(200).json({ success:true,message: errorMessage });
    } catch (error) {
        console.log('No error message displayed, proceeding with the request.');
    }
}

module.exports = UAESchoolSupportProgram;