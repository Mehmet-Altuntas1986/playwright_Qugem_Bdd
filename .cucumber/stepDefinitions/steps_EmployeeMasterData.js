import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';



const { When, Then, Given, Before } = createBdd();

const dotenv = require('dotenv');
dotenv.config();

// Declare page objects outside the hook so you can use in all Given when Then blocks
let basePage;
let loginPage;
let dashboard;
let newPage;   //When the new window or tab is opened ,I will initialize it inside when,Then blocks
let employeeMasterData;

Before(async ({ page }) => {
  basePage = new BasePage(page);
  loginPage = new LoginPage(page);
  dashboard = new DashboardPage(page);
  employeeMasterData = new EmployeeMasterDataPage(page);

});




Then('I click the Employee_Master_data module', async ({ page }) => {
  await employeeMasterData.employee_master_data_btn.click()
  await page.waitForURL("https://qugem-staging.netlify.app/employee")
  await expect(employeeMasterData.add_btn).toBeVisible();
  await expect(employeeMasterData.add_btn).toBeEnabled();

});

Then('I verify that the Employees table title is visible', async ({ page }) => {
  await expect(employeeMasterData.employees).toBeVisible()
  await expect(employeeMasterData.employees).toBeEnabled()
});


Then('I verify that the {string} and {string} selection buttons are visible and functional', async ({ page }, companyLabel, clientLabel) => {
  const companyElement = employeeMasterData.company_firmen_select;
  const clientElement = employeeMasterData.client_firmen_select;

  // Log or use companyLabel and clientLabel if needed ${parametre , variable name i icine koy} sonra string e donusuturur 
  console.log(`Verifying visibility and functionality for: ${companyLabel} and ${clientLabel}`);

  // Verify visibility
  await expect(companyElement).toBeVisible(); // Check if the Company button is visible
  await expect(clientElement).toBeVisible(); // Check if the Client button is visible

  // Verify functionality
  await expect(companyElement).toBeEnabled(); // Check if the Company button is functional
  await expect(clientElement).toBeEnabled(); // Check if the Client button is functional
});

Then('I enter {string} in the employee search field', async ({ page }, nameFilter) => {
  await employeeMasterData.first_name_filter.click()
  await employeeMasterData.first_name_filter.fill(nameFilter)







});

Then('verify the employee name {string} should be visible in the first row of the table', async ({ page }, nameSearched) => {
  const firstNameElement = employeeMasterData.firstRow_secondColumn_firstName;

  await expect(firstNameElement).toBeVisible();

  const firstName = await firstNameElement.textContent();


  // Kontrol: Eğer firstName `null` veya boşsa
  if (!firstName || firstName.trim() === "") {
    console.error("Employee name element is empty or not found.");
  } else {
    console.log('Employee name: ${firstName} is found');
  }


});



Then('I delete the Filter input', async ({ page }) => {

  await employeeMasterData.first_name_filter.fill('')
  await page.waitForTimeout(1000) //dont delete here , after cleaning filter are , a little bit wait is necessary

});

Then('verify {string} should not be in the first row', async ({ page }, deletedNameInFilter) => {

  const firstName = await employeeMasterData.firstRow_secondColumn_firstName.textContent(); // textContent'i await ile çağır

  if (firstName !== deletedNameInFilter) {
    console.log(`${deletedNameInFilter}: is not present in the first row : test passed`);
  } else {
    console.log(`${deletedNameInFilter}: is present in the first row`);
    // Testi bilerek fail et
    throw new Error(`${deletedNameInFilter} is still present in the first row, but it should have been in the first row`);

  }
});


When('I click the company dropdown', async ({ page }) => {
  await page.locator(basePage.company_svg_btn_lc).click();
  await page.waitForTimeout(2000)

});

Then('all companies in dropdown are visible and clickable', async ({ page }) => {
  const elements = await page.locator(basePage.companyDropdownElements_lc); // Elementleri al
  const company_dropdown_el = await page.locator(basePage.company_svg_btn_lc) // Firma seçimini al
  // Firma seçimini al

  // Burada doğru company elementini geçiriyoruz
  await basePage.clickAllElementsAndCheckVisibilityAndClickability(elements, company_dropdown_el);
});

When('I click the client companies dropdown button', async ({ page }) => {
  await page.locator(basePage.client_svg_btn_lc).click();
  await page.waitForLoadState('domcontentloaded')
});

