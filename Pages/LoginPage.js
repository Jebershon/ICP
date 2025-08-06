/**
 * Logs in to the page using the provided credentials.
 * @param {object} page - Puppeteer page instance.
 * @param {string} url - URL to navigate to.
 * @param {string} username - Username for login.
 * @param {string} password - Password for login.
 */
async function login(page, url, username, password) {
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('#userid', { visible: true });
    await page.type('#userid', username);

    await page.waitForSelector('#password', { visible: true });
    await page.type('#password', password);

    await page.waitForSelector('#btnActive', { visible: true });
    await page.click('#btnActive');
}

module.exports = login;