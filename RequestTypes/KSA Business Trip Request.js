async function KSABusinessTripRequest(browser, page, body, res) {
    // Destructure required fields from req.body
    const {
        plan,
        option,
        PurposeofTravel,
        TravelLocation1,
        StartDate1,
        EndDate1,
        LeavingFrom1,
        Goingto1,
        FlightDuration1,
        TicketRequired1,
        DepartureTime1,
        DurationInDays1,
        TicketClass1,
        HotelBooking1,
        HotelPrice1,
        PerDiem1
    } = body;

    // Validate required fields individually and return specific error
    const requiredFields = {
        option,
        PurposeofTravel,
        TravelLocation1,
        StartDate1,
        EndDate1,
        LeavingFrom1,
        Goingto1,
        FlightDuration1
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            await browser.close();
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
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

    // Begin form

    // Purpose of Travel
    const screenEntrySelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:2\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(screenEntrySelector, { visible: true });
    await page.click(screenEntrySelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(screenEntrySelector, PurposeofTravel);

    // Travel Type Dropdown
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:content');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TravelLoc) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:pop li'
        );

        for (let option of options) {
            if (option.innerText.trim() === TravelLoc) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TravelLocation1);

    // Start Date1
    const inputSelector1 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:4\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelector1, { visible: true });
    await page.click(inputSelector1, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector1, StartDate1); 

    // End Date1
    const inputSelector2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:5\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelector2, { visible: true });
    await page.click(inputSelector2, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector2, EndDate1); 

    // Leaving From1
    const inputSelector3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:6\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector3, { visible: true });
    await page.click(inputSelector3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector3, LeavingFrom1); 
    await page.keyboard.press('Tab');

    //going to1
    const inputSelector4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:7\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector4, { visible: true });
    await page.click(inputSelector4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector4, Goingto1); // Replace SomeValue with your actual value

    // Flight Duration1
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:lovScreenEntryValue\\:\\:content');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((DurationValue) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:lovScreenEntryValue\\:\\:pop li'
        );

        for (let option of options) {
            if (option.innerText.trim() === DurationValue) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, FlightDuration1);            

    // Ticket Required1
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:lovScreenEntryValue\\:\\:content');
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:lovScreenEntryValue\\:\\:pop', { visible: true });

    await page.evaluate((TicketRequired1) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === TicketRequired1) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TicketRequired1); 

    // Departure Time1
    const inputSelector5 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:10\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelector5, { visible: true });
    await page.click(inputSelector5, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector5, DepartureTime1); // Replace DepartureTime1 with your actual value (e.g., '2:30 PM')

    // Duration in Days1
    const inputSelector6 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:11\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector6, { visible: true });
    await page.click(inputSelector6, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector6, DurationInDays1); // Replace DurationInDays1 with your actual value

    // Ticket Class1
    const inputSelector7 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:12\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector7, { visible: true });
    await page.click(inputSelector7, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector7, TicketClass1);

    //Hotel Booking1
    await page.waitForSelector("#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:content", { visible: true });
    await page.click("#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:content");
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    // Select desired option (e.g., "Cash", "Agent Arrangement")
    await page.evaluate((desiredValue) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === desiredValue) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, HotelBooking1); // Replace PaymentMethod with a string like "Cash"

    // Hotel Price1
    const inputSelector8 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:14\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector8, { visible: true });
    await page.click(inputSelector8, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector8, HotelPrice1); 

    // Per Diem1
    const inputSelector9 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:16\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector9, { visible: true });
    await page.click(inputSelector9, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector9, PerDiem1); // Replace FieldValue16 with your actual value


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

module.exports = KSABusinessTripRequest;