import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

const { Given, When, Then, Before } = createBdd();

const dotenv = require('dotenv');
dotenv.config();

// Declare page objects outside the hook so you can use in all Given when Then blocks
let basePage;
let loginPage;
let dashboard;
let newPage;

Before(async ({ page }) => {
  basePage = new BasePage(page);
  loginPage = new LoginPage(page);
  dashboard = new DashboardPage(page)
});

Given('Navigate to Dashboard with {string} language', async ({ page }, language) => {
  await basePage.navigateToDashboard(language)

});

Then('verify DashBoard Module Button is visible and is Clickable', async ({ page }) => {
  const dashboardButton = dashboard.dashboard_btn;
  await dashboardButton.waitFor({ state: 'visible' });

  await expect(dashboardButton).toBeVisible();
  await expect(dashboardButton).toBeEnabled(); //clickable and functional
});

Then('click the Dashboard module', async ({ page }) => {
  await dashboard.dashboard_btn.click();

});

Then('verify the URL of the dashboard should be {string}', async ({ page }, dasboardUrl) => {
  const currentUrl = await page.url();
  await expect(currentUrl).toBe(dasboardUrl);

});

Then('I should see the message {string}', async ({ page }, expectedText) => {  //expected text is coming from feature file with a parameter value
  const textLocator = page.locator(dashboard.helloToHomePageText);
  const actualText = await textLocator.textContent()
  expect(actualText.trim()).toBe(expectedText);
});

Then('verify Employee_Master_Data module button is visible and is Clickable', async ({ page }) => {


  // Check if the button is visible
  await expect(dashboard.employee_master_data_btn).toBeVisible();

  // Check if the button is enabled (clickable)
  await expect(dashboard.employee_master_data_btn).toBeEnabled();



});

Then('click the Employee_Master_data module', async ({ page }) => {

  dashboard.employee_master_data_btn.click()
  

});

Then('verify the URL of the Employee_Master_data module should be {string}', async ({ page }, expectedUrl) => {
  await page.waitForURL(expectedUrl)
  const currentUrl =  page.url();
  expect(currentUrl).toBe(expectedUrl)
});

Then('verify Employee_Attendance Module Button is visible and is Clickable', async ({ page }) => {
  await expect(dashboard.employee_attendance_btn).toBeVisible()
  await expect(dashboard.employee_attendance_btn).toBeEnabled()
});

Then('click the Employee_Attendance module', async ({ page }) => {
  await dashboard.employee_attendance_btn.click();
});

Then('verify the URL of the Employee_Master_data module module should be {string}', async ({ page }, expectedUrl) => {
  const actualUrl = await page.url()
  expect(actualUrl).toBe(expectedUrl)
});

Then('verify Payroll Module Button is visible and is clickable', async ({ page }) => {
  const payrollButton = dashboard.payroll_btn; // Assuming dashboard.payroll_btn is already defined

  // Check if the Payroll button is visible
  await expect(payrollButton).toBeVisible();

  // Check if the Payroll button is enabled (clickable)
  await expect(payrollButton).toBeEnabled();

});

Then('click the Payroll module', async ({ page }) => {
  await dashboard.payroll_btn.click()
});

Then('verify Vehicles Module Button is visible and is clickable', async ({ page }) => {
  await expect(dashboard.vehicles_btn).toBeVisible()
  await expect(dashboard.vehicles_btn).toBeEnabled()
});

Then('click the Vehicles module', async ({ page }) => {
  await dashboard.vehicles_btn.click()

});

Then('verify Admin Module Button is visible and is clickable', async ({ page }) => {
  await expect(dashboard.admin_btn).toBeVisible()
  await expect(dashboard.admin_btn).toBeEnabled()
});

Then('click the Admin Module', async ({ page }) => {
  await dashboard.admin_btn.click()
});

Then('verify Users module button is visible and clickable', async ({ page }) => {
  await expect(dashboard.admin_users_btn).toBeVisible()
  await expect(dashboard.admin_users_btn).toBeEnabled()
});

Then('click the Users Module', async ({ page }) => {
  await dashboard.admin_users_btn.click()
});

Then('verify the URL of the Users module should be {string}', async ({ page }, expectedUrl) => {
  const actualUrl = page.url()
  expect(actualUrl).toBe(expectedUrl)
});

Then('verify Options module button is visible and clickable', async ({ }) => {
  await expect(dashboard.admin_options_btn).toBeVisible()
  await expect(dashboard.admin_options_btn).toBeEnabled()
});

