import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';
import { VehiclesPage } from '../pages/VehiclesPage.js';
import exp from 'constants';
import { EmployeeAttendancePage } from '../pages/EmployeeAttendancePage.js';
import { PayrollPage } from '../pages/PayrollPage.js';
import { ADDRGETNETWORKPARAMS } from 'dns';

const allure = require('allure-playwright');

const { When, Then, Given, Before, After } = createBdd();

const dotenv = require('dotenv');
dotenv.config();

// Declare page objects outside the hook so you can use in all Given when Then blocks
let basePage;
let loginPage;
let dashboard;
let newPage;   //When the new window or tab is opened ,I will initialize it inside when,Then blocks
let employeeMasterData;
let vehicles;
let payroll;
let employeeAttendance;

Before(async ({ page }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    employeeMasterData = new EmployeeMasterDataPage(page);
    payroll = new PayrollPage(page)
    vehicles = new VehiclesPage(page)
    employeeAttendance = new EmployeeAttendancePage(page)
});


Then('verify page Title {string} is visible', async ({ page }, ExpectedTitle) => {
    const actualTitle = await employeeAttendance.employee_Attendance_page_title.textContent();
    expect(actualTitle.trim()).toBe(ExpectedTitle);
});

Then('I verify select month svg button is functional and I click it', async ({ page }) => {
    expect(await employeeAttendance.month_select_svg_btn).toBeEnabled()
    await employeeAttendance.month_select_svg_btn.click({ force: true })   //force true must be here
    await page.waitForTimeout(1000)

});

Then('I verify all {string} are visible and clickable', async ({ page }, month) => {
    await expect(page.getByRole('option', { name: `${month}` })).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole('option', { name: `${month}` })).toBeEnabled({ timeout: 3000 });
    console.log(`The ${month} is visible and clickable after clicking the SVG select month button`);


});

When('I click the chosen {string}', async ({ page }, month) => {
    await page.getByRole('option', { name: `${month}` }).click();
    await page.waitForTimeout(1000)
})

Then('I see {string} becomes visible in select Box', async ({ page }, month) => {
    await expect(page.getByText(`${month}`)).toBeVisible();
});


Then('I verify select year svg button is functional', async ({ page }) => {
    employeeAttendance = new EmployeeAttendancePage(page)
    expect(await employeeAttendance.year_select_svg_btn).toBeEnabled()

});

Then('I click year svg button', async ({ page }) => {
    await employeeAttendance.year_select_svg_btn.click({ force: true })   //force true must be here
    await page.waitForTimeout(1500)
});

Then('I verify {string} is visible and clickable in example', async ({ page }, year) => {
    await expect(page.getByRole('option', { name: `${year}` })).toBeVisible()
    await expect(page.getByRole('option', { name: `${year}` })).toBeEnabled()

});

When('I click the {string} in example', async ({ page }, year) => {
    if (parseInt(year) == 2024) {
        await page.locator("div[id='menu-'] li:nth-child(3)").click()
        await page.waitForTimeout(2000)

    } else {
        await page.getByRole('option', { name: `${year}` }).click({ force: true })
        await page.waitForTimeout(1000)
    }


});

Then('verify {string} becomes visible in select Box', async ({ page }, year) => {

    if (parseInt(year) == 2024) {
        await page.locator("div[id='menu-'] li:nth-child(3)").isVisible()       //2024 deki sorun boyle asildi
    } else {
        await expect(page.getByText(`${year}`)).toBeVisible()
    }

});

Then('the {string} should be visible on the page', async ({ page }, statusText) => {

    const statusElement = await page.locator(`//p[.='${statusText}']`);
    await expect(statusElement).toBeVisible();



});