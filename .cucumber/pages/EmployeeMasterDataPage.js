

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { config } from 'dotenv';
config();

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { BasePage } from './BasePage';



export class EmployeeMasterDataPage extends BasePage {

  constructor(page) {
    super(page);               //this key represents class
    this.page = page;


    // & list of elements  --this locater represents more than one element
    this.companyDropdownElements = "//ul[@role='menu'][1]/li";
    this.clientFirmaDropdownElements = "//ul[@role='menu'][2]/li";

    // & filters elements
    this.no_filter = this.page.getByRole('columnheader', { name: 'No' }).getByPlaceholder('Filter')
    this.first_name_filter = this.page.getByRole('columnheader', { name: 'First Name' }).getByPlaceholder('Filter')
    this.last_name_filter = this.page.getByRole('columnheader', { name: 'Last Name' }).getByPlaceholder('Filter')

    // & table first row, first column (id comes)
    this.firstRow_firstColumn_id = this.page.locator("//tbody/tr[1]/td[1]")
    // & table first row, second column (first name comes here)
    this.firstRow_secondColumn_firstName = this.page.locator('//tbody/tr[1]/td[2]')
    // & table first row third column value --last name
    this.firstRow_secondColumn_lastname = this.page.locator('//tbody/tr[1]/td[3]')
    //table headers
    this.table_headers = this.page.locator(`//th//strong`) //11 elements

    this.max_musterman = "//span[normalize-space()='Max Mustermann']"
    this.sign_out = "//li[normalize-space()='Sign out']"
    this.languages_btn = "//img[@alt='Flag']"
    this.german = "//li[normalize-space()='Deutsch']"
    this.türkish = "//li[normalize-space()='Türkçe']"
    this.english = "//li[normalize-space()='English']"

    //modules
    this.dashboard_btn = this.page.getByRole('button', { name: 'Dashboard' }) //element
    this.employee_master_data_btn = this.page.getByRole('button', { name: 'Employee Master data' }); //here is element , not locater

    //firmen select on top of page
    this.company_firmen_select = this.page.getByLabel('Select Company')
    this.client_firmen_select = this.page.getByLabel('Select Client')

    //table Locaters
    this.add_btn = this.page.getByLabel('add') //this.add_btn=this.page.locator("button[aria-label='add']")
    this.employee_first_row_edit_btn = this.page.locator("tbody tr:nth-child(1) td:nth-child(12) div:nth-child(1) button:nth-child(1) span:nth-child(1) svg")
    this.employee_first_row_delete_btn = this.page.locator("//tbody/tr[1]/td[12]/div[1]/button[2]/span[1]//*[name()='svg']//*[name()='path' and contains(@d,'M6 19c0 1.')]")


    this.employees = this.page.getByRole('heading', { name: 'Employees' })
    this.employee_information = this.page.getByRole('heading', { name: 'Employee information' })
    this.no_btn = this.page.getByRole('button', { name: 'No' })
    this.firstName = this.page.getByRole('button', { name: 'First Name' })
    this.last_name = this.page.getByRole('button', { name: 'Last Name' })
    this.client = this.page.getByRole('button', { name: 'Client', exact: true })
    this.company = this.page.getByRole('button', { name: 'Company', exact: true })
    this.entry_date = this.page.getByRole('button', { name: 'Entry Date' })
    this.role = this.page.getByRole('button', { name: 'Role' })
    this.dispatcher = this.page.getByRole('button', { name: 'Dispatcher' })
    this.wage_type = this.page.getByRole('button', { name: 'Wage type' })
    this.current_vehicle = this.page.getByRole('button', { name: 'Current Vehicle' })
    this.status = this.page.getByRole('button', { name: 'Status' })
    
    this.lines_per_page = this.page.getByText('Lines per page:')
    this.page_employee_number_10 = this.page.locator("//li[normalize-space()='10']")
    this.page_employee_number_25 = this.page.locator("//li[normalize-space()='25']")
    this.page_employee_number_50 = this.page.locator("//li[normalize-space()='50']")
    this.page_rows = this.page.locator('//tbody//tr');

    this.nextpage_arrow = this.page.getByLabel('Next page')
    this.previous_page_arrow = this.page.getByLabel('Previous page')


    //after clicking add employee button
    this.first_Name_in = this.page.locator('input[name="firstName"]')
    this.last_Name_in = this.page.locator('input[name="lastName"]')
    this.employee_id = this.page.locator('input[name="employeeNumber"]')
    this.social_Security_Number = this.page.locator('input[name="socialSecurityNumber"]')
    this.tax_id = this.page.locator('input[name="taxId"]')
    this.adress = this.page.locator('input[name="address"]')
    this.postal_code = this.page.locator('input[name="postCode"]')
    this.state_select = this.page.getByLabel('State *')
    this.city = this.page.getByLabel('City *')
    this.active_btn = this.page.getByLabel('Active')
    this.entry_date_calender = this.page.getByLabel('Entry Date *')
    this.exit_date_calender = this.page.locator('input[name="exitDate"]')
    //select buttons
    this.company_select = this.page.getByLabel('Company *')
    this.QUICKLY_TRANSPORTE_GMBH = this.page.getByRole('option', { name: 'QUICKLY TRANSPORTE GMBH' })

    this.role_select = this.page.getByLabel('Role *')
    this.role_slc_elements = this.page.locator('[role="option"]');

    this.client_select = this.page.getByLabel('Client *')
    this.dispatcher_input = this.page.locator('input[name="dispatcher"]')
    this.holiday_entitlement = this.page.locator('input[name="annualLeave"]')
    this.wage_type_select = this.page.getByLabel('Wage type *')
    this.tax_class_select = this.page.getByLabel('Tax Class *')
    this.health_insurance_select = this.page.getByLabel('Health Insurance *')
    this.child_allowance_select = this.page.getByLabel('Child Allowance *')
    this.church_tax_select = this.page.getByLabel('Church Tax *')
    this.gross_salary = this.page.locator('input[name="grossSalary"]')
    this.travel_fare = this.page.locator('input[name="travelFare"]')
    this.fixed_allowance = this.page.locator('input[name="fixedAllowance"]')
    this.net_Salary = this.page.locator('input[name="netSalary"]')
    this.weekly_working_hours = this.page.locator('input[name="weeklyHours"]')
    this.workdays_per_week_select = this.page.getByLabel('Workdays per Week *')
    this.daily_working_hours = this.page.locator('input[name="dailyWorkingHours"]')
    this.hourly_rate = this.page.locator('input[name="hourlyRate"]')
    //dont use click , use check or uncheck for this buttons
    this.Meal_Allowance_taxed_at_flat_rate_btn = this.page.getByLabel('Meal Allowance taxed at flat')
    this.meal_allowance = this.page.getByLabel('Meal Allowance', { exact: true })
    this.night_surcharge_forty = this.page.getByLabel('Night Surcharge 40%')
    this.travelFare = this.page.getByLabel('Travel Fare')
    this.night_surcharge_twentyfive = this.page.getByLabel('Night Surcharge 25%')
    this.hourly_temp = this.page.getByText('Hourly temp')
    this.distance_to_work = this.page.locator('input[name="travelDistanceKm"]')
    //click

    this.calculate_salary_btn = this.page.locator("//span[normalize-space()='Calculate Salary']")

    this.payment_type = this.page.getByText('Payment Type')
    this.bank_btn = this.page.getByText('Bank')
    this.cash_btn = this.page.getByText('Cash')

    this.save_changes = this.page.getByRole('button', { name: 'Save Changes' }).nth(1)
    this.cancel_btn = this.page.getByRole('button', { name: 'Cancel' }).nth(1)


    //after clicking save employee button
    this.es_Existiert_Bereit_Ein_Alert = this.page.getByText('Es existiert bereits ein')
    this.employee_was_added = this.page.getByText('Employee was added')

  }