Then('click the Options Module', async ({ page }) => {
  await dashboard.admin_options_btn.click()
});

Then('verify the URL of the Options module should be {string}', async ({ page}, expectedUrl) => {
  const actualUrl = page.url()
  expect(actualUrl).toBe(expectedUrl)
});

Then('verify Holidays module button is visible and clickable', async ({ page}) => {
  await expect(dashboard.admin_holidays_btn).toBeVisible()
  await expect(dashboard.admin_holidays_btn).toBeEnabled()
});

Then('click the Holidays Module', async ({ page}) => {
  await dashboard.admin_holidays_btn.click()
});

Then('verify the URL of the Holidays module should be {string}', async ({ page}, expectedUrl) => {
  const actualUrl = page.url()
  expect(actualUrl).toBe(expectedUrl)
});

Then('verify Payout_amounts module button is visible and clickable', async ({page }) => {
  await expect(dashboard.admin_payamount_btn).toBeVisible()
  await expect(dashboard.admin_payamount_btn).toBeEnabled()
});

Then('click the Payout_amounts Module', async ({ page}) => {
  await dashboard.admin_payamount_btn.click()
});

Then('verify the URL of Payout_amounts module should be {string}', async ({ page}, expectedUrl) => {
  const actualUrl = page.url()
  expect(actualUrl).toBe(expectedUrl)
});

Then('verify Quickly_Gmbh Module Button is visible and is clickable', async ({page }) => {
  await expect(dashboard.quickly_gmbh).toBeVisible()
  await expect(dashboard.quickly_gmbh).toBeEnabled()
});

Then('click the Quickly_Gmbh Module', async ({page }) => {
  [newPage] = await Promise.all([
    page.context().waitForEvent('page'), // Wait for the new page to open
    dashboard.quickly_gmbh.click() // Click the link to open the new tab
  ]);
  // Yeni sekmeyi bekle ve hazır olmasını sağla
  await newPage.waitForLoadState('load');
});

Then('verify new opened Tab title contains {string}', async ({ page}, TextTitle) => {
  
  // Now you can check the title of the new page
  const title = await newPage.title();
  expect(title).toContain(TextTitle);

});

Then('verify the Quickly_Gmbh URL should be {string}', async ({}, expectedUrl) => {
  if (!newPage) {
    throw new Error('Yeni sekme açılmadı.');
  }

  // Yeni sekmenin URL'sini kontrol et
  const actualUrl = await newPage.url();
  expect(actualUrl).toBe(expectedUrl); // Beklenen URL'ye eşit olup olmadığını kontrol et
 
});



Then('verify Kinesis GPS Module Button is visible and is clickable', async ({page }) => {
  await expect(dashboard.kinesis_gps).toBeVisible()
  await expect(dashboard.kinesis_gps).toBeEnabled()
});



Then('click the Kinesis GPS Module', async ({ page }) => {

  //const [newPage] yerine globalde let newPage dedim 
   [newPage] = await Promise.all([
    page.context().waitForEvent('page'), // 90 saniye yeni sekmenin açılmasını bekle
    await page.getByRole('link', { name: 'Kinesis GPS' }).click()

  ]);

  
  // Yeni sekmeyi yüklenene kadar bekle
  await newPage.waitForLoadState()

  console.log('Yeni Kinesis GPS sayfası yüklendi ve kullanıma hazır.');
});


Then('verify new opened Tab contains {string}', async ({page }, TextTitle) => {
  
  if (!newPage) {
    throw new Error('Yeni sekme açılmadı.');
  }

  // Yeni sekmenin başlığını kontrol et
  const title = await newPage.title();
  expect(title).toContain(TextTitle); // Beklenen başlık metnini içerip içermediğini kontrol et
})

Then('verify the URL should be {string}', async ({ page}, expectedUrl) => {
  //new page i global ayarladim
  if (!newPage) {
    throw new Error('Yeni sekme açılmadı.');
  }

  // Yeni sekmenin URL'sini kontrol et
  const actualUrl = await newPage.url();
  expect(actualUrl).toBe(expectedUrl); // Beklenen URL'ye eşit olup olmadığını kontrol et
})


// 1. Missing step definition for ".cucumber/features/dashboard.feature:89:1"
Then('click module {string}', async ({page}, module) => {
  dashboard.clickModule(module)
});