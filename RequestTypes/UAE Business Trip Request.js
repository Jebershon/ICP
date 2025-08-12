async function UAEBusinessTripRequest(browser, page, body, res) {
    // Destructure required fields from req.body
    const {
        plan,
        option,
        PurposeofTravel,
        TripLocation1,
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
        PerDiem1,
        	TripLocation2,
        StartDate2,
        EndDate2,
        LeavingFrom2,
        Goingto2,
        FlightDuration2,
        TicketRequired2,
        DepartureTime2,
        DurationInDays2,
        TicketClass2,
        HotelBooking2,
        HotelPrice2,
        PerDiem2,
        	TripLocation3,
        StartDate3,
        EndDate3,
        LeavingFrom3,
        Goingto3,
        FlightDuration3,
        TicketRequired3,
        DepartureTime3,
        DurationInDays3,
        TicketClass3,
        HotelBooking3,
        HotelPrice3,
        PerDiem3,
        	TripLocation4,
        StartDate4,
        EndDate4,
        LeavingFrom4,
        Goingto4,
        FlightDuration4,
        TicketRequired4,
        DepartureTime4,
        DurationInDays4,
        TicketClass4,
        HotelBooking4,
        HotelPrice4,
        PerDiem4,
        TotalPerDiem,
        TotalHotelPrice,
        PayValue
    } = body;

    // Validate required fields individually and return specific error
    const requiredFields = {
        option,
        PurposeofTravel,
        TripLocation1,
        StartDate1,
        EndDate1,
        LeavingFrom1,
        Goingto1,
        FlightDuration1
    };
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            await browser.close();
            return res.status(500).json({ error: `Missing required field: ${field}` });
        }
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

    // Begin form

    // Purpose of Travel
    const screenEntrySelector = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:2\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(screenEntrySelector, { visible: true });
    await page.click(screenEntrySelector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(screenEntrySelector, PurposeofTravel);

    try {
    // Trip Location Type Dropdown
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:drop',{ clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TripLoc) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:pop li'
        );

        for (let option of options) {
            if (option.innerText.trim() === TripLoc) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TripLocation1);
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Trip Location Type Dropdown not found or not clickable, retrying...");
            // Trip Location Type Dropdown
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:drop',{ clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((TripLoc) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:3\\:lovScreenEntryValue\\:\\:pop li'
                );

                for (let option of options) {
                    if (option.innerText.trim() === TripLoc) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, TripLocation1);

        }else{
            console.log("Error occurred while selecting Trip Location:", error);
            res.status(500).json({ error: "Error occurred while selecting Trip Location." });
        }
    }

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
    await page.keyboard.press('Tab');

    try {
    // Flight Duration1
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
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
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Error occurred while selecting Flight Duration (retrying):", error);
            // Flight Duration1
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:8\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
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
        }else{
            console.log("Error occurred while selecting Flight Duration:", error);  
            res.status(500).json({ error: "Error occurred while selecting Flight Duration." });
        }
    }           

    try{
    // Ticket Required1
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
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
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Ticket Required selection...");
            // Ticket Required1
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:9\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
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
        }else{
            console.log("Error occurred while selecting Ticket Required:", error);
            res.status(500).json({ error: "Error occurred while selecting Ticket Required." }); 
        }
    }

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
    await page.keyboard.press('Tab');

    try{
    //Hotel Booking1
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
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
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Hotel Booking selection...");
            //Hotel Booking1
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:13\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
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
        }else{
            console.log("Error occurred while selecting Hotel Booking:", error);
            res.status(500).json({ error: "Error occurred while selecting Hotel Booking." });
        }
    }

    // Hotel Price1
    const inputSelector8 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:14\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector8, { visible: true });
    await page.click(inputSelector8, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector8, HotelPrice1); 
    await page.keyboard.press('Tab');

    // Per Diem1
    const inputSelector9 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:16\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector9, { visible: true });
    await page.click(inputSelector9, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector9, PerDiem1); // Replace FieldValue16 with your actual value
    await page.keyboard.press('Tab');

    //TRIP 2(optional)
    //------------------------

    if(
        TripLocation2 !== "" || TripLocation2 !== null &&
        StartDate2 !== "" || StartDate2 !== null &&
        EndDate2 !== "" || EndDate2 !== null &&
        LeavingFrom2 !== "" || LeavingFrom2 !== null &&
        Goingto2 !== "" || Goingto2 !== null &&
        FlightDuration2 !== "" || FlightDuration2 !== null &&
        TicketRequired2 !== "" || TicketRequired2 !== null &&
        DepartureTime2 !== "" || DepartureTime2 !== null &&
        DurationInDays2 !== "" || DurationInDays2 !== null &&
        TicketClass2 !== "" || TicketClass2 !== null &&
        HotelBooking2 !== "" || HotelBooking2 !== null &&
        HotelPrice2 !== "" || HotelPrice2 !== null &&
        PerDiem2 !== "" || PerDiem2 !== null
    ){
    try{
    //Travel location2
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TripLocation2) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:pop li'
        );

        for (let option of options) {
            if (option.innerText.trim() === TripLocation2) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TripLocation2);
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Travel Location selection...");
            //Travel location2
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((TripLocation2) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:17\\:lovScreenEntryValue\\:\\:pop li'
                );

                for (let option of options) {
                    if (option.innerText.trim() === TripLocation2) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, TripLocation2);
        }else{
            console.log("Error occurred while selecting Travel Location:", error);
            res.status(500).json({ error: "Error occurred while selecting Travel Location." });
        }
    }

    // Start Date2
    const inputSelector10 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:18\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelector10, { visible: true });
    await page.click(inputSelector10, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector10, StartDate2); // Replace StartDate2 with your actual value

    // End Date2
    const inputSelector11 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:19\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelector11, { visible: true });
    await page.click(inputSelector11, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector11, EndDate2); // Replace EndDate2 with your actual value

    //Leaving From
    const inputSelector12 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:20\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelector12, { visible: true });
    await page.click(inputSelector12, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelector12, LeavingFrom2);
    await page.keyboard.press('Tab');

    // Going To (Trip 2)
    const inputSelectorGoingTo2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:21\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorGoingTo2, { visible: true });
    await page.click(inputSelectorGoingTo2, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorGoingTo2, Goingto2);
    await page.keyboard.press('Tab');

    try{
    // Flight Duration2
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((DurationValue) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === DurationValue) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, FlightDuration2);
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log('Retrying Flight Duration selection...');
            // Flight Duration2
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((DurationValue) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:22\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === DurationValue) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, FlightDuration2);
        }else{
            console.log('Error occurred while selecting Flight Duration2:', error);
            res.status(500).json({ error: "Error occurred while selecting Flight Duration2." });
        }
    }  

    try{
    // Ticket Required2
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TicketRequired2) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === TicketRequired2) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TicketRequired2);
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Ticket Required2 selection...");
            // Ticket Required2
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((TicketRequired2) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:23\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === TicketRequired2) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, TicketRequired2);
        }else{
            console.log("Error occurred while selecting Ticket Required2:", error);
            res.status(500).json({ error: "Error occurred while selecting Ticket Required2." });
        }
    }

    // Departure Time2
    const inputSelectorDepartureTime2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:24\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorDepartureTime2, { visible: true });
    await page.click(inputSelectorDepartureTime2, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorDepartureTime2, DepartureTime2); // e.g., '9:15 AM'
    await page.keyboard.press('Tab');

    // Duration in Days2
    const inputSelectorDurationDays2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:25\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorDurationDays2, { visible: true });
    await page.click(inputSelectorDurationDays2, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorDurationDays2, DurationInDays2); // Replace DurationInDays2 with your actual value
    await page.keyboard.press('Tab');

    // Ticket Class2
    const inputSelectorTicketClass2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:26\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorTicketClass2, { visible: true });
    await page.click(inputSelectorTicketClass2, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorTicketClass2, TicketClass2); // Replace TicketClass2 with your actual value
    await page.keyboard.press('Tab');

    try{
    // Hotel Booking2
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    // Select desired option (e.g., "Cash", "Agent Arrangement")
    await page.evaluate((HotelBooking2) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === HotelBooking2) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, HotelBooking2); // Example: "Cash" or "Agent Arrangement"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retry selecting Hotel Booking2:", error);
            // Hotel Booking2
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            // Select desired option (e.g., "Cash", "Agent Arrangement")
            await page.evaluate((HotelBooking2) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:27\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === HotelBooking2) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, HotelBooking2); // Example: "Cash" or "Agent Arrangement"
        }else{
            console.log("Error occurred while selecting Hotel Booking2:", error);
            res.status(500).json({ error: "Error occurred while selecting Hotel Booking2." });
        }
    }

    // Hotel Price2
    const inputSelectorHotelPrice2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:28\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorHotelPrice2, { visible: true });
    await page.click(inputSelectorHotelPrice2, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorHotelPrice2, HotelPrice2); // e.g., "800"
    await page.keyboard.press('Tab');

    // Per Diem2
    const inputSelectorPerDiem2 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:30\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorPerDiem2, { visible: true });
    await page.click(inputSelectorPerDiem2, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorPerDiem2, PerDiem2); // e.g., "400"
    await page.keyboard.press('Tab');
}

    //TRIP 3(Optional)
    //------------------------