Then('I see client companies are visible and clickable', async ({ page }) => {
  const client_companies_select_btn = page.locator(basePage.client_firmen_select_btn)
  const elements = page.locator(basePage.clientFirmaDropdownElements_lc); // Elementleri al

  await basePage.clickAllElementsAndCheckVisibilityAndClickability(elements, client_companies_select_btn);

});

Then('I click the employee add button', async ({ page }) => {
  await page.locator("button[aria-label='add']").click({ force: true })
  await page.waitForTimeout(1000)
});

Then('I click active check button', async ({ page }) => {
  await employeeMasterData.active_btn.check()


})

When('I fill {string} {string} {string}  {string}  {string}', async ({ page }, firstName, LastName, Emp_Id, tax_id, grosSalary) => {
  await employeeMasterData.first_Name_in.fill(firstName)
  await employeeMasterData.last_Name_in.fill(LastName)
  await employeeMasterData.employee_id.fill(Emp_Id)
  await employeeMasterData.tax_id.fill(tax_id)
  await employeeMasterData.gross_salary.fill(grosSalary)
});


When('I fill soc_no {string} _postcode {string} _holidayNumYearly {string} _travelFare {string} _fixed_allowance {string} _dispacher {string} _adress {string}', async ({ page }, soc_no, postcode, holidayNumYearly, travelFare, fixed_allowance, dispacher, adress) => {
  await employeeMasterData.social_Security_Number.fill(soc_no)
  await employeeMasterData.postal_code.fill(postcode)
  await employeeMasterData.holiday_entitlement.fill(holidayNumYearly)
  await employeeMasterData.travel_fare.fill(travelFare)
  await employeeMasterData.fixed_allowance.fill(fixed_allowance)
  await employeeMasterData.dispatcher_input.fill(dispacher)
  await employeeMasterData.adress.fill(adress)

});



Then('I see there is current date visible in entry date input box before I edit', async ({ page }) => {
  // Stuttgart, Almanya saat dilimine göre mevcut tarihi alın
  const currentDate = new Date();
  const options = { timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('de-DE', options).format(currentDate);  // GG.AA.YYYY formatı

  // Input alanındaki değeri alın (YYYY-MM-DD formatı)
  const inputValue = await employeeMasterData.entry_date_calender.inputValue();

  // Input alanındaki tarihi GG.AA.YYYY formatına çevirin
  const [inputYear, inputMonth, inputDay] = inputValue.split('-');  // YYYY-MM-DD formatını parçala
  const formattedInputDate = `${inputDay}.${inputMonth}.${inputYear}`;  // GG.AA.YYYY formatına dönüştür

  // Log ile input değerini göster
  console.log('Input Date:', formattedInputDate);  // Örn: "28.09.2024" veya "29.09.2024"

  // Beklenen tarih ile karşılaştır
  expect(formattedInputDate).toBe(formattedDate);

});





Then('I see exit date input box is not functional because personal active button is checked', async ({ page }) => {
  await expect(employeeMasterData.exit_date_calender).not.toBeEnabled();

});

Then('I see netSalary input box is still empty', async ({ page }) => {
  const netSalaryInput = employeeMasterData.net_Salary;
  const inputValue = await netSalaryInput.inputValue();
  expect(inputValue).toBe(''); // Expect the input to be empty

});



Then('I click company and choose option quickly transporte gmbh', async ({ page }) => {
  await page.getByLabel('Company *').click();
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: 'QUICKLY TRANSPORTE GMBH' }).click();

});

Then('I click Role and choose option LKW Fahrer', async ({ page }) => {
  await page.getByLabel('Role *').click();
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: 'LKW Fahrer' }).click();

});

Then('I click Client and choose option Hermes', async ({ page }) => {
  await page.getByLabel('Client *').click();
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: 'Hermes' }).click();

});

Then('I click Wage Type and choose option Full_Time', async ({ page }) => {
  await page.getByLabel('Wage type *').click();
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: 'Full-time' }).click();

});

Then('I click Tax Class and choose option {int}', async ({ page }, arg) => {
  await page.getByLabel('Tax Class *').click();
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: '3' }).click();

});

Then('I click Health insurance choose Ikk Classic', async ({ page }) => {

  await page.locator("//input[@id='health-select']").click()
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: 'IKK classic' }).click();


});

