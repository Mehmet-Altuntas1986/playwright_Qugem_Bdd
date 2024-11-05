import { BasePage } from '../pages/BasePage';

const dotenv = require('../../node_modules/dotenv');
dotenv.config();

export class LoginPage extends BasePage {

  constructor(page) {
   super(page) // BasePage'in constructor'ını çağır
   //this.page = page;   //not necessary , the same is in the super class constructor

    this.emailBox = "//input[@name='email']"
    this.password = "input[name='password']"
    this.loginBtn = "button[type='submit'] span[class='MuiButton-label']"
    this.max_musterman = "//span[normalize-space()='Max Mustermann']"
    this.sign_out = "//li[normalize-space()='Sign out']"
    this.languages_btn = "//img[@alt='Flag']"
    this.german = "//li[normalize-space()='Deutsch']"
    this.türkish = "//li[normalize-space()='Türkçe']"
    this.english = "//li[normalize-space()='English']"
    this.turkish_lng_popup_in_wrong_login = "//div[contains(text(),'Şifre veya e-posta hatalı')]"
    this.german_lng_popup_in_wrong_login = "//div[contains(text(),'Bitte geben Sie eine korrekte E-Mail-Adresse ein.')]"
    this.english_lng_popup_in_wrong_login = "//div[contains(text(),'Bitte geben Sie eine korrekte E-Mail-Adresse ein.')]"
    this.alertShortPasword_english = "//p[@class='MuiFormHelperText-root Mui-error MuiFormHelperText-filled']"
    this.alertShortPasword_türkish = "//p[@class='MuiFormHelperText-root Mui-error MuiFormHelperText-filled']"
    this.alertShortPasword_german = "//p[@class='MuiFormHelperText-root Mui-error MuiFormHelperText-filled']"
    this.alertShortPasswordCommonForAllLanguages = "//p[@class='MuiFormHelperText-root Mui-error MuiFormHelperText-filled']"
  }

  
  //to call this method , use english translation of the languages as STRING parameter.  (turkish. english or german)
  async languageToChoose(languageName) {

    await this.page.locator(this.languages_btn).waitFor({ state: 'visible' });

    await this.page.locator(this.languages_btn).click();
    await this.page.waitForTimeout(1000)

    if (languageName === 'german') {
      await this.page.locator(this.german).click();

    } else if (languageName === 'english') {
      await this.page.locator(this.english).click();

    } else {
      await this.page.locator(this.türkish).click();
    }

//this. keyword ile basepage i can reach and use its methods and if methods have same name , in this case use super.methodnameInBasePage


  }

//use türkish , english or german as parameter to use this method
async clickLoginButton_withLanguage(choosenLanguage) {
  await this.languageToChoose(choosenLanguage);

  switch (choosenLanguage) {
    case 'german':
      await this.page.getByRole('button', { name: 'Einloggen' }).click();
      await this.page.waitForTimeout(2000)
      break;
    case 'english':
      await this.page.getByRole('button', { name: 'Login' }).click();
      await this.page.waitForTimeout(3000)
      break;
    case 'türkish':
      await this.page.getByRole('button', { name: 'Giriş Yapın' }).click();
      await this.page.waitForTimeout(2000)
      break;
  }
}




  async clickLoginButton_WithPress() {
    await page.keyboard.press('Enter');
  }

  async gotoLoginPage() {
    await this.page.goto(process.env.url)
  }

  //for pozitif and and negatif test scnerio , it can be used
  async navigateToDashboard(email, password) {

    await page.locator(this.emailBox).fill(email)
    await page.locator(this.password).fill(password).press('enter');
    await page.waitForURL("https://qugem-staging.netlify.app/")
  }

  async navigateToDashboardWithChoosenLanguage(language) {
    await this.languageToChoose(language)
    await page.locator(this.emailBox).fill(process.env.email)
    await page.locator(this.password).fill(process.env.password).press('enter');
    await page.waitForURL("https://qugem-staging.netlify.app/")
  }
}

//module.exports = LoginPage;