if(
        TripLocation3 !== "" || TripLocation3 !== null &&
        StartDate3 !== "" || StartDate3 !== null &&
        EndDate3 !== "" || EndDate3 !== null &&
        LeavingFrom3 !== "" || LeavingFrom3 !== null &&
        Goingto3 !== "" || Goingto3 !== null &&
        FlightDuration3 !== "" || FlightDuration3 !== null &&
        TicketRequired3 !== "" || TicketRequired3 !== null &&
        DepartureTime3 !== "" || DepartureTime3 !== null &&
        DurationInDays3 !== "" || DurationInDays3 !== null &&
        TicketClass3 !== "" || TicketClass3 !== null &&
        HotelBooking3 !== "" || HotelBooking3 !== null &&
        HotelPrice3 !== "" || HotelPrice3 !== null &&
        PerDiem3 !== "" || PerDiem3 !== null
){
    try{
    // Trip Location3
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TripLocation3) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === TripLocation3) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TripLocation3); // e.g., "Middle East, Africa, the India"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Trip Location3 selection...");
            // Trip Location3
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((TripLocation3) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:31\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === TripLocation3) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, TripLocation3); // e.g., "Middle East, Africa, the India"
        }else{
            console.log("Error occurred while selecting Trip Location3:", error);
            res.status(500).send("Error occurred while selecting Trip Location3.");
        }
    }

    // Start Date3
    const inputSelectorStartDate3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:32\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorStartDate3, { visible: true });
    await page.click(inputSelectorStartDate3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorStartDate3, StartDate3); // e.g., '9/1/25'
    await page.keyboard.press('Tab');

    // End Date3
    const inputSelectorEndDate3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:33\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorEndDate3, { visible: true });
    await page.click(inputSelectorEndDate3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorEndDate3, EndDate3); // e.g., '9/5/25'
    await page.keyboard.press('Tab');

    // Leaving From3
    const inputSelectorLeavingFrom3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:34\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorLeavingFrom3, { visible: true });
    await page.click(inputSelectorLeavingFrom3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorLeavingFrom3, LeavingFrom3); // e.g., "eee"
    await page.keyboard.press('Tab');

    // Going To3
    const inputSelectorGoingTo3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:35\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorGoingTo3, { visible: true });
    await page.click(inputSelectorGoingTo3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorGoingTo3, Goingto3); // e.g., "fff"
    await page.keyboard.press('Tab');

    try{
    // Ticket Required3
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TicketRequired3) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === TicketRequired3) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TicketRequired3); // Example values: "Yes" or "No"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Ticket Required3 selection..."); 
            // Ticket Required3
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((TicketRequired3) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:37\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === TicketRequired3) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, TicketRequired3); // Example values: "Yes" or "No"
        }else{
            console.log("Error occurred while selecting Ticket Required option");
            res.status(500).json({ error: "Error occurred while selecting Ticket Required option." });
        }
    }

    try{
    // Flight Duration3
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((FlightDuration3) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === FlightDuration3) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, FlightDuration3); // Pass a string like "Less Than 10 Hours" or "More Than 10 Hours"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Flight Duration3 selection...");
            // Flight Duration3
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((FlightDuration3) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:36\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === FlightDuration3) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, FlightDuration3); // Pass a string like "Less Than 10 Hours" or "More Than 10 Hours"
        }else{
            console.log("Error occurred while selecting Flight Duration option");
            res.status(500).json({ error: "Error occurred while selecting Flight Duration option." });
        }
    }

    // Departure Time3
    const inputSelectorDepartureTime3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:38\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorDepartureTime3, { visible: true });
    await page.click(inputSelectorDepartureTime3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorDepartureTime3, DepartureTime3); // e.g., "9:15 AM"
    await page.keyboard.press('Tab');

    // Duration in Days3
    const inputSelectorDurationDays3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:39\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorDurationDays3, { visible: true });
    await page.click(inputSelectorDurationDays3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorDurationDays3, DurationInDays3); // e.g., "4"
    await page.keyboard.press('Tab');

    // Ticket Class3
    const inputSelectorTicketClass3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:40\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorTicketClass3, { visible: true });
    await page.click(inputSelectorTicketClass3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorTicketClass3, TicketClass3); // e.g., "B1"
    await page.keyboard.press('Tab');

    try{
    // Hotel Booking3
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    // Select desired option (e.g., "Agent Arrangement" or "Cash")
    await page.evaluate((HotelBooking3) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === HotelBooking3) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, HotelBooking3); // Example: "Agent Arrangement" or "Cash"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
                console.log("Retrying hotel booking selection...");
                // Hotel Booking3
                await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
                await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:drop', { visible: true });
                await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
                await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:pop', { visible: true });
                // Select desired option (e.g., "Agent Arrangement" or "Cash")
                await page.evaluate((HotelBooking3) => {
                    const options = document.querySelectorAll(
                        '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:41\\:lovScreenEntryValue\\:\\:pop li'
                    );
                    for (let option of options) {
                        if (option.innerText.trim() === HotelBooking3) {
                            option.scrollIntoView();
                            option.click();
                            break;
                        }
                    }
                }, HotelBooking3); // Example: "Agent Arrangement" or "Cash"
        }else{
                console.error('Error selecting hotel booking option:', error);
                res.status(500).json({ error: "Error occurred while selecting Hotel Booking3." });
        }
    }

    // Hotel Price3
    const inputSelectorHotelPrice3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:43\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorHotelPrice3, { visible: true });
    await page.click(inputSelectorHotelPrice3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorHotelPrice3, HotelPrice3); // e.g., "900"
    await page.keyboard.press('Tab');

    // Per Diem3
    const inputSelectorPerDiem3 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:44\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorPerDiem3, { visible: true });
    await page.click(inputSelectorPerDiem3, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorPerDiem3, PerDiem3); // e.g., "500"
    await page.keyboard.press('Tab');
}
    //TRIP 4(Optional)
    //------------------------