Then('I click Child allowance and choose {int}', async ({ page }, arg) => {
  await page.getByLabel('Child Allowance *').click();
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: '2', exact: true }).click();
});

Then('I click Chirch Tax and choose evangelishe kirchensteuer', async ({ page }) => {
  await page.getByLabel('Church Tax *').click();
  await page.waitForLoadState('load')
  await page.getByRole('option', { name: 'ev - Evangelische' }).click();
});

Then('I check buttons of meal allowance taxed_night surcharge_hourly Temp_meal allowance_night surcharge {int}_ travel Fahre', async ({ page }, arg) => {
  await page.getByLabel('Meal Allowance taxed at flat').check();
  await page.getByLabel('Night Surcharge 25%').check();
  await page.getByLabel('Hourly temp').check();
  await page.getByLabel('Meal Allowance', { exact: true }).check();
  await page.getByLabel('Night Surcharge 40%').check();
  await page.getByLabel('Travel Fare').check();
});

Then('I choose payment Type', async ({ page }) => {
  await page.getByLabel('Bank').check();
});

Then('I see if I filled correctly , calculate salary button becomes functional', async ({ page }) => {
  await expect(employeeMasterData.calculate_salary_btn).toBeEnabled()
});

When('I click the calculate salary button', async ({ page }) => {
  await employeeMasterData.calculate_salary_btn.click({ timeout: 6000 })


});

Then('I can see netSalary of the new employee', async ({ page }) => {
  // Net maaşın null olmadığını kontrol edin
  expect(employeeMasterData.net_Salary).not.toBe(null);

  // Net maaş değerini almak için await kullanın
  const netSalaryText = await employeeMasterData.net_Salary.textContent();

  // Net maaşı konsola yazdırın
  console.log("Net salary is: " + netSalaryText);

});


Then('I click save changes', async ({ page }) => {

  await page.getByRole('button', { name: 'Save Changes' }).nth(1).click(); //baska bisey ekleme
  await page.waitForTimeout(3000)

});

Then('I wait for the Url {string}', async ({ page }, url) => {
  await page.waitForURL(url);
  await page.waitForLoadState()
  await page.waitForTimeout(1000)



});

Then('I verify the alert says {string}', async ({ page }, textInAlert) => {
  // Dialog (alert) olayını dinleyin
  page.on('dialog', async dialog => {
    const alertText = dialog.message();  // Alert mesajını alır
    console.log('Alert Text:', alertText);

    // Beklenen alert mesajı ile karşılaştırın
    await expect(alertText).toBe(textInAlert);

    // Alert'i kapat
    await dialog.accept();  // Alert penceresini 
  });

});






Then('I navigate to {string}', async ({ page }, url) => {
  await page.goto(url)
  await page.waitForLoadState() //('load') defaualt load


});


Then('I use no filter and write {string} and verify it brings to the first row employee {string} and {string}', async ({ page }, id, name, lastname) => {
  try {
    // Clear and apply the new filter
    await employeeMasterData.no_filter.fill(''); // Clear any existing filter
    await employeeMasterData.no_filter.fill(id); // Fill with the new ID

    // Wait for the first row to be visible after applying the filter
    await page.waitForSelector('//tbody//tr[1]', { state: 'visible', timeout: 10000 });

    // Slight delay for stability
    await page.waitForTimeout(1000);

    // Check if the first row is visible
    const isRowVisible = await page.isVisible('//tbody//tr[1]');
    if (!isRowVisible) {
      throw new Error('The first row is not visible or not present.');
    }

    // Retrieve first name and last name from the first row
    const first_Name = await employeeMasterData.firstRow_secondColumn_firstName.innerText();
    const last_Name = await employeeMasterData.firstRow_secondColumn_lastname.innerText();

    // Log for debugging
    console.log(`Expected first name: ${name}, Actual first name: ${first_Name}`);
    console.log(`Expected last name: ${lastname}, Actual last name: ${last_Name}`);

    // Validate the first name and last name
    expect(first_Name).toBe(name);
    expect(last_Name).toBe(lastname);
  } catch (error) {
    console.error('An error occurred during the verification:', error.message);
    throw error; // Optionally rethrow the error to fail the test
  }
});



Then('I verify client firma shoud be {string}', async ({ page }, hermes) => {
  const client = await page.locator('//tbody/tr[1]/td[4]').textContent()
  await expect(client).toBe(hermes)
});