  /**Company ve client firmalarindan birini secip tiklamada kullanabilirsin
   * usage: svg select buttonuna tikla
   * const optionName="GESAMT FIRMEN"  gordugun firmanin ismini dogru sekilde gir, sonra methodu cagir
   */
  async clickOnOptionByRole(optionName) {
    // Belirtilen role sahip tüm seçenekleri al
    const allOptions = await page.locator('[role="${role}"]').elementHandles();

    for (const option of allOptions) {
      const name = await option.innerText(); // Öğenin içeriğini al
      console.log('Found option: ${name}'); // Öğeyi yazdır

      // Eğer belirli bir seçenek adı verilmişse, ona göre kontrol et
      if (optionName && name === optionName) {
        await option.click(); // Tıkla
        console.log('Clicked on option: ${name}'); // Tıklanan seçeneği yazdır
        break; // İstediğiniz seçeneği bulduktan sonra döngüyü durdurun
      }
    }
  }


  /**use only employee id 123 ,124,125 to add new employee for test purposes
   * surname lere sadece tester yada developer yaz herbir testde
   * call this method in the background to make sure in any test if these emloyees are added , will be deleted before each scenario
   */


  /** Function to find and delete rows containing "tester" or "developer" */
  async delete_TesterOrDeveloper_A_Row_Has() {
    // First, handle rows with "tester"
    await this.deleteRowsWithFilter('tester');

    // Then, handle rows with "developer"
    await this.deleteRowsWithFilter('developer');
  }

