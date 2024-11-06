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


        //vacation,Extra Holiday, new /Canceled and other all title 
        this.employee_vacation_presence_titles_all = this.page.getByText('Employee AttendanceNovember2024UVacationKSick LeaveSExtra HolidayAPresentNNew')






    }











}