Then('I verify company should be {string}', async ({ page }, quickly) => {
  const company = await page.locator('//tbody/tr[1]/td[5]').textContent()
  expect(company).toBe(quickly)

});

Then('I verify role is {string}', async ({ page }, LkwFahrer) => {
  const role = await page.locator('//tbody/tr[1]/td[7]').textContent()
  expect(role).toBe(LkwFahrer)

});


Then('I verify employee status is {string}', async ({ page }, activeText) => {
  const active = await page.locator('//tbody/tr[1]/td[11]').textContent()
  await expect(active).toBe(activeText)
});

Then('I verify new added emnployee edit button is visible and clickable', async ({ page }) => {
  const editButton = page.locator('//tbody/tr[1]/td[11]')
  await expect(editButton).toBeVisible()
  await expect(editButton).toBeEnabled()

});
Then('I click edit button', async ({ page }) => {
  await employeeMasterData.employee_first_row_edit_btn.click({ force: true, timeout: 1000 })


});

Then('I see an alert with text : name surname {string}', async ({ page }, textPartInAlert) => {

  //once employee edit , sonra save changes a tiklamsitik - sonra bir alert cikiyor ornegin mehmet tester was updated succesfully

  const actualText = await page.getByRole('alert').textContent()
  console.log("the actual text after clicking edit --> save changes is :", actualText)
  expect(actualText).toContain(textPartInAlert)




});





Then('I find the added employee delete button and click it', async ({ page }) => {
  await employeeMasterData.employee_first_row_delete_btn.click();
});

Then('I verify the alert text {string} and click yes in alert', async ({ page }, expectedAlertText) => {
  const actualTextInAlert = await page.locator("//h2[contains(text(),'Are you sure you want to permanently delete?')]").textContent()
  await expect(actualTextInAlert).toContain(expectedAlertText);
  await page.locator("//span[normalize-space()='yes']").click()

});

Then('I see an alert info message {string}', async ({ page }, expectedInfoMessage) => {
  await page.waitForTimeout(1000)
  const actualTextInAlert = await page.getByText('Employee was deleted').textContent()
  await expect(actualTextInAlert).toContain(expectedInfoMessage);

});


Then('I verify the alert warns {string}', async ({ page }, AlertText) => {
  const text = await page.getByRole('alert').textContent()
  await expect(text).toBe(AlertText)


});


Then('verify that with same {string} new employee cannot be added', async ({ page }, emp_id) => {
  // Clear and input the employee ID in the filter field
  await employeeMasterData.no_filter.fill('');
  await employeeMasterData.no_filter.fill(emp_id);

  await page.waitForSelector("//tbody//tr", { state: 'visible', timeout: 10000 })
  await page.waitForTimeout(2000)

  // Count the number of rows found
  const rowCount = await employeeRows.count();

  // If more than one row is found, fail the test
  if (rowCount > 1) {
    throw new Error(`More than one employee found with the same ID (${emp_id}). Test failed.`);
  } else {
    console.log(`Employee with ID ${emp_id} is unique. Test passed.`);
  }
});


Then('I delete if in any row, surname column text is tester or developer', async ({ page }) => {
  await employeeMasterData.delete_TesterOrDeveloper_A_Row_Has()

});


Then('verify if you write tester or developer in filter surname, row1 is invisible', async ({ page }) => {
  // Clear the filter before applying a new one
  await employeeMasterData.last_name_filter.fill(''); // Clear the filter

  // Filter by "tester"
  await employeeMasterData.last_name_filter.fill('tester'); // Apply "tester" filter

  // Wait for the first row to be hidden (invisible) for "tester"
  await page.locator('//tbody/tr[1]').waitFor({ state: 'hidden', timeout: 5000 });

  // Assert that row1 is not visible for "tester"
  const isRow1Visible = await page.locator('//tbody/tr[1]').isVisible();
  expect(isRow1Visible).toBeFalsy();

  // Clear the filter again before applying "developer" filter
  await employeeMasterData.last_name_filter.fill(''); // Clear the filter
  await employeeMasterData.last_name_filter.fill('developer'); // Apply "developer" filter

  // Wait for the first row to be hidden (invisible) for "developer"
  await page.locator('//tbody/tr[1]').waitFor({ state: 'hidden', timeout: 5000 });

  // Assert that row1 is not visible for "developer"
  const isRow1VisibleDev = await page.locator('//tbody/tr[1]').isVisible();
  expect(isRow1VisibleDev).toBeFalsy();
});



