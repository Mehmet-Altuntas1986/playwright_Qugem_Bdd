//BasePage.js
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';


const dotenv = require('dotenv');
dotenv.config();


export class BasePage {
  constructor(page) {
    this.page = page;

    //list of elements --this locater represents more than one element

    this.companyDropdownElements_lc = "//li[.='GESAMT FIRMEN']/../li";
    this.clientFirmaDropdownElements_lc = "//li[.='All']/../li"; //   /..   first ansector tag a goturur
    //firmen select on top of page
    this.company_firmen_select_btn = this.page.getByLabel('Select Company')
    this.client_firmen_select_btn = this.page.getByLabel('Select Client')
    //company and client svg dropdown arrow buttons
    this.company_svg_btn_lc = "div[aria-label='Select Company'] svg"
    this.client_svg_btn_lc = "div[aria-label='Select Client'] svg"

  }



  /**use parameter as english,german or turkish */
  async navigateToDashboard(language) {
    try {
      const loginPage = new LoginPage(this.page); 
      await this.page.goto(process.env.url);
      await this.page.waitForLoadState('load')
      await this.page.locator(loginPage.emailBox).fill(process.env.email);
      await this.page.locator(loginPage.password).fill(process.env.password);
      await loginPage.clickLoginButton_withLanguage(language);
      await this.page.waitForTimeout(1000);
      await this.page.waitForURL("https://qugem-staging.netlify.app/");
    } catch (error) {
      console.error("Error navigating to the dashboard:", error);
    }
  }
  

  //common methods can be used in all page step definition files

  /**Method to click and wait for a new tab to open
   * in step definition usage example , const newPage = await basePage.clickAndWaitForNewTab(element)
   * */
  async clickAndWaitForNewTab(element) {
    // Wait for the new page to open and capture it
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'), // Waiting for the new tab to open
      element.click() // Click on the element
    ]);
    await newPage.waitForLoadState('load'); // Wait for the new page to load
    return newPage; // Return the new page object
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector); // Wait for the specified element to appear
  }

  async clickAndWaitForNavigation(element) {
    // Click on the element and wait for the new page to load
    await Promise.all([
      this.page.waitForNavigation(), // Wait for the new page to load
      element.click() // Click on the element
    ]);
  }

  async waitForSomeTime(milliseconds) {
    await this.page.waitForTimeout(milliseconds); // Wait for a specified amount of time
  }

  async getTextContent(selector) {
    const element = await this.page.$(selector); // Get the element using the selector
    return await element.textContent(); // Return the text content of the element
  }

  async fillInput(element, value) {
    if (typeof element === 'string') {
      await this.page.fill(element, value);
    } else {
      await element.fill(value);
    }
  }
  

  async fillInputToInputBox(element, value) {
    // Find the element and write the value into it
    await element.fill(value);
  }

  /** use this method to check visibiliy and clickabilty of the company or client dropdown elements
   * companyTypes: first is main compann select button , other is client company select button
  */
  async clickAllElementsAndCheckVisibilityAndClickability(elements, companyType) {
    const count = await elements.count(); // Get the number of matching elements
    console.log(`There are ${count} elements.`);

    for (let i = 0; i < count; i++) {
        const element = elements.nth(i); // Select the ith element

        // Check if the element is visible and clickable
        const isVisible = await element.isVisible();
        const isEnabled = await element.isEnabled();

        if (isVisible && isEnabled) {
            // Get the text content of the element
            const textContent = await element.textContent();
            console.log(`Element ${i + 1} with text "${textContent}" is ${isVisible ? 'visible' : 'not visible'} and ${isEnabled ? 'clickable' : 'not clickable'}.`);
        } else {
            // Throw an error if the element is not visible or clickable
            throw new Error(`Element ${i + 1} is not visible or clickable.`);
        }
    }
    

}


/**usage
 * const formattedDate = getCurrentDateFormatted();
 *  Output example: "27-09-2024"
 */
  async  getCurrentDateFormatted() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');  // Get day and pad with '0' if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Get month (0-11) and pad with '0'
    const year = currentDate.getFullYear();  // Get year

    return `${day}-${month}-${year}`;  // Return formatted date
}





  


}

