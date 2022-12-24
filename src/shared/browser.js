import puppeteer from 'puppeteer';

export default async function startBrowser(headless = false) {
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => ", err);
    }
    return browser;
}
