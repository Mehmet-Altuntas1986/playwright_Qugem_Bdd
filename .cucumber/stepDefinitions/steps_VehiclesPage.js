import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';
import { VehiclesPage } from '../pages/VehiclesPage.js';
import exp from 'constants';
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


Before(async ({ page }) => {
  basePage = new BasePage(page);
  loginPage = new LoginPage(page);
  dashboard = new DashboardPage(page);
  employeeMasterData = new EmployeeMasterDataPage(page);
  vehicles = new VehiclesPage(page)

});


When('click to Vehicles module', async ({ page }) => {
  await vehicles.Vehicles_module_btn.click()
  await page.waitForTimeout(500)
});

Then('click add vehicle button', async ({ page }) => {
  await vehicles.vehicles_add_btn.click()

});


Then('fill in the input boxes of {string} , {string} , {string},{string},{string} {string} , {string} and {string}', async ({ page }, plate, brand, model, type, yearOfConstruction, yearOfPurchase, currentKm, purchasePrice) => {
  vehicles = new VehiclesPage(page)
  await vehicles.addVehicle_Input_Boxes(plate, brand, model, type, yearOfConstruction, yearOfPurchase, currentKm, purchasePrice)
});

When('click save changes in vehicles edit page', async ({ page }) => {
  await vehicles.saveChanges_btn_in_edit_page.click()
  await page.waitForTimeout(2000)



});

Then('verify alert message text is {string}', async ({ page }, textExpected) => {
  const actualText = await vehicles.vehicle_added_alert.textContent()
  console.log("after clicking save changes, alert text content is :", actualText)
  expect(actualText).toBe(textExpected)
});

Then('delete if a vehicle is added for test purpose ,Vehicle plate is {string}', async ({ page }, plate) => {
  vehicles = new VehiclesPage(page)
  await vehicles.deleteVehicleByPlate(plate)
});

Then('verify you are in Vehicle Details Page', async ({ page }) => {

  const page_Header_Title = await vehicles.vehicle_Details_header.textContent()
  expect(page_Header_Title).toEqual("Vehicle Details")
  console.log("Now you are in vehicle Deatils page ")
});


Then('verify the data is visible {string} , {string} , {string},{string},{string} {string} , {string} and {string}', async ({ page }, plate, brand, model, type, yearOfConstruction, yearOfPurchase, currentKm, purchasePrice) => {

  const expectedValues = [plate, brand, model, type, yearOfConstruction, yearOfPurchase]; //array with parameter values

  // Loop through the first row's cells (columns) and verify the text
  for (let i = 1; i <= expectedValues.length; i++) {

    const rowLocator = page.locator(`//tbody//tr[${i}]`);
    const rowText = await rowLocator.innerText();

    console.log(`In the table row, column ${i} has text:`, rowText);

    // Check if the expected value is present in the corresponding column
    expect(rowText).toContain(expectedValues[i - 1]);
  }

});

Then('I navigate to vehicles Module {string}', async ({ page }, url) => {
  await page.goto(url)
  await page.waitForLoadState()
});

Then('I write in the filter {string}', async ({ page }, plate) => {
  await vehicles.filter_plate.fill("")
  await vehicles.filter_plate.fill(plate)
  await page.waitForTimeout(3000)
});


Then('I verify {string} , {string} , {string} and {string} of the vehicle is visible', async ({ page }, plate, brand, model, type) => {
  const expectedValues = [plate, brand, model, type]; //array with parameter values

  for (let i = 1; i <= expectedValues.length; i++) {

    const rowLocator = await page.locator(`//tbody//tr[1]//td[${i}]`);
    const rowText = await rowLocator.textContent();

    console.log(`In the table row1, column ${i} has text:`, rowText);

    // Check if the expected value is present in the corresponding column
    await expect(rowText).toContain(expectedValues[i - 1]);
  }

});


Then('I verify vehicle has no driver and the status of vehicle is idle in Vehicle List Page', async ({ page }, dataTable) => {

  const vehicle = dataTable.hashes()[0]; // Use first row of the table

  const driver_expected = vehicle.driver  //  "";  Expecting no driver, so empty string
  const status_expected = vehicle.status  // "Idle"; // Expecting status to be "Idle"

  // Locate the actual elements on the page
  const driver_actual = await page.locator('td:nth-child(5)').innerText();
  const status_actual = await page.getByText('Idle').innerText();

  // Print the expected and actual values to the console
  console.log("Expected Driver: ", driver_expected);
  console.log("Actual Driver: ", driver_actual);
  console.log("Expected Status: ", status_expected);
  console.log("Actual Status: ", status_actual);

  // Compare the actual values with the expected ones
  expect(driver_actual).toEqual(driver_expected);
  expect(status_actual).toEqual(status_expected);
});

