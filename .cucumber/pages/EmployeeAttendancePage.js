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
        this.save_changes_after_click_edit_attendance = this.page.getByRole('button', { name: 'Save' })
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

        //after click edit
        this.employee_id_number = this.page.locator("//span[.='Employee ID']/../p")
        this.current_holiday_entitlement_number = this.page.locator("//span[.='Current holiday entitlement']/../p")
        this.leave_days_number = this.page.locator("//span[.='Used leave days']/../p")
        this.remaining_day_number = this.page.locator("//span[normalize-space()='Remaining leave']/../p")
        this.sick_leave_number = this.page.locator("//span[normalize-space()='Sick leave']/../p")
        this.letter_to_choose = this.page.locator(`//li[normalize-space()='K']`)
        //dynamic locaters
        //this.dayNumberInMonth=this.page.locator(`//tbody/tr[2]/td[1]/span[${intValue}]/div[1]`)  //method parameter should be numeric
        //this.attendance_box_in_day=this.page.locater(`//tbody/tr[1]/td[1]/div[${dayNumber}]/div[1]/div[1]`)
    }
    /**
     * Choose a day to fill the status letter, which shows the attendance of an employee on that day.
     * @param {string} letter - The letter representing the day to be selected (e.g., 'K', 'M').
     * @example
     * await selectLetter_and_click('K'); // Selects the 'K' letter.
     */

    async selectLetter_and_click_and_save(letter) {
        const letterLocator = await this.page.locator(`//li[.='${letter}']`);

        // Check if the letter is visible before interacting
        if (await letterLocator.isVisible()) {
            await letterLocator.click({ force: true });
            await this.page.getByRole('button', { name: 'Save' }).click();
            await this.page.waitForTimeout(3000)

        } else {
            throw new Error(`The letter '${letter}' was not found on the page.`);
        }
    }



    /**
   * Click the attendance edit box for a specific day, with error handling for non-clickable elements.
   * @param {number} dayNumberInMonth - The day number in the month (e.g., 1 for the 1st day).
   */
    async click_the_dayChosen_attendance_edit_box(dayNumberInMonth) {
        // Locate the attendance box for the given day
        const attendanceBox = this.page.locator(`//tbody/tr[1]/td[1]/div[${dayNumberInMonth}]/div[1]/div[1]`);

        try {
            // Assert the visibility of the attendance box
            await expect(attendanceBox).toBeVisible({ timeout: 5000 });

            // Assert that the attendance box is enabled (clickable)
            await expect(attendanceBox).toBeEnabled({ timeout: 5000 });

            // Perform the click action
            await attendanceBox.click();
        } catch (error) {
            // Throw a custom error message if the box is not clickable
            throw new Error(`Attendance box for day ${dayNumberInMonth} is not clickable, Error details: ${error.message}`);
        }
    }












}