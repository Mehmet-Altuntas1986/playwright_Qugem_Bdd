//BasePage.js
import { LoginPage } from '../pages/LoginPage';


const dotenv = require('dotenv');
dotenv.config();


export class BasePage {
  constructor(page) {
    this.page = page;
    
}
  


//use parameter as english,german or turkish
  async navigateToDashboard(language){
    const loginPage = new LoginPage(this.page);  //constructor icine koyunca constructorlar birbirlerini dongusel olarak sonsuz cagirmaya basladi - Sorun

    this.page.goto(process.env.url);
    await this.page.waitForURL(process.env.url);
    await this.page.locator(loginPage.emailBox).fill(process.env.email);
    await this.page.locator(loginPage.password).fill(process.env.password);
    await loginPage.clickLoginButton_withLanguage(language)
    await this.page.waitForURL("https://qugem-staging.netlify.app/")
    await this.page.waitForLoadState('networkidle'); // Sayfanın yüklenmesini bekle

}



}

