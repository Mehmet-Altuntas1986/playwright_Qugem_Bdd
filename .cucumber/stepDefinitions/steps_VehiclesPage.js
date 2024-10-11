import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';
import { VehiclesPage } from '../pages/VehiclesPage.js';
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
  vehicles=new VehiclesPage(page)
});


