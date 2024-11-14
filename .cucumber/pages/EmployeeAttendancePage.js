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
        this.page_rows = this.page.locator('//tbody//tr');

        //svg select buttons
        this.month_select_svg_btn = this.page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSelect-icon'])[1]")
        this.year_select_svg_btn = this.page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSelect-icon'])[2]")


        //emplloye attandance status titles
        this.employee_attandance_status_titles = this.page.locator(`(//div[@class='MuiBox-root jss45 jss41'])[1]`)
        this.id_filter = this.page.getByRole('columnheader', { name: 'Employee ID' }).getByPlaceholder('Filter')
        this.firstName_filter = this.page.getByRole('columnheader', { name: 'First Name' }).getByPlaceholder('Filter')
        this.LastName_filter = this.page.getByRole('columnheader', { name: 'Last Name' }).getByPlaceholder('Filter')

        //---------------
        this.edit_Button_in_first_row = this.page.getByLabel('Edit')
        this.note_btn_for_attendance = this.page.getByLabel('Open Note')
        this.textBox_note = this.page.getByRole('textbox')
        this.save_changes_after_clcik_edit_attendance = this.page.getByRole('button', { name: 'Save Changes' })
        this.cancel_btn_after_click_edit_attendance = this.page.getByRole('button', { name: 'Cancel' })
        this.header_name_surname_after_click_edit = this.page.locator('#form-dialog-title')

        //after click edit
        this.headers_with_id_holidayentitlement_leavedays_Remainingleave_Sickleave = this.page.locator('.MuiGrid-root > .MuiPaper-root')

        //rows to manage 
        this.lines_per_page = this.page.getByText('Lines per page:')
        this.page_employee_number_10 = this.page.locator("//li[normalize-space()='10']")
        this.page_employee_number_25 = this.page.locator("//li[normalize-space()='25']")
        this.page_employee_number_50 = this.page.locator("//li[normalize-space()='50']")
        this.page_rows = this.page.locator('//tbody//tr');

        this.nextpage_arrow = this.page.getByLabel('Next page')
        this.previous_page_arrow = this.page.getByLabel('Previous page')



    }











}