  /** Helper function to delete rows based on a filter
   * use only 'tester' or 'developer' as parameter
   */

  async deleteRowsWithFilter(filterText) {
    let hasMatchingRow = true;

    // Loop to keep deleting matching rows
    while (hasMatchingRow) {
      // Clear the existing filter and apply the new one
      await this.last_name_filter.fill(''); // Clear existing filter
      await this.last_name_filter.fill(filterText); // Apply new filter

      await this.page.waitForTimeout(3000) //bu codu burda cikarirsan asagidaki count methodu otomatik bekler ve hata atar

      // Check if the first row exists
      const firstRowExists = await this.page.locator('//tbody//tr[1]').count();  //countun 30 sn bekleyecekti eger koymasaydik

      if (firstRowExists === 0) {
        // If no rows exist, exit the loop
        console.log('No rows found with tester or developer last name before each test scenario is tested.');
        hasMatchingRow = false;
        break;
      }

      // Check if the first row contains the filterText
      const firstRowText = await this.page.locator('//tbody//tr[1]//td[3]').textContent();

      // If the first row contains the filterText, delete the row
      if (firstRowText && firstRowText.includes(filterText)) {
        // Click the delete button in the 12th column
        await this.page.locator(`//tbody//tr[1]//td[12]/div[1]/button[2]/span[1]//*[name()='svg']//*[name()='path' and contains(@d,'M6 19c0 1.')]`).click();

        // Wait for the confirmation dialog
        await this.page.waitForSelector("//h2[contains(text(),'Are you sure you want to permanently delete?')]");

        // Confirm deletion if the alert text matches
        const alertText = await this.page.locator("//h2[contains(text(),'Are you sure you want to permanently delete?')]").textContent();
        if (alertText && alertText.includes('Are you sure you want to permanently delete?')) {
          await this.page.locator("//span[normalize-space()='yes']").click(); // Confirm deletion
          console.log(`Row with "${filterText}" found and deleted.`);

          // Wait for row deletion to complete
          await this.page.waitForTimeout(2000);
        } else {
          console.log("Alert text mismatch. Skipping deletion.");
        }
      } else {
        // No matching row, exit the loop
        console.log(`No more rows with last name: ${filterText} found before the test Scenario`);
        hasMatchingRow = false;
      }
    }

    // Clear the filter after all deletions
    await this.last_name_filter.fill('');
  }



  async deleteTesterAndDeveloperRows() {
    // Tester soyadını taşıyan satırları sil
    await this.deleteRowsWithFilter('tester');
    // Developer soyadını taşıyan satırları sil
    await this.deleteRowsWithFilter('developer');
  }











}




//module.exports = EmployeeMasterDataPage;

