import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage.js';
import { BasePage } from '../pages/BasePage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';
import { VehiclesPage } from '../pages/VehiclesPage.js';
import exp from 'constants';
import { EmployeeAttendancePage } from '../pages/EmployeeAttendancePage.js';
import { PayrollPage } from '../pages/PayrollPage.js';
import { ADDRGETNETWORKPARAMS } from 'dns';

const allure = require('allure-playwright');

const { When, Then, Given, Before, After } = createBdd();

const dotenv = require('dotenv');
dotenv.config();

// Declare page objects outside the hook so you can use in all Given when Then blocks
let basePage;
let loginPage;
let dashboard;
let newPage;   //When the new window or tab is opened ,I will initialize it inside when,Then blocks
let employeeMasterData;
let vehicles;
let payroll;
let employeeAttendance;

Before(async ({ page }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    dashboard = new DashboardPage(page);
    employeeMasterData = new EmployeeMasterDataPage(page);
    payroll = new PayrollPage(page)
    vehicles = new VehiclesPage(page)
    employeeAttendance = new EmployeeAttendancePage(page)
});


Then('verify page Title {string} is visible', async ({ page }, ExpectedTitle) => {
    const actualTitle = await employeeAttendance.employee_Attendance_page_title.textContent();
    expect(actualTitle.trim()).toBe(ExpectedTitle);
});

Then('I verify select month svg button is functional and I click it', async ({ page }) => {
    expect(await employeeAttendance.month_select_svg_btn).toBeEnabled()
    await employeeAttendance.month_select_svg_btn.click({ force: true })   //force true must be here
    await page.waitForTimeout(1000)

});

Then('I verify all {string} are visible and clickable', async ({ page }, month) => {
    await expect(page.getByRole('option', { name: `${month}` })).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole('option', { name: `${month}` })).toBeEnabled({ timeout: 3000 });
    console.log(`The ${month} is visible and clickable after clicking the SVG select month button`);


});

When('I click the chosen {string}', async ({ page }, month) => {
    await page.getByRole('option', { name: `${month}` }).click();
    await page.waitForTimeout(1000)
})

Then('I see {string} becomes visible in select Box', async ({ page }, month) => {
    await expect(page.getByText(`${month}`)).toBeVisible();
});


Then('I verify select year svg button is functional', async ({ page }) => {
    employeeAttendance = new EmployeeAttendancePage(page)
    expect(await employeeAttendance.year_select_svg_btn).toBeEnabled()

});

Then('I click year svg button', async ({ page }) => {
    await employeeAttendance.year_select_svg_btn.click({ force: true })   //force true must be here
    await page.waitForTimeout(1500)
});

Then('I verify {string} is visible and clickable in example', async ({ page }, year) => {
    await expect(page.getByRole('option', { name: `${year}` })).toBeVisible()
    await expect(page.getByRole('option', { name: `${year}` })).toBeEnabled()

});

When('I click the {string} in example', async ({ page }, year) => {
    if (parseInt(year) == 2024) {
        await page.locator("div[id='menu-'] li:nth-child(3)").click()
        await page.waitForTimeout(2000)

    } else {
        await page.getByRole('option', { name: `${year}` }).click({ force: true })
        await page.waitForTimeout(1000)
    }


});

Then('verify {string} becomes visible in select Box', async ({ page }, year) => {

    if (parseInt(year) == 2024) {
        await page.locator("div[id='menu-'] li:nth-child(3)").isVisible()       //2024 deki sorun boyle asildi
    } else {
        await expect(page.getByText(`${year}`)).toBeVisible()
    }

});

Then('the {string} should be visible on the page', async ({ page }, statusText) => {

    const statusElement = await page.locator(`//p[.='${statusText}']`);
    await expect(statusElement).toBeVisible();

});

When('I click the id filter', async ({ page }) => {
    await employeeAttendance.id_filter.click()

});


Then('If fill with id nummer {string}', async ({ page }, id) => {
    await employeeAttendance.id_filter.fill("")
    await employeeAttendance.id_filter.fill(id)
    await page.waitForTimeout(3000)

});


