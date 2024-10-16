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

        // Payroll module selectors
        this.payroll_module_btn = this.page.getByRole('button', { name: 'Payroll' });
        this.Payroll_heading = this.page.getByRole('heading', { name: 'Payroll' });

        // Month and Year select elements
        this.months_all = this.page.locator("//ul[@role='listbox']//li"); // 12 elements
        this.years_All = this.page.locator("//ul[@role='listbox']//li"); // 4 elements

        this.month_fieldset = this.page.locator("//fieldset[1]")
        this.year_fieldset = this.page.locator("//fieldset[2]")

        this.month_select_svg_btn = this.page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSelect-icon'])[1]");
        this.years_select_svg_btn = this.page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSelect-icon'])[2]");
        
        // Export button and related actions
        this.export_to_Excel = this.page.getByRole('button', { name: 'Export to Excel' });
        this.select_export_company_svg_btn = this.page.locator("(//*[name()='svg'][@class='MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined'])[1]");
        this.companies_select_All = this.page.locator("//div[@id='menu-']//li"); // Multiple elements

        this.export_to_Excel2 = this.page.getByRole('button', { name: 'Export to Excel' });
        this.alert_after_export_click = this.page.locator('div').filter({ hasText: /^Bitte berechnen Sie zuerst alle Löhne$/ }).nth(3);

        // Filter fields
        this.filter_employee_id =this.page.getByRole('columnheader', { name: 'Employee ID' }).getByPlaceholder('Filter') // Define actual selector
        this.filter_first_name = this.page.getByRole('columnheader', { name: 'First Name' }).getByPlaceholder('Filter')  // Define actual selector
        this.filter_last_name = this.page.getByRole('columnheader', { name: 'Last Name' }).getByPlaceholder('Filter') // Define actual selector

        // Column headers for employee table
        this.column_headers_above_table = this.page.locator("(//strong)"); // 7 headers

        // Table rows and navigation
        this.first_row_edit_btn = this.page.locator("//tbody//tr[1]//td[8]/button[1]");
        this.table_row1 = this.page.locator('//tbody//tr[1]');
        this.table_rows = this.page.locator('//tbody//tr');

        // Pagination
        this.lines_per_page = this.page.getByText('Lines per page:');
        this.page_employee_number_10 = this.page.locator("//li[normalize-space()='10']");
        this.page_employee_number_25 = this.page.locator("//li[normalize-space()='25']");
        this.page_employee_number_50 = this.page.locator("//li[normalize-space()='50']");
        this.nextpage_arrow = this.page.getByLabel('Next page');
        this.previous_page_arrow = this.page.getByLabel('Previous page');
    }
}
