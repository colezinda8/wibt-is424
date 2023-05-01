// import puppeteer

const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 15,
  });

  const page = await browser.newPage();

  //   site the to be tested

  await page.goto("http://127.0.0.1:5500/WIBT/");

  //   user click the sign-in button

  await page.click("#signinbtn");

  // user will provide email, password, and interests information

  await page.type("#email_", "test@test.com");
  await page.type("#password_", "1234");

  await page.click("#login_submit");

  //   test the search functionality

  //   set 2 second delay

  await new Promise((r) => setTimeout(r, 2000));
}

// call go()

go();
