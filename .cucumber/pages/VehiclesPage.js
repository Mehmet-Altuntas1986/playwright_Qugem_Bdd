import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { config } from 'dotenv';
config();

import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { BasePage } from './BasePage';
import { EmployeeMasterDataPage } from './EmployeeMasterDataPage';

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
        this.detail_btn_In_any_row_with_plate = this.page.locator("//tbody/tr/td[contains(.,'KO PJ 3396')]/following-sibling::td[8]");

        this.edit_btn_vehicle_details_page = this.page.locator("//span[normalize-space()='Edit']");
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
        // Ensure we are on the correct URL
        if (await this.page.url() !== "https://qugem-staging.netlify.app/auto") {
            await this.page.goto("https://qugem-staging.netlify.app/auto");
        }

        // Fill the plate filter
        await this.filter_plate.fill(plate);
        await this.page.waitForTimeout(2000); // Optional wait (can be replaced with proper waitForSelector)

        const row = this.page.locator("//tbody//tr[1]");

        // Check if the first row is visible
        const isVisible = await row.isVisible();

        if (isVisible) {
            // Ensure the 'Detail' button is located correctly
            const detailButton = this.page.locator(`//tbody//tr//td[contains(text(),'${plate}')]/following-sibling::td//button[normalize-space()='Detail']`);

            // Wait for the detail button to be clickable, then click it
            await detailButton.waitFor({ state: 'visible', timeout: 5000 });
            await detailButton.click({ force: true }); // Force click in case there are overlapping elements
            await this.page.waitForTimeout(2000)

            await this.delete_btn_vehicle_details_page.scrollIntoViewIfNeeded()
            await this.delete_btn_vehicle_details_page.click()

            await this.Yes_btn_AlertToConfirmDeleteAuto.waitFor({ state: 'visible', timeout: 5000 });
            await this.Yes_btn_AlertToConfirmDeleteAuto.click();
            await this.page.waitForTimeout(2000)
            expect(await this.deleted_alert.textContent()).toBe("Vehicle was deleted successfully.")
            await console.log("Vehicle with ${plate} was deleted successfully")
            // Wait for the page to load after deletion
            await this.page.waitForLoadState('load');
        } else {
            console.log(`Vehicle with plate ${plate} not found.`);
        }
    }










}
