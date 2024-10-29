import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { config } from 'dotenv';
config();

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { BasePage } from './BasePage';
import { EmployeeMasterDataPage } from './EmployeeMasterDataPage';
import { error } from 'console';

export class VehiclesPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;

        this.All_Vehicles_page_header = this.page.getByRole('heading', { name: 'All Vehicles' })
        this.Vehicle_List_header = this.page.getByRole('heading', { name: 'Vehicle List' })

        // Locators
        this.Vehicles_module_btn = this.page.locator("//div[.='Vehicles']");
        this.vehicles_add_btn = this.page.locator("//span[@class='MuiFab-label']");
        this.upload_btn = this.page.locator('label').getByRole('button')

        //filters
        this.filter_plate = this.page.getByRole('columnheader', { name: 'Plate' }).getByPlaceholder('Filter')
        this.filter_Brand = this.page.getByRole('columnheader', { name: 'Brand' }).getByPlaceholder('Filter')
        this.filter_Model = this.page.getByRole('columnheader', { name: 'Model' }).getByPlaceholder('Filter')
        this.filter_Type = this.page.getByRole('columnheader', { name: 'Type' }).getByPlaceholder('Filter')

        //elements
        this.headers_all = this.page.locator("(//strong)")  //Plate , Brand , Model , Type , Driver, Status
        //this.first_row_in_Vehicles_list_page = this.page.locator("//tbody//tr[1]")

        //first row 
        // after clicking add button  --- Form fields for adding a vehicle 
        this.plate_inputbox = this.page.locator("input[name='plate']");
        this.brand_inputbox = this.page.locator("input[name='brand']");
        this.model_inputbox = this.page.locator("input[name='model']");
        this.type_select_btn = this.page.locator("#mui-component-select-type");


        this.lkw = this.page.getByRole('option', { name: 'LKW' })
        this.sattle = this.page.getByRole('option', { name: 'Sattle' })
        this.sprinter = this.page.getByRole('option', { name: 'Sprinter' })

        this.yearOfConstruction_inputbox = this.page.locator("input[name='year_production']");
        this.yearOfPurchase_inputbox = this.page.locator("input[name='year_buy']");
        this.currentKm_inputbox = this.page.locator("input[name='currentKm']");
        this.purchasePrice_inputbox = this.page.locator("input[name='purchasePrice']");
        this.saveChanges_btn_in_edit_page = this.page.locator("button[type='submit']");

        // click detail and see this elements
        this.detail_btn_in_first_row = this.page.locator("//tbody//tr[1]//td[9]") //or   this.page.getByRole('button', { name: 'Detail' })
        // Define locators dynamically based on the plate number
        this.detail_btn_In_any_row_with_plate = this.page.locator(`//tbody/tr/td[contains(.,'TE ST 3000')]/following-sibling::td[8]`);
        this.repair_btn_VehicleListPage = this.page.locator(`//tbody/tr/td[contains(.,'TE ST 3000')]/following-sibling::td[7]`);
        this.usage_btn_vehicleListPage = this.page.locator(`//tbody/tr/td[contains(.,'TE ST 3000')]/following-sibling::td[6]`);

        //after click usage button
        this.delete_usage_vehicle_btn = this.page.locator("//span[contains(text(),'Delete')]")
        this.edit_usage_vehicle_btn = this.page.locator("//span[contains(text(),'Edit')]")
        //-------------------------------------------------------------------------------------------------
        this.edit_btn_vehicle_details_page = this.page.locator("//span[normalize-space()='Edit']");
        this.saveChanges_btn_vehicle_details = this.page.getByRole('button', { name: 'Save Changes' })

        this.back_btn_vehicle_details_page = this.page.getByRole('button', { name: 'Back' })
        this.delete_btn_vehicle_details_page = this.page.getByRole('button', { name: 'Delete' })
        this.Yes_btn_AlertToConfirmDeleteAuto = this.page.locator("//span[.='yes']/..");
        this.No_btn_AlertToConfirmDeleteAuto = this.page.getByRole('button', { name: 'No' })

        this.vehicle_Details_header = this.page.getByRole('heading', { name: 'Vehicle Details' })
        this.vehicle_Details_column_header = this.page.getByRole('columnheader', { name: 'Vehicle Details' })
        this.rows_all_vehicle_details = this.page.locator("//tbody//tr")
        this.row1_in_vehicle_details = this.page.locator("//tbody//tr[1]")
        this.repair_history_btn = this.page.getByRole('row', { name: 'Repair history expand row' }).getByLabel('expand row')
        this.usage_history_btn = this.page.getByRole('row', { name: 'Usage History expand row' }).getByLabel('expand row')

        //alert text locaters
        this.existiert_bereits_alert = this.page.getByText('Existiert Bereits')
        this.deleted_alert = this.page.getByText('Vehicle was deleted successfully')
        this.vehicle_added_alert = this.page.getByText('Vehicle was added successfully')
        this.vehicle_updated_alert = this.page.getByText('Vehicle was updated successfully')

        //use this to learn number of rows with count() method
        this.all_rows_seen = this.page.locator("//tbody//tr")
        this.headers_all_after_clicking_usage_btn = this.page.locator("(//table//thead//tr)[2]/th")    //

        //after click usage btn
        this.add_btn_after_click_usage = this.page.getByRole('button', { name: 'add' })

        this.driver1_input_box = this.page.getByRole('textbox', { name: 'Driver', exact: true })
        this.driver1_select_open_svg_btn = this.page.locator('div').filter({ hasText: /^Driver$/ }).getByLabel('Open')
        this.driver1_select_close_svg_btn = this.page.getByLabel('Close')

        this.driver2_input_box = this.page.getByRole('textbox', { name: 'Driver-' })
        this.driver2_select_open_svg_btn = this.page.locator('div').filter({ hasText: /^Driver-2$/ }).getByLabel('Open')
        this.driver2_select_close_svg_btn = this.page.getByLabel('Close')

        this.save_btn_in_usage = this.page.getByRole('button', { name: 'Save' })
        this.cancel_btn_in_usage = this.page.getByRole('button', { name: 'Cancel' })

        //how to choose one driver and how to add start date
        //await page.getByRole('option', { name: 'Robert Samuel' }).click();
        //await page.locator('input[name="deliveryDate"]').fill('2024-02-12');
        this.start_km_input_box = this.page.getByRole('spinbutton')

    }

    async chooseType_Of_Vehicle_and_click(type) {
        if (type === "LKW") {
            await this.type_select_btn.click()
            await this.lkw.click()
        } else if (type === "Sattle") {
            await this.type_select_btn.click()
            await this.sattle.click()

        } else if (type === "Sprinter") {
            await this.type_select_btn.click()
            await this.sprinter.click()


        } else {
            console.log("Vehicle type is not visible , solve this problem with locater exchange")
        }

    }


    /**Method to add a new vehicle
       after clicking vehicle add button , it can be used*/
    async addVehicle_Input_Boxes(plate, brand, model, type, yearOfConstruction, yearOfPurchase, currentKm, purchasePrice) {
        //await this.vehicles_add_btn.click();
        await this.page.waitForURL("https://qugem-staging.netlify.app/auto/upload")

        await this.plate_inputbox.fill(plate);
        await this.brand_inputbox.fill(brand);
        await this.model_inputbox.fill(model);
        await this.chooseType_Of_Vehicle_and_click(type)
        await this.yearOfConstruction_inputbox.fill(yearOfConstruction);
        await this.yearOfPurchase_inputbox.fill(yearOfPurchase);
        await this.currentKm_inputbox.fill(currentKm);
        await this.purchasePrice_inputbox.fill(purchasePrice);

    }

    // Method to delete a vehicle by plate
    async deleteVehicleByPlate(plate) {
        const targetUrl = "https://qugem-staging.netlify.app/auto";

        // Ensure we are on the correct URL
        if (await this.page.url() !== targetUrl) {
            await this.page.goto(targetUrl);
        }


        // Clear the plate filter and enter the plate to search
        await this.filter_plate.fill("");  // Clear the previous filter
        await this.filter_plate.fill(plate);  // Set the new plate filter
        await this.page.waitForTimeout(1500) //dont remove this from here
        const rows = this.page.locator("//tbody//tr");
        let rowCount = 0;

        // Wait for the rows to load after filtering, handle if rows don't appear
        try {
            // Wait dynamically for the rows to become visible
            await rows.waitFor({ state: 'visible', timeout: 2000 });
            rowCount = await rows.count();
        } catch (error) {
            console.log(`No rows appeared for plate: ${plate}`);
            rowCount = 0;  // Set rowCount to 0 if no rows appeared
            return;  // Exit the function if no rows are found

        }

        if (rowCount === 1) {
            try {
                const firstRowStatusLocator = this.page.locator('//tbody/tr[1]/td[6]');
                await firstRowStatusLocator.waitFor({ state: 'attached', timeout: 2000 }); // dont wait more than 2 second
                const firstRowStatus = await firstRowStatusLocator.textContent();
                console.log("first row status is:", firstRowStatus);

                if (firstRowStatus === 'In use') {
                    await this.usage_btn_vehicleListPage.click();
                    await this.page.waitForTimeout(1000);
                    await this.delete_usage_vehicle_btn.click();
                } else {
                    console.log('Vehicle Usage status is : Idle');
                }

            } catch (error) {
                console.error('An error occurred during vehicle usage deletion:', error);
            }

            // If exactly one row is found, continue with deletion
            const detailButton = this.page.locator(`//tbody//tr//td[contains(text(),'${plate}')]/following-sibling::td//button[normalize-space()='Detail']`);

            // Wait for the button to be visible and double-click it
            await detailButton.waitFor({ state: 'visible', timeout: 2000 });
            await detailButton.click();
            await this.page.waitForTimeout(1000);

            await this.page.mouse.wheel(0, 500);  // Simulate mouse wheel

            // Perform the deletion action
            await this.delete_btn_vehicle_details_page.click({ force: true });
            await this.page.waitForTimeout(1000);

            await this.Yes_btn_AlertToConfirmDeleteAuto.click();
            await this.page.waitForTimeout(1000);

            // Wait for the alert to confirm deletion and check for success
            const alertText = await this.deleted_alert.textContent();
            await expect(alertText).toBe("Vehicle was deleted successfully.");

            await this.page.goto("https://qugem-staging.netlify.app/auto")
            console.log(`Vehicle with plate ${plate} was deleted successfully.`);

        } else if (rowCount === 0) {
            // If no vehicles are found, log the situation and proceed without failure
            console.log(`Vehicle with plate ${plate} not found. Proceeding without deletion.`);
        } else {
            // If multiple vehicles are found, log the situation and proceed without failure
            console.log(`Multiple vehicles with plate ${plate} found. Please verify.`);
        }
    }

    /**Method to add driver1 driver2, start date and km for vehicle usage 
     * Date should be in this format "2024-02-12"
    */
    async addDriversWith_start_dateAndKm(driver1_withFullName, driver2_withFullName, start_date, start_km) {

        await this.add_btn_after_click_usage.click({ force: true })
        await this.page.waitForTimeout(1000)

        await this.page.locator('input[name="deliveryDate"]').fill(start_date)
        await this.start_km_input_box.fill(start_km)

        await this.driver1_input_box.fill(driver1_withFullName)
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter')
        await this.page.waitForTimeout(500)

        await this.driver2_input_box.fill(driver2_withFullName)
        await this.page.keyboard.press('ArrowDown')
        await this.page.keyboard.press('Enter')
        await this.page.waitForTimeout(500)

        await this.page.getByRole('button', { name: 'Save' }).click({ force: true });
        await this.page.waitForTimeout(1500)

        try {
            if (await this.page.getByText('Please select a driver').isVisible()) {
                throw new Error()
            }

        } catch (error) {
            console.warn('Warning: the full name is correct, but in selections can\'t be found');
            console.error('the Name is correct in emloyee data but it doesnt appear in select options if you fill the input box with full name, the alert warns:Please select a driver', error); // Logs the error
            throw error; // Rethrows the error so it appears in reports
        }


    }













}