Then('I click usage button', async ({ page }) => {
  vehicles = new VehiclesPage(page)
  await vehicles.usage_btn_vehicleListPage.click()
  await page.waitForTimeout(1500)

});

Then('I see the {string}, {string}, and {string} of the vehicle before assigning a driver to the vehicle.', async ({ page }, plate, brand, model) => {
  const isVisible_Header = await page.locator(`//h2[contains(text(),'${plate} - ${brand} ${model}')]`).isVisible()
  const header_text = await page.locator(`//h2[contains(text(),'${plate} - ${brand} ${model}')]`).textContent()
  console.log("the header text if you click usage btn is:", header_text)
  expect(isVisible_Header).toBeTruthy()
});


Then('I verify there are header like below:', async ({ page }, dataTable) => {

  // Extract expected headers from the Gherkin table
  const expectedHeaders = dataTable.raw()[0];

  // Locate the header row in the table
  const actualHeaders = await page.locator('(//table//thead//tr)[2]/th').allTextContents();

  // Log the actual and expected headers for debugging
  console.log('Expected Headers:', expectedHeaders);
  console.log('Actual Headers:', actualHeaders);

  // Assert that the actual headers match the expected headers
  expect(actualHeaders).toEqual(expect.arrayContaining(expectedHeaders));

});


Then('I click add button and fill the input boxes with the data below:', async ({ page }, dataTable) => {
  vehicles = new VehiclesPage(page)
  // Get the first (or only) row of data
  const row = await dataTable.hashes()[0]; //gives headers in array
  await vehicles.addDriversWith_start_dateAndKm(row.driver1, row.driver2, row.Start_Date, row.start_km)

});

Then('verify the actual page url contains this part of the URL {string}', async ({ page }, expectedUrl) => {
  const actualUrl = await page.url()
  expect(actualUrl).toContain(expectedUrl)

});

Then('click edit button in vehicle details page', async ({ page }) => {
  vehicles = new VehiclesPage(page)
  await vehicles.edit_btn_vehicle_details_page.click()
  await page.waitForTimeout(2000)
});

Then('change Brand to {string}', async ({ page }, newBrand) => {
  vehicles = new VehiclesPage(page)
  await vehicles.brand_inputbox.fill("");
  await vehicles.brand_inputbox.fill(newBrand);
});

Then('change Model to {string}', async ({ page }, newModel) => {
  await vehicles.model_inputbox.fill("");
  await vehicles.model_inputbox.fill(newModel);
});

Then('click save changes button in vehicle details page', async ({ page }) => {
  vehicles = new VehiclesPage(page)
  await vehicles.saveChanges_btn_vehicle_details.click({ force: true })
  await page.waitForTimeout(2000)
});

Then('verify the changed row headers have values in vehicle details page like below:', async ({ page }, dataTable) => {
  const header=await dataTable.hashes()[0] //gives headers in the data table

  const actualBrand_Text=await page.getByRole('cell', { name: 'Toyota' }).textContent()
  const actualModel_text=await page.getByRole('cell', { name: 'X40' }).textContent()

   expect(actualBrand_Text).toEqual(header.Brand)  //Toyota 
   expect(actualModel_text).toEqual(header.Model)   //X40 in dataTable

});

Then('I verify first row with {string} has Brand name {string} and Model name {string}', async ({ page }, plate, brand, model) => {
 const first_row_text=  await page.locator("//tbody//tr[1]").textContent()
expect(first_row_text).toContain(brand)
expect(first_row_text).toContain(model)
await console.log("the edited brand and model appeared in the text of first row like:",first_row_text )

});



Then('verify vehicle status is not {string}', async ({page}, text) => {
  const firstRowText=await page.locator("//tbody//tr[1]").textContent()
  await expect(firstRowText).not.toContain(text)
});

Then('verify driver names are correctly visible in the first row:', async ({page}, dataTable) => {
  const row=dataTable.hashes()[0]
  const firstRowText=await page.locator("//tbody//tr[1]").textContent()
  await expect(firstRowText).toContain(row.driver1)
  await expect(firstRowText).toContain(row.driver2)

});