Then('I see in the first row employee data is visible like this:', async ({ page }, dataTable) => {
    const row = await dataTable.hashes()[0]; //gives headers in array
    const firstRowTextAll = await page.locator("//tbody//tr[1]").textContent()
    console.log("first row text all appeared like:", firstRowTextAll)
    expect(firstRowTextAll).toContain(row.id);
    expect(firstRowTextAll).toContain(row.name);
    expect(firstRowTextAll).toContain(row.surname);
    expect(firstRowTextAll).toContain(row.company);
});

Then('I click the name filter and fill with {string}', async ({ page }, name) => {
    await employeeAttendance.firstName_filter.click()
    await employeeAttendance.firstName_filter.fill("")
    await employeeAttendance.firstName_filter.fill(name)
});

Then('I click lastName filter and fill with {string}', async ({ page }, lastname) => {
    await employeeAttendance.LastName_filter.click()
    await employeeAttendance.LastName_filter.fill("")
    await employeeAttendance.LastName_filter.fill(lastname)
    await page.waitForTimeout(4000)

});

Then('I verify employee attendance edit button is visible and clickable', async ({ page }) => {
    await expect(employeeAttendance.edit_Button_in_first_row).toBeVisible()
    await expect(employeeAttendance.edit_Button_in_first_row).toBeEnabled({ timeout: 10000 })

});

Then('click edit button in first row of employee attendance page', async ({ page }) => {
    await employeeAttendance.edit_Button_in_first_row.click()
    await page.waitForTimeout(2000)
});

Then('I verify the {string} are visible', async ({ page }, textTitle) => {
    if (textTitle === "Sick leave") {
        const el = page.getByText(`${textTitle}`, { exact: true })
        await expect(el).toBeVisible({ timeout: 5000 })

    } else {
        const el = page.getByText(`${textTitle}`)
        await expect(el).toBeVisible({ timeout: 5000 })

    }
});

Then('I see first row has data like below:', async ({ page }, dataTable) => {
    const rows = await dataTable.hashes()
    const firstRoxText = await page.locator("//tbody//tr[1]").textContent()
    console.log(firstRoxText)
    expect(firstRoxText).toContain(rows[0].id)             //rows[0] is the first row 
    expect(firstRoxText).toContain(rows[0].name)
    expect(firstRoxText).toContain(rows[0].lastname)

});

Then('verify {string} {string} is seen as page title', async ({ page }, name, lastname) => {

    const isVisible_el = page.getByRole('heading', { name: `${name} ${lastname}` }).isVisible()
    expect(isVisible_el).toBeTruthy()

});

When('verify Lines per page select button is functional and visible', async ({ page }) => {
    await employeeAttendance.lines_per_page.waitFor(); // is a Playwright function that waits for the element to appear in the DOM before interacting with it
    await expect(employeeAttendance.lines_per_page).toBeVisible();
    await expect(employeeAttendance.lines_per_page).toBeEnabled();
});

Then('If click {string} in Lines Per Page', async ({ page }, number_chosen) => {
    employeeAttendance = new EmployeeAttendancePage(page)

    await page.getByLabel('50').click({ timeout: 1000 }); //first this appears always
    await page.waitForTimeout(1000)
    let rows = await employeeAttendance.page_rows

    if (parseInt(number_chosen) === 10) {
        await page.getByRole('option', { name: '10' }).click();
        await page.waitForTimeout(4000)
        console.log(number_chosen + " is the number chosen and the number of appeared row is " + await rows.count())

    } else if (parseInt(number_chosen) === 25) {
        await page.getByRole('option', { name: '25' }).click();
        await page.waitForTimeout(4000)
        console.log(number_chosen + " is the number chosen and the number of appeared row is " + await rows.count())


    } else if (parseInt(number_chosen) === 50) {
        await page.getByRole('option', { name: '50' }).click();
        await page.waitForTimeout(4000)
        console.log(number_chosen + " is the number chosen and the number of appeared row is " + await rows.count())


    }
});

Then('I see the number of rows in employee table is not more than the {string}', async ({ page }, number_chosen) => {
    const rowCount = await employeeAttendance.page_rows.count();
    expect(rowCount).toBeLessThanOrEqual(parseInt(number_chosen));
});

Then('verify next_page button is visible and clickable', async ({ page }) => {
    await employeeAttendance.nextpage_arrow.waitFor();  // Wait for the next page button to appear
    await expect(employeeAttendance.nextpage_arrow).toBeVisible();  // Ensure the button is visible
    await expect(employeeAttendance.nextpage_arrow).toBeEnabled({ timeout: 10000 });  // default 5000 second bekler

});