if(
        TripLocation4 !== "" || TripLocation4 !== null &&
        StartDate4 !== "" || StartDate4 !== null &&
        EndDate4 !== "" || EndDate4 !== null &&
        LeavingFrom4 !== "" || LeavingFrom4 !== null &&
        Goingto4 !== "" || Goingto4 !== null &&
        FlightDuration4 !== "" || FlightDuration4 !== null &&
        TicketRequired4 !== "" || TicketRequired4 !== null &&
        DepartureTime4 !== "" || DepartureTime4 !== null &&
        DurationInDays4 !== "" || DurationInDays4 !== null &&
        TicketClass4 !== "" || TicketClass4 !== null &&
        HotelBooking4 !== "" || HotelBooking4 !== null &&
        HotelPrice4 !== "" || HotelPrice4 !== null &&
        PerDiem4 !== "" || PerDiem4 !== null
){
    try{
    // Trip Location4
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TripLocation4) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:pop li'
        );

        for (let option of options) {
            if (option.innerText.trim() === TripLocation4) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TripLocation4); // e.g., "Middle East, Africa, the India"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log('Retrying Trip Location4 selection...');
            // Trip Location4
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((TripLocation4) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:45\\:lovScreenEntryValue\\:\\:pop li'
                );

                for (let option of options) {
                    if (option.innerText.trim() === TripLocation4) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, TripLocation4); // e.g., "Middle East, Africa, the India"
        }else{
            console.log('Error selecting trip location 4:', error);
            res.status(500).json({ error: "Error occurred while selecting Trip Location4." });
        }
    }

    // Start Date4
    const inputSelectorStartDate4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:46\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorStartDate4, { visible: true });
    await page.click(inputSelectorStartDate4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorStartDate4, StartDate4); // e.g., "9/10/25"
    await page.keyboard.press('Tab');

    // End Date4
    const inputSelectorEndDate4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:47\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorEndDate4, { visible: true });
    await page.click(inputSelectorEndDate4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorEndDate4, EndDate4); // e.g., "9/15/25"
    await page.keyboard.press('Tab');

    // Leaving From4
    const inputSelectorLeavingFrom4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:48\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorLeavingFrom4, { visible: true });
    await page.click(inputSelectorLeavingFrom4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorLeavingFrom4, LeavingFrom4); // e.g., "New York"
    await page.keyboard.press('Tab');

    // Going To4
    const inputSelectorGoingTo4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:49\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorGoingTo4, { visible: true });
    await page.click(inputSelectorGoingTo4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorGoingTo4, Goingto4); // e.g., "Los Angeles"
    await page.keyboard.press('Tab');

    try{
    // Flight Duration4
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((FlightDuration4) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === FlightDuration4) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, FlightDuration4); // Example: "Less Than 10 Hours" or "More Than 10 Hours"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Flight Duration4 selection...");
            // Flight Duration4
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((FlightDuration4) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:50\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === FlightDuration4) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, FlightDuration4); // Example: "Less Than 10 Hours" or "More Than 10 Hours"

        }else{
            console.log("Error occurred while selecting Flight Duration4: ", error);
            res.status(500).json({ error: "Error occurred while selecting Flight Duration4." });
        }
    }

    try{
    // Ticket Required4
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((TicketRequired4) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === TicketRequired4) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, TicketRequired4); // Example: "Yes" or "No"
    }catch(error){
        if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
            console.log("Retrying Ticket Required4 selection...");
            // Ticket Required4
            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:drop', { visible: true });
            await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
            await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:pop', { visible: true });
            await page.evaluate((TicketRequired4) => {
                const options = document.querySelectorAll(
                    '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:51\\:lovScreenEntryValue\\:\\:pop li'
                );
                for (let option of options) {
                    if (option.innerText.trim() === TicketRequired4) {
                        option.scrollIntoView();
                        option.click();
                        break;
                    }
                }
            }, TicketRequired4); // Example: "Yes" or "No"
            
        }else{
            console.log("Error occurred while selecting Ticket Required4: ", error);
            res.status(500).json({ error: "Error occurred while selecting Ticket Required4." });
        }
    }

    // Departure Time4
    const inputSelectorDepartureTime4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:52\\:screenEntryValueDate\\:\\:content"]';
    await page.waitForSelector(inputSelectorDepartureTime4, { visible: true });
    await page.click(inputSelectorDepartureTime4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorDepartureTime4, DepartureTime4); // e.g., "9:30 AM"
    await page.keyboard.press('Tab');

    // Duration in Days4
    const inputSelectorDurationDays4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:53\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorDurationDays4, { visible: true });
    await page.click(inputSelectorDurationDays4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorDurationDays4, DurationInDays4); // e.g., "5"
    await page.keyboard.press('Tab');

    // Ticket Class4
    const inputSelectorTicketClass4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:54\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorTicketClass4, { visible: true });
    await page.click(inputSelectorTicketClass4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorTicketClass4, TicketClass4); // e.g., "B1"
    await page.keyboard.press('Tab');

    try{
    // Hotel Booking4
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:drop', { visible: true });
    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:pop', { visible: true });
    await page.evaluate((HotelBooking4) => {
        const options = document.querySelectorAll(
            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:pop li'
        );
        for (let option of options) {
            if (option.innerText.trim() === HotelBooking4) {
                option.scrollIntoView();
                option.click();
                break;
            }
        }
    }, HotelBooking4); // Example: "Agent Arrangement" or "Cash"
    }catch(error){
                if(error.message.includes('Node is detached from document') || error.message.includes('Node is either not clickable or not an Element')){
                    console.log("Retrying Hotel Booking4 selection...");
                    // Hotel Booking4
                    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
                    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:drop', { visible: true });
                    await page.click('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:drop', { clickCount: 2 });
                    await page.waitForSelector('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:pop', { visible: true });
                    await page.evaluate((HotelBooking4) => {
                        const options = document.querySelectorAll(
                            '#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:55\\:lovScreenEntryValue\\:\\:pop li'
                        );
                        for (let option of options) {
                            if (option.innerText.trim() === HotelBooking4) {
                                option.scrollIntoView();
                                option.click();
                                break;
                            }
                        }
                    }, HotelBooking4); // Example: "Agent Arrangement" or "Cash"

                }else{
                    console.log("Error occurred while selecting Hotel Booking4: ", error);
                    res.status(500).json({ error: "Error occurred while selecting Hotel Booking4." });
                }
    }

    // Hotel Price4
    const inputSelectorHotelPrice4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:56\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorHotelPrice4, { visible: true });
    await page.click(inputSelectorHotelPrice4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorHotelPrice4, HotelPrice4); // e.g., "900"
    await page.keyboard.press('Tab');

    // Per Diem4
    const inputSelectorPerDiem4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:58\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorPerDiem4, { visible: true });
    await page.click(inputSelectorPerDiem4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorPerDiem4, PerDiem4); // e.g., "500"
    await page.keyboard.press('Tab');
}

