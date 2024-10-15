import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';
import { VehiclesPage } from '../pages/VehiclesPage.js';
import exp from 'constants';
const allure = require('allure-playwright');

const { When, Then, Given, Before } = createBdd();

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
  await page.waitForLoadState('load')
});

Then('click add vehicle button', async ({ page }) => {
  await vehicles.vehicles_add_btn.click()

});


Then('fill in the input boxes of {string} , {string} , {string},{string},{string} {string} , {string} and {string}', async ({ page }, plate, brand, model, type, yearOfConstruction, yearOfPurchase, currentKm, purchasePrice) => {

  await vehicles.addVehicle_Input_Boxes(plate, brand, model, type, yearOfConstruction, yearOfPurchase, currentKm, purchasePrice)
});

Then('click save changes in vehicles edit page', async ({ page }) => {
  await vehicles.saveChanges_btn_in_edit_page.click()
  await page.waitForTimeout(1000)
  

});

Then('verify alert message text is {string}', async ({ page }, textExpected) => {
  const actualText=await vehicles.vehicle_added_alert.textContent()
  console.log("after clicking save changes, alert text content is :",actualText)
  expect(actualText).toBe(textExpected)
});

Then('delete if a vehicle is added for test purpose ,Vehicle plate is {string}', async ({page}, plate) => {
  
  await vehicles.deleteVehicleByPlate(plate)
});




Then('verify that you are in the Vehicle details page', async ({ page }) => {

});

Then('verify that added vehicle properties are found in Vehicle details page', async ({ page }) => {
  // ...
});

// 8. Missing step definition for ".cucumber/features/vehicles.feature:19:9"
Then('verify that you are in the page of Vehicle List', async ({ page }) => {
  // ...
});

// 9. Missing step definition for ".cucumber/features/vehicles.feature:20:9"
Then('verify that you see added vehicle properties in vehicle list page', async ({ page }) => {
  // ...
});

// 10. Missing step definition for ".cucumber/features/vehicles.feature:21:9"
Then('click the detail button and verify vehicle details are all there', async ({ page }) => {
  // ...
});