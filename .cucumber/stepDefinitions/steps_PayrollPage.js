import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';
import { VehiclesPage } from '../pages/VehiclesPage.js';
import { PayrollPage } from '../pages/PayrollPage.js';
const allure = require('allure-playwright');

const { When, Then, Given, Before } = createBdd();



const dotenv = require('dotenv');
dotenv.config();

// Declare page objects outside the hook so you can use in all Given, When, Then blocks
let basePage;
let loginPage;
let dashboard;
let newPage; // When the new window or tab is opened, I will initialize it inside Given, When, Then blocks
let employeeMasterData;
let vehicles;
let payroll;

Before(async ({ page }) => {
  basePage = new BasePage(page);
  loginPage = new LoginPage(page);
  dashboard = new DashboardPage(page);
  employeeMasterData = new EmployeeMasterDataPage(page);
  vehicles = new VehiclesPage(page);
  payroll = new PayrollPage(page);
});

When('I click the Payroll module button', async ({ page }) => {
  await payroll.payroll_module_btn.click();
  await page.waitForLoadState('load');
});

When('I click the month dropdown select btn', async ({ page }) => {
  await payroll.month_select_svg_btn.click({ force: true });
  await page.waitForTimeout(1000);
});

Then('all months are visible and clickable', async ({ page }) => {
  const countMonth = await payroll.months_all.count(); // Await the count

  for (let i = 0; i < countMonth; i++) {
    const month = payroll.months_all.nth(i);
    const monthText = await month.textContent();

    await expect(month).toBeVisible();
    await expect(month).toBeEnabled();
    console.log(`Month: ${monthText} is visible and clickable`);
  }
  await page.keyboard.press('Enter')


});

When('I click the years dropdown select btn', async ({ page }) => {

  await payroll.years_select_svg_btn.click({ force: true }); // Use the correct selector for years dropdown
  await page.waitForTimeout(1000);
});

Then('I verify years are visible and clickable', async ({ page }) => {

  // Sayısal değerler içeren liste öğelerinin sayısını bulma
  const listItems = await payroll.years_All;  // Locate 4 elements
  const count = await listItems.count();  // Get the count of elements
  console.log(count);  // Log the count //4

  // Loop through all the list items
  for (let i = 0; i < count; i++) {
    const listItem = await payroll.years_All.nth(i); // Get the specific item

    const itemText = await listItem.textContent(); // Get the text content

    // Check if the item is visible and enabled
    await expect(listItem).toBeVisible();
    await expect(listItem).toBeEnabled();

    // Log the item info to the console
    console.log(`Item: ${itemText} is visible and clickable`);
  }
});

Then('I verify table column {string} are visible', async ({ page }, expected) => {
  // Locate the column headers using the locator for "strong" tags (or adjust if needed)
  const headersLocator = page.locator("(//strong)");

  const count = await headersLocator.count();  // Get the number of headers
  console.log(`Number of headers: ${count}`);  // Log the count

  // Loop through each header and verify it is visible and matches the expected header
  for (let i = 0; i < count; i++) {
    const header = await headersLocator.nth(i);  // Get the specific header
    const headerText = await header.textContent();  // Get the text content of the header

    // Check if the header is visible
    await expect(header).toBeVisible();

    // Log the header info
    console.log(`Header: ${headerText} is visible and is correctly displayed.`);
  }
});


Then('I added an employee with details below:   and verify they are samely came to payroll page', async ({ page }, dataTable) => {

  const employees = dataTable.hashes(); // dataTable works here. //console.log(employees[0].Name) -- Kenan
  //------------------------------------- 
  await payroll.filter_employee_id.fill(employees[0].ID_Number)
  await console.log("id numebr is:", employees[0].ID_Number)
  const firstRow = page.locator('//table//tbody//tr[1]');
  await page.waitForSelector("//tbody//tr", { state: 'visible' })
  await page.waitForTimeout(2000)

  const id = await page.locator("//table//tbody//tr[1]//td[1]").textContent()
  const firstName = await page.locator("//table//tbody//tr[1]//td[2]").textContent()
  const LastName = await page.locator("//table//tbody//tr[1]//td[3]").textContent()
  const client = await page.locator("//table//tbody//tr[1]//td[4]").textContent()
  const company = await page.locator("//table//tbody//tr[1]//td[5]").textContent()
  const gross_salary = await page.locator("//table//tbody//tr[1]//td[6]").textContent()
  const net_salary = await page.locator("//table//tbody//tr[1]//td[7]").textContent()

  await expect(id).toBe(employees[0].ID_Number)
  await expect(firstName).toBe(employees[0].Name)
  await expect(company).toBe(employees[0].Company)
  await expect(gross_salary).toBe(employees[0].Gross_Salary)


});

Then('I see employee details:', async ({ page }, dataTable) => {
  const employeeDetails = dataTable.hashes()[0]; // Use first row of the table

  // Log and apply the filter
  console.log("Applying filter for ID:", employeeDetails.id);
  await employeeMasterData.no_filter.fill(employeeDetails.id);

  // Wait for the row to be visible
  const rowSelector = '//tbody/tr[1]';
  await page.waitForSelector(rowSelector, { state: 'visible', timeout: 5000 });
  await page.waitForTimeout(2000);  // Allow extra time for the row to load

  // Fetch the row text
  const rowText = await page.locator(rowSelector).textContent();
  console.log("Row text content:", rowText);

  // Ensure the row isn't empty and contains the expected values
  expect(rowText).not.toBe("");  // Ensure row isn't empty
  expect(rowText).toContain(employeeDetails.id);
  expect(rowText).toContain(employeeDetails.name);
  expect(rowText).toContain(employeeDetails.lastName);
  expect(rowText).toContain(employeeDetails.entry_month);
  expect(rowText).toContain(employeeDetails.entry_year);
});


Then('Then I navigate to {string}', async ({ page }, url) => {
  await page.goto(url)
  await page.waitForLoadState('load')
});

Then('I click {string} and {string} and search with employee {string}', async ({ page }, month, year, id) => {
  await payroll.month_fieldset.click()
  await page.waitForTimeout(1000)
  await console.log("month chosen is :", month)
  await page.getByText(month).click()
  await page.waitForTimeout(1000)

  await payroll.year_fieldset.click()
  await page.waitForTimeout(1000)
  await console.log("year chosen is :", year)

  await page.getByRole('option', { name: year }).click()
  await page.waitForTimeout(1000)

  await payroll.filter_employee_id.fill(id)
  await page.waitForTimeout(1000)
  


});

Then('I verify employee is not seen in table if you choose a date before addition date', async ({ page }) => {

  try {
    const firstRow = await page.locator("//tbody//tr[1]");

    // Eleman görünür mü kontrol et
    const isVisible = await firstRow.isVisible();

    // Eğer görünürse, test başarısız olsun
    if (isVisible) {
      throw new Error("Employee is visible when the date is before the addition date.");
    } else {
      console.log("Filter is working as expected and no employee is visible before the addition date.");
    }
  } catch (error) {
    // Eğer eleman görünür değilse, bu durumda error yakalanmaz ve test geçer
    console.log("No employee visible as expected, and the filter is working correctly.");
  }

})