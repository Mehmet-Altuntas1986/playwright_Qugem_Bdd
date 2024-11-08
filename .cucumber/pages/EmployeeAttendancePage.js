import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { config } from 'dotenv';
config();

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { BasePage } from './BasePage';
import { EmployeeMasterDataPage } from './EmployeeMasterDataPage';
import { PayrollPage } from './PayrollPage';
import { VehiclesPage } from './VehiclesPage';

export class EmployeeAttendancePage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        this.employee_Attendance_page_title = this.page.getByRole('heading', { name: 'Employee Attendance' })

        //svg select buttons
        this.month_select_svg_btn = this.page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSelect-icon'])[1]")
        this.year_select_svg_btn = this.page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSelect-icon'])[2]")


        //emplloye attandance status titles
        this.employee_attandance_status_titles = this.page.locator(`(//div[@class='MuiBox-root jss45 jss41'])[1]`)
        this.id_filter= this.page.getByRole('columnheader', { name: 'Employee ID' }).getByPlaceholder('Filter')
        this.firstName_filter=this.page.getByRole('columnheader', { name: 'First Name' }).getByPlaceholder('Filter')
        this.LastName_filter=this.page.getByRole('columnheader', { name: 'Last Name' }).getByPlaceholder('Filter')




    }











}