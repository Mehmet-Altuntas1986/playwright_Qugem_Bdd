


const dotenv = require('../../node_modules/dotenv');
dotenv.config();

const { LoginPage } = require('./LoginPage');
const { BasePage } = require('./BasePage');



exports.DasboardPage = class DasboardPage extends BasePage {

  constructor(page) {
    super(page);               //this key represents class

    this.max_musterman = "//span[normalize-space()='Max Mustermann']"
    this.sign_out = "//li[normalize-space()='Sign out']"
    this.languages_btn = "//img[@alt='Flag']"
    this.german = "//li[normalize-space()='Deutsch']"
    this.türkish = "//li[normalize-space()='Türkçe']"
    this.english = "//li[normalize-space()='English']"
    //modules
    this.dashboard_btn=this.page.getByRole('button', { name: 'Dashboard' }) //element
    this.helloToHomePageText="//h5[contains(text(),'Hello, welcome to the QUGEM homepage.')]"  //here is locater
    this.employee_master_data_btn=this.page.getByRole('button', { name: 'Employee Master data' }); //here is element , not locater
    this.employee_attendance_btn=this.page.getByRole('button', { name: 'Employee Attendance' })
    this.payroll_btn=this.page.getByRole('button', { name: 'Payroll' })
    this.vehicles_btn=this.page.getByRole('button', { name: 'Vehicles' })
    this.admin_btn=this.page.getByRole('button', { name: 'Admin' })
    this.admin_users_btn=this.page.getByRole('button', { name: 'Users' })
    this.admin_options_btn=this.page.getByRole('button', { name: 'Options' })
    this.admin_holidays_btn=this.page.getByRole('button', { name: 'Holidays' })
    this.admin_payamount_btn=this.page.getByRole('button', { name: 'Payout amounts' })
    
    this.quickly_gmbh=this.page.getByRole('link', { name: 'Quickly GmbH' })
    this.kinesis_gps=this.page.getByRole('link', { name: 'Kinesis GPS' })
    this.company_gesampt_firmen=this.page.getByLabel('Select Company')
    this.client=this.page.getByLabel('Select Client')


  }

  //to call this method , use english translation of the languages as STRING parameter
  async languageToChooseInDashboard(languageName) {
    await this.page.locator(this.languages_btn).click();
    await this.page.waitForTimeout(1000)

    if (languageName === 'german') {
      await this.page.locator(this.german).click();

    } else if (languageName === 'english') {
      await this.page.locator(this.english).click();

    } else {
      await this.page.locator(this.türkish).click();
    }

  }

 








}

//module.exports = LoginPage;