Then('I click employee_attendance next page button under rows , and verify number of rows are not more than {string}', async ({ page }, number_chosen) => {
    // Click the next page button
    await employeeAttendance.nextpage_arrow.click();

    // Wait for the table to load the next page (you can wait for a specific element change)
    await employeeAttendance.page_rows.waitFor();

    // Get the row count in the employee table
    const rowCount = await employeeAttendance.page_rows.count();

    // Verify the row count is not more than the chosen number
    expect(rowCount).toBeLessThanOrEqual(parseInt(number_chosen));
});

Then('verify_previous page button is visible and clickable', async ({ page }) => {
    // Wait for the previous page button to appear
    await employeeAttendance.previous_page_arrow.waitFor();

    // Ensure the previous page button is visible
    await expect(employeeAttendance.previous_page_arrow).toBeVisible();

    // Ensure the button is clickable (enabled)
    await expect(employeeAttendance.previous_page_arrow).toBeEnabled();
});


Then('I click employee_attendance previous page button , and verify number of rows are not more than {string}', async ({ page }, number_chosen) => {
    // Click the previous page button
    await employeeAttendance.previous_page_arrow.click();

    // Wait for the table to load the previous page
    await employeeAttendance.page_rows.waitFor();

    // Get the row count in the employee table
    const rowCount = await employeeAttendance.page_rows.count();

    // Verify the row count is not more than the chosen number
    expect(rowCount).toBeLessThanOrEqual(parseInt(number_chosen));
});

Then('verify if day is holiday ,{string} is not clickable and not functional', async ({ page }, dayNumberInMonth) => {
    const attendance_box = page.locator(`//tbody/tr[1]/td[1]/div[${dayNumberInMonth}]/div[1]/div[1]`)
    await expect(attendance_box).toBeVisible()
    await expect(attendance_box).not.toBeEnabled({ timeout: 5000 })
    console.log(`Day number ${dayNumberInMonth} is verified as a holiday and not functional.`);


});

Then('I verify warning {string}', async ({ page }, warning) => {

    const text = await page.getByRole('heading', { name: 'The employee is not actively' }).textContent()
    console.log("warning message text is:", text)
    await expect(text).toBe(warning)
});

Then('verify if,{string} is clickable', async ({ page }, dayNumberInMonth) => {
    const attendance_box = page.locator(`//tbody/tr[1]/td[1]/div[${dayNumberInMonth}]/div[1]/div[1]`)  //status box in day 
    await expect(attendance_box).toBeVisible()
    await expect(attendance_box).toBeEnabled({ timeout: 5000 })
    console.log(`Day number ${dayNumberInMonth} is verified as functional.`);
});

Then('click {string}', async ({ page }, dayNumberInMonth) => {
    const attendance_box = await page.locator(`//tbody/tr[1]/td[1]/div[${dayNumberInMonth}]/div[1]/div[1]`)  //status box in day 
    await attendance_box.click()
    await page.waitForTimeout(1000)

});

Then('verify sick leave day is seen {string} before any edit in attendance in month', async ({ page }, number_in_text) => {
    const sick_leave_number_text = await page.locator("//span[normalize-space()='Sick leave']/../p").textContent()
    await expect(sick_leave_number_text).toBe(number_in_text)
});

Then('choose letter {string} means sick leave and click and save changes', async ({ page }, letter ) => {
    employeeAttendance=new EmployeeAttendancePage(page)
    
    await employeeAttendance.selectLetter_and_click_and_save(letter)
});



Then('choose letter {string} means sick_leave and click and save changes to take back change in test', async ({page}, letter) => {
    employeeAttendance=new EmployeeAttendancePage(page)
    
    await employeeAttendance.selectLetter_and_click_and_save(letter)
    await page.waitForTimeout(2000)
  });

Then('verify sick_leave_day is seen {string}', async ({ page }, number_in_text) => {
    await page.waitForSelector("//span[normalize-space()='Sick leave']/../p")
    const sick_leave_number_text = await page.locator("//span[normalize-space()='Sick leave']/../p").textContent()
    expect(sick_leave_number_text).toBe(number_in_text)
});