if(TotalPerDiem !== '' || TotalPerDiem !== null){
    // Total Per Diem
    const inputSelectorTotalPerDiem4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:59\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorTotalPerDiem4, { visible: true });
    await page.click(inputSelectorTotalPerDiem4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorTotalPerDiem4, TotalPerDiem); // e.g., "1500"
    await page.keyboard.press('Tab');
}

if(TotalHotelPrice !== '' || TotalHotelPrice !== null){
    // Total Hotel Price
    const inputSelectorTotalHotelPrice4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:60\\:screenEntryValue\\:\\:content"]';
    await page.waitForSelector(inputSelectorTotalHotelPrice4, { visible: true });
    await page.click(inputSelectorTotalHotelPrice4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorTotalHotelPrice4, TotalHotelPrice); // e.g., "2700"
    await page.keyboard.press('Tab');
}

if(PayValue !== '' || PayValue !== null){
    // Pay Value
    const inputSelectorPayValue4 = 'input[id="_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt1\\:0\\:AP1\\:r2\\:0\\:AT3\\:_ATp\\:r1\\:1\\:evIter\\:70\\:screenEntryValueNumber\\:\\:content"]';
    await page.waitForSelector(inputSelectorPayValue4, { visible: true });
    await page.click(inputSelectorPayValue4, { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.type(inputSelectorPayValue4, PayValue); // e.g., "4200"
    await page.keyboard.press('Tab');
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

module.exports = UAEBusinessTripRequest;