/*

async delete_Added_EmployeeByUsingFilter(id, name) {
  // Only proceed if the ID is 123, 124, or 125
  if (id === '123' || id === '124' || id === '125') {
    // Clear and set filters for ID and Name
    await this.no_filter.fill('');
    await this.no_filter.fill(id);
    await this.first_name_filter.fill('');
    await this.first_name_filter.fill(name);

    // Wait for the filter to be applied
    await this.page.waitForTimeout(1000);

    // Click the delete button for the first employee row
    await this.employee_first_row_delete_btn.click();

    // Check if the alert message is "Are you sure you want to permanently delete?"
    const actualTextInAlert = await this.page.locator("//h2[contains(text(),'Are you sure you want to permanently delete?')]").textContent();

    // If the alert contains this specific text, click "yes"
    if (actualTextInAlert.includes('Are you sure you want to permanently delete?')) {
      await this.page.locator("//span[normalize-space()='yes']").click();
    } else {
      console.log("Alert text does not match. Skipping deletion.");
    }

    // Wait for the confirmation alert and check its message
    const confirmationText = await this.page.getByText('Employee was deleted').textContent();
    if (confirmationText.includes("deleted")) {
      await expect(confirmationText).toContain("Employee was deleted successfully");
    }
  } else {
    console.log(`ID ${id} is not valid for deletion. Skipping...`);
  }
}





















  
  await page.getByLabel('add').click();

  await page.getByLabel('Company *').click();
  await page.getByRole('option', { name: 'QUICKLY TRANSPORTE GMBH' }).click();
 
  await page.getByLabel('Role *').click();
  await page.getByRole('option', { name: 'LKW Fahrer' }).click();

  await page.getByLabel('Client *').click();
  await page.getByRole('option', { name: 'TestClient25' }).click();

  await page.getByLabel('Wage type *').click();
  await page.getByRole('option', { name: 'Part-time' }).click();

  await page.getByLabel('Tax Class *').click();
  await page.getByRole('option', { name: '2' }).click();

  await page.getByLabel('Health Insurance *').click();
  await page.getByRole('option', { name: 'BKK exklusiv' }).click();
  await page.getByLabel('Open').click(); //svg button insurance svg button 
  await page.getByRole('option', { name: 'AOK Nordost' }).click();
  
  await page.getByLabel('Child Allowance *').click();
  await page.getByRole('option', { name: '4', exact: true }).click(); //tam sayiexact true 
  await page.getByLabel('Child Allowance *').click();
  await page.getByRole('option', { name: '1.5' }).click()

  await page.getByLabel('Church Tax *').click();
  await page.getByRole('option', { name: 'fs - Freireligiöse Gemeinde' }).click();

  await page.getByLabel('Client *').click();
  await page.getByRole('option', { name: 'TestClient25' })

  await page.getByLabel('Tax Class *').click();
  await page.locator('#menu- div').first().click();
  await page.getByLabel('fs - Freireligiöse Gemeinde').click();
  await page.getByRole('option', { name: 'fg - Freireligiöse' }).click();
  await page.getByLabel('Child Allowance *').click();
  await page.getByRole('option', { name: '2', exact: true }).click();
  await page.getByLabel('Child Allowance *').click();
  await page.getByRole('option', { name: '2.5' }).click();
  await page.getByLabel('Health Insurance *').click();
  await page.getByRole('option', { name: 'Audi BKK' }).click();
  await page.getByLabel('Open').click();
  await page.getByRole('option', { name: 'AOK Hessen' }).click();
  await page.getByLabel('Workdays per Week *').click();
  await page.locator('#menu- div').first().click();
  await page.getByLabel('Workdays per Week *').click();
  await page.getByRole('option', { name: '3' }).click();
  await page.getByLabel('Meal Allowance taxed at flat').uncheck();
  await page.getByLabel('Meal Allowance', { exact: true }).uncheck();
  await page.getByLabel('Night Surcharge 40%').uncheck();
  await page.getByLabel('Night Surcharge 25%').uncheck();
  await page.getByLabel('Travel Fare').uncheck();
  await page.getByLabel('Meal Allowance taxed at flat').check();
  await page.getByLabel('Night Surcharge 25%').check();
  await page.getByLabel('Bank').check();
  await page.getByRole('button', { name: 'Save Changes' }).nth(1).click();
*/