Then('I select {string} using the company selection button, and choose {string} using the client selection button"', async ({ page }, company, client_firma) => {
  await page.getByLabel('Select Company').click();
  await page.getByRole('menuitem', { name: company }).click();
  await page.getByLabel('Select Client').click();
  await page.getByRole('menuitem', { name: client_firma }).click();


});

Then('I delete all filter sections to start every test Scenario with a clear filter', async ({ }) => {
  await employeeMasterData.first_name_filter.fill('')
  await employeeMasterData.last_name_filter.fill('')
  await employeeMasterData.no_filter.fill('')

});


Then('I should not see the new employee added using another employee tax id  {string} {string} added to system', async ({ page }, firstName, lastName) => {
  // İlk satırdaki isim ve soyisim bilgilerini al
  const addedFirstName = await employeeMasterData.firstRow_secondColumn_firstName.textContent();
  const addedLastName = await employeeMasterData.firstRow_thirdColumn_lastname.textContent();

  const isSameEmployee = (addedFirstName === firstName) && (addedLastName === lastName);

  if (isSameEmployee) {
    throw new Error(`An employee with the same tax ID already exists: ${firstName} ${lastName}.`);
  }
});

Then('I click save changes again after edition of the employee', async ({ page }) => {
  await page.getByRole('button', { name: 'Save Changes' }).nth(1).click();

});

When('I check if Lines per page select button is functional and visible', async ({ page }) => {
  await employeeMasterData.lines_per_page.waitFor(); // is a Playwright function that waits for the element to appear in the DOM before interacting with it
  await expect(employeeMasterData.lines_per_page).toBeVisible();
  await expect(employeeMasterData.lines_per_page).toBeEnabled();
});

Then('I click {string} employee choose in Lines Per Page', async ({ page }, number_chosen) => {
  if (number_chosen === 10) {
    await employeeMasterData.page_employee_number_10.click();
    await employeeMasterData.page_rows.waitFor()
  } else if (number_chosen === 25) {
    await employeeMasterData.page_employee_number_25.click();
    await employeeMasterData.page_rows.waitFor()

  } else if (number_chosen === 50) {
    await employeeMasterData.page_employee_number_50.click();
    await employeeMasterData.page_rows.waitFor()

  }
});

Then('I verify the number of rows in employee table is not more than the {string}', async ({ page }, number_chosen) => {
  const rowCount = await employeeMasterData.page_rows.count();
  expect(rowCount).toBeLessThanOrEqual(parseInt(number_chosen));
});

Then('I verify next page button is visible and clickable', async ({ page }) => {
  await employeeMasterData.nextpage_arrow.waitFor();  // Wait for the next page button to appear
  await expect(employeeMasterData.nextpage_arrow).toBeVisible();  // Ensure the button is visible
  await expect(employeeMasterData.nextpage_arrow).toBeEnabled();  // Ensure the button is clickable (enabled)

});

Then('I click employee table next page button , and verify number of rows are not more than {string}', async ({ }, number_chosen) => {
  // Click the next page button
  await employeeMasterData.nextpage_arrow.click();

  // Wait for the table to load the next page (you can wait for a specific element change)
  await employeeMasterData.page_rows.waitFor();

  // Get the row count in the employee table
  const rowCount = await employeeMasterData.page_rows.count();

  // Verify the row count is not more than the chosen number
  expect(rowCount).toBeLessThanOrEqual(parseInt(number_chosen));
});

Then('I click previous page button is visible and clickable', async ({ page }) => {
  // Wait for the previous page button to appear
  await employeeMasterData.previous_page_arrow.waitFor();

  // Ensure the previous page button is visible
  await expect(employeeMasterData.previous_page_arrow).toBeVisible();

  // Ensure the button is clickable (enabled)
  await expect(employeeMasterData.previous_page_arrow).toBeEnabled();
});

Then('I click employee table previous page button , and verify number of rows are not more than {string}', async ({ page }, number_chosen) => {
 // Click the previous page button
 await employeeMasterData.previous_page_arrow.click();

 // Wait for the table to load the previous page
 await employeeMasterData.page_rows.waitFor();

 // Get the row count in the employee table
 const rowCount = await employeeMasterData.page_rows.count();

 // Verify the row count is not more than the chosen number
 expect(rowCount).toBeLessThanOrEqual(parseInt(number_chosen));
});