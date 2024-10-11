import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { config } from 'dotenv';
config();

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { BasePage } from './BasePage';
import { EmployeeMasterDataPage } from './EmployeeMasterDataPage';



export class VehiclesPage extends BasePage {

    constructor(page) {
        super(page);              
        this.page = page;

        


    }








}