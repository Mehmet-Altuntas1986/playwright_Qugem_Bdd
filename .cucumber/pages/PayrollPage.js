import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { config } from 'dotenv';
config();

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { BasePage } from './BasePage';
import { EmployeeMasterDataPage } from './EmployeeMasterDataPage';
import { VehiclesPage } from './VehiclesPage';



export class PayrollPage extends BasePage {

    constructor(page) {
        super(page);              
        this.page = page;
        this.payroll_module_btn=this.page.getByRole('button', { name: 'Payroll' })
        this.Payroll_heading=this.page.getByRole('heading', { name: 'Payroll' })

        //-------------------
        this.months_all=this.page.locator("//ul[@role='listbox']/li")  //12 elements. li[1] , li[2] boyle sona ekleyebilirsin
        this.years_All=this.page.locater("//div[@id='menu-']//li")  //4 elements      li[1] , li[2] boyle sona ekleyebilirsin
        
        this.month_any_select_with_regex=this.getByRole('option', { name:/^(January|February|March|April|May|June|July|August|September|October|November|December)$/ })


    }









}