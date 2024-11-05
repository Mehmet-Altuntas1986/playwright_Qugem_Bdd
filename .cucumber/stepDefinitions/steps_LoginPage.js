

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';

const { Given,When,Then } = createBdd();

const dotenv = require('dotenv');
dotenv.config();

// Declare page objects outside the hook so you can use in all Given when Then blocks

let loginPage
Given('Navigate to Login Page', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage(); // Make sure to use 'await' here
  await page.waitForURL(process.env.url);
});

Then('Enter a valid email', async ({ page }) => {
  await page.locator(loginPage.emailBox).fill(process.env.email);
  // await page.waitForTimeout(1000)
});

Then('Enter a valid password', async ({ page }) => {
  await page.locator(loginPage.password).fill(process.env.password);
  // await page.waitForTimeout(1000)

});

Then('Click the login button after choosing english language', async ({ page }) => {
  await loginPage.clickLoginButton_withLanguage('english')
  await page.waitForURL("https://qugem-staging.netlify.app/")
});

Then('Verify that user is now on the Dasboard Page url after clicking login', async ({ page }) => {
  expect(page.url()).toEqual("https://qugem-staging.netlify.app/");       //expect(value).toEqual(expected). //expect is asekron
});

Then('verify that dashboard page tab name contains QUGEM', async ({ page }) => {

  const title = await page.title(); // Get the title of the page
  console.log(title)
  if (title.includes('QUGEM')) {
    console.log('Dashboard page tab name contains "QUGEM"');
    await page.waitForTimeout(1000)
    
  } else {
    throw new Error('Dashboard page tab name does not contain "QUGEM"');
  }
})

Then('Click the sign out button and verify you are in sign in page again', async ({ page }) => {
  await page.locator(loginPage.max_musterman).click()

  await page.locator(loginPage.sign_out).click()
  expect(page.url()).toBe("https://qugem-staging.netlify.app/auth/sign-in")

});


Then('Enter an invalid {string}', async ({ page }, password) => {
  await page.locator(loginPage.password).fill(password)
  await page.waitForTimeout(1000)
});

Then('Click the login button with {string} language', async ({ page }, arg) => {
  await loginPage.clickLoginButton_withLanguage(arg)
  await page.waitForTimeout(2000)
});


//expect asekron degil ama page asekron
Then('Verify that user is not on the Dasboard Page because login is not successfull', async ({ page }) => {
  expect(page.url()).not.toBe("https://qugem-staging.netlify.app/")

});

Then('verify user gets right alert warning if invalid password and valid email used in right language', async ({ page }) => {
  const popupTextElement = await page.waitForSelector(loginPage.english_lng_popup_in_wrong_login);
  const popupText = await popupTextElement.textContent();
  console.log("Bug report :in english language ,warning is in deutsch language and other problem warning is not for password")

  expect(popupText).not.toBe("Bitte geben Sie eine korrekte E-Mail-Adresse ein.")

});

Then('verify login button is functional', async ({ page }) => {
  const Loginbtn_element = page.locator(loginPage.loginBtn);
  expect(await Loginbtn_element.isEnabled()).toBe(true);

});

Then('press enter button on keyboard', async ({ page }) => {
  await page.keyboard.press('Enter')
});


Then('choose the {string} in loginPage', async ({page}, language) => {
  await loginPage.languageToChoose(language)
  await page.waitForTimeout(1000)
});


Then('verify that user gets an alert for pasword and alert is in right language {string}', async ({ page }, alertMessage) => {
expect(await page.locator(loginPage.alertShortPasswordCommonForAllLanguages).textContent()).toBe(alertMessage)
});




