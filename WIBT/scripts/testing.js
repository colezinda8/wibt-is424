// import puppeteer

const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 350,
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1000, height: 800 });

  //   site the to be tested

  await page.goto("http:wibt-uwmadison.org");

  //   user click the sign-in button

  await page.click("#signinbtn");

  // user will provide email, password, and interests information

  await page.type("#email_", "a@a.com");
  await page.type("#password_", "aaaaaa");
  await page.click("#login_submit");

  // add event
  await page.click("#homeEvents > div.event.event-add");
  await page.type("#title", "Test Event");
  await page.type("#date", "5/5/2023");
  await page.click("#title");
  await page.type("#hour", "2");
  await page.type("#minute", "30");
  await page.click("#event_submit");
  //  delete event
  await page.evaluate(() => {
    let elements = document.getElementsByClassName(
      "button is-small is-rounded delete-button m-0"
    );
    elements[0].click();
  });
  await page.click("#event_delete");
  //  sign out
  await page.click("#signinbtn");
  await page.click("#login_submit");

  // close
  browser.close();
}

// call go()

go();
