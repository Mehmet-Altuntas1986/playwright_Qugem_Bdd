https://vitalets.github.io/playwright-bdd/#/getting-started/index

Install playwright-bdd from npm:
   npm init playwright@latest    //ile normal olan playwright kurulumu yapilir

bdd ile olanida kullanabilmek icin bu adimlari terminalde yazmalisin
1. npm i -D playwright-bdd      //if there is an issue in terminal , run these 3 steps again 

Copy to clipboardErrorCopied
This package uses @playwright/test and @cucumber/cucumber as a peer dependencies. For brand new projects they will be installed automatically with playwright-bdd. For existing projects you may need to update them to the latest versions:

2.  npm i -D @playwright/test@latest @cucumber/cucumber@latest


Copy to clipboardErrorCopied
After installing/updating major Playwright version you may need to install browsers:

3.  npx playwright install


Proje Dizini Oluşturma: İlk adım olarak, test projesi için bir dizin oluşturun.
package.json Oluşturma: Terminalde 

npm init -y         komutunu çalıştırarak bir package.json dosyası oluşturun.

-------------------------------------------------------------------------------------------------------

# tagslar icin --grep '@smoke'     --grep '@regression'

# .vscode/settings.json  file ina asagidakileri  ekledik, boylece indirdigimiz plugin  (cucumber full support isimli plugin) ile step definitionlar otomatik algilanir ve olusturulabilir
  given,when,then e tiklayinca stepdefinitions lara ulasabiliriz

{
    "cucumberautocomplete.steps": [
        ".cucumber/stepDefinitions/*.js",
        
    ],
    "cucumberautocomplete.strictGherkinCompletion": true
}

---------------------------------------------------------------------------------------------------------


require(../bir ust dizin)   
require(../../iki ust dizin) 
require(./bir alt dizin) 
require(././iki alt dizin) 
require(/tamdizin yolu/alt  / alt /istenilen file) 

dikkat et , bulundugun file in icindeki duruma gore require in icinde yazdigin path degisiyor, bazen ust ve alt dizinlere gecmen lazim

----------------------------------------------------------------------------------------------------------
dropdown testlerinde select tagi varsa , 
const elementList=page.locater('put here locater takes all list values')

elementList.selectOption({value:'optionvalue'})
elementList.selectOption({index:'optionIndex'})
elementList.selectOption({label:'optionLabel'})

verify 
expect(elementList).toHaveValue('value')

//Cucumber'da Scenario Outline yapısında, Examples tablosu her zaman en sonda yer almalıdır.
examples kisminda enaz iki row olustur , yoksa scnerio outline da @only tag calismaz ve step definition icin gerekli method olusturulamaz

# bir input kutusundan tarihi almak için Playwright'te .inputValue() yöntemi kullanılır. Ancak bu, input kutusundaki metin (string) değerini alır

#str.padStart(targetLength, padString);
targetLength: Hedef uzunluk. String'in ulaşması gereken uzunluk.
padString: String'in başına eklenecek olan karakter (veya karakterler). Bu değer belirtilmezse varsayılan olarak boşluk kullanılır.

# elementin functional olup olmadigini kontrol icin
  await expect(employeeMasterData.calculate_salary_btn).toBeEnabled()
 // toBeDisabled() toBeEnabled()   isEnabled( ) toBeDisabled() 

 # elementin text ini almak icin 
 inputValue(); 
 innerText();
 textContent() ile Elementin Metnini Almak
# locater almadigin bir alert ciktiysa
dialog olayını tiklamadan önce dinlemek gerekiyor çünkü Playwright’te alert veya dialog pencereleri açıldığında test hemen durur ve kullanıcı etkileşimi bekler.
T
Then('I click save changes and handle alert', async ({ page }) => {
  // Alert'i yakalamak için 'dialog' eventini dinleyelim
  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);  // Alert içeriğini yazdır
    await dialog.accept();  // Alert'i kabul et (OK butonuna basar)
    // Eğer alert üzerinde 'cancel' butonuna basmak isterseniz: await dialog.dismiss();
  });

  // Save Changes butonuna tıklıyoruz
  await page.getByRole('button', { name: 'Save Changes' }).nth(1).click();
  
  // Sayfanın tamamen yüklenmesini bekleyelim
  await page.waitForLoadState('networkidle');
});

page.once('dialog', async dialog => { ... }): Playwright, sayfa üzerinde bir dialog açıldığında bu eventi tetikler. Bu sayede alert, confirm veya prompt pencerelerini yakalayabilirsiniz.
dialog.accept(): Açılan  alert veya confirm  kutusunu kabul eder (OK butonuna basar).
dialog.dismiss(): Eğer confirm veya prompt dialog'u iptal etmek (Cancel butonuna basmak) istiyorsanız bu metodu kullanabilirsiniz.
dialog.message(): Alert veya confirm kutusundaki mesajı alır.

# npm run debug ile actigin zaman locater alma islemi islemi icin kullanabilirsin
npm run debug -record a tikla ve belirli asamada ortaya cikan alertlerin locaterini almada kullanmak icin mukemmel , ozellikle bir buttona tiklamadan once page.pause() ile sayfa o asamada durur ve sonrasinin elmentleri bulmak kolaylasir

# page.pause()    istediginiz yerde kodu durdurur ve otomatik debugger i actirir

# input box in icerigini sil 
fill('')      elemente dbclick() sonra   await page.keyboard.press('Delete');

# Alert de dikkat et ,alert penceresini kapatmak zorundasin is bittikten sonra , employee save button inindan sonra kullandim
  // Dialog (alert) olayını dinleyin
  page.on('dialog', async dialog => {
    const alertText = dialog.message();  // Alert mesajını alır
    console.log('Alert Text:', alertText);
    
    // Beklenen alert mesajı ile karşılaştırın
    await expect(alertText).toContain(textInAlert);
    
    // Alert'i kapat
    await dialog.accept();  // Alert penceresini kapatır


# bilgi alert ile ilgili
Tek Buton (Tamam): Eğer sadece "Tamam" düğmesi olan bir alert penceresi varsa, bunu accept() ile kapatabilirsiniz. Bu, butona basmak anlamına gelir.

Tamam/İptal Seçenekleri: Eğer alert penceresinde iki seçenek varsa (Tamam/İptal), accept() onaylar, dismiss() ise iptal eder.

# Eğer bir buton gözükmüyorsa, bu sadece bir bilgilendirme alert'i olabilir, ki bunu dismiss() ile kapatmak gereksizdir. Yani sadece accept() kullanmak yeterli olur.

  });

# Bir testi Playwright'ta kasıtlı olarak fail ettirmenin birkaç yolu vardır.
1-   throw new Error('This test failed on purpose');
2-   expect(true).toBe(false);  // Bu ifade her zaman false olacağı için test fail olur
3-    const condition = true;  // Şartınızı belirleyin
      if (condition) {
                     throw new Error('Test failed because the condition was met');
                     }


# consolda tracing i acma linkinin belirmesi icin testi fail et, cunku fail olunca consolda beliriyor 
   throw new Error('traci izlemek icin basarili testi fail ettim') 

# scnerio isimleri farkli olmazsa test run olmaz

# employee delete buttonuna tikladiktan sonra cikan alert box larindaki mesaji dialog halledemedi 
normal yol ile tikla ve text icerigini al

# if else de  condition gecerli olmazsa otomatik testi fail etme  - show-trace linki belirir console da
throw new Error("fail message yaz");

# bir row un yada butun row larin degerlerini yazdirabilirsin , column larin degerlerini birbirlari ile birlestiriyor

 await page.locator("//tbody//tr[1]").textContent();
 Received string:    "892AleksandarTrisicOTLG SüdbayernQUICKLY TRANSPORTE GMBHFebruary 01, 2022LKW 
bu string ile bir 


const firstRowLocator = page.locator("//tbody//tr[1]");
  
# İlk satırın görünür olup olmadığını kontrol edin
  const isVisible = await firstRowLocator.isVisible();

  // Konsola durumu yazdır
  console.log("Is the first row visible?", isVisible);

  // Beklenen durumla karşılaştırın (görünürse true, görünmüyorsa false bekliyorsanız)
 #  await expect(isVisible).toBe(true); // veya false, görünmezse

  const visible = await page.locator("//tbody//tr[1]").textContent(); // İlk satırdaki tüm hücreleri al
  await page.waitForTimeout(2000)
  await expect(visible).toContain("None")

  
# await lere dikkat et , hatalara sebebiyet verir

#  $: Tek bir element seçer. İlk eşleşen elementi döndürür.
       await page.$('div') → İlk div elementini bulur.
#  $$: Birden fazla element seçer. Tüm eşleşen elementleri bir liste/dizi (array) olarak döndürür.
       await page.$$('div') → Sayfadaki tüm div elementlerini bulur ve bir dizi olarak döner.

# In JavaScript, to dynamically include the value of a variable in a string, you need to use template literals (backticks) instead of regular quotes. 

' ' yada " "  degil  bu ` xpath locater`

for (let i = 1; i <= (await rows.count()); i++) {
    await this.page.waitForSelector(`//tbody//tr[${i}]//td[3]`)  tr dynamik degisken yapida

}


# ilginc bir bilgi :  Eğer cellText'i doğrudan if koşuluna koyarsan, JavaScript otomatik olarak cellText'in truthy veya falsy olup olmadığını kontrol eder. Yani cellText'in değerine bakarak, eğer dolu bir string ise true olarak kabul eder, eğer null, undefined, boş string "", veya başka bir "falsy" değerse false olarak kabul eder.

const cellText = await this.page.locator(`//tbody//tr[${i}]//td[3]`).textContent();

if (cellText) {
  #  Eğer cellText tanımlıysa (null veya undefined değilse) bu blok çalışır.
  console.log("Cell text is defined:", cellText);


if (cellText && cellText.includes(filterText)){

}
Bu durumda:

cellText: İlk olarak cellText var mı, yani tanımlı mı, boş mu diye kontrol edilir.
cellText.includes(filterText): Eğer cellText varsa (yani tanımlı ve boş değilse), bu koşul kontrol edilir.

Eğer her iki koşul da doğruysa, kod içerisindeki işlemler çalışır. Eğer birinci koşul yanlışsa, JavaScript ikinci koşulu kontrol etmez ve if bloğu çalışmaz. Bu, kodun hata vermeden güvenli çalışmasını sağlar.

}

# package.json file inda 
 "playwrightBdd": {
    "importTestFrom": ".cucumber/fixtures.js"
  },

  bunun olusumunu chat gpt ye sorunca ornek veriyor

  // .cucumber/fixtures.js

import { createBdd } from 'playwright-bdd';
import { chromium } from 'playwright'; // Import the Playwright library

const { Given, When, Then } = createBdd();

// Define a global setup for your tests
let browser;
let context;
let page;

beforeAll(async () => {
  // Initialize the browser, context, and page before all tests
  browser = await chromium.launch(); // Or use chromium.launch({ headless: false }) for debugging
  context = await browser.newContext();
  page = await context.newPage();
});

// Close the browser after all tests are done
afterAll(async () => {
  await page.close();
  await context.close();
  await browser.close();
});

// Make the page available in your steps
Given('I open the application', async () => {
  await page.goto(process.env.URL); // Make sure you have the URL set in your .env file
});

// Export the Given, When, Then for usage in step definitions
export { Given, When, Then, page };

# kullanilisi

// .cucumber/stepDefinitions/steps_EmployeeMasterData.js

import { expect } from '@playwright/test';
import { Given, When, Then, page } from '../fixtures.js'; // Adjust the path as necessary
import { EmployeeMasterDataPage } from '../pages/EmployeeMasterDataPage.js';

let employeeMasterDataPage;

Given('I navigate to the Employee Master Data page', async () => {
  employeeMasterDataPage = new EmployeeMasterDataPage(page);
  await employeeMasterDataPage.goto();
});

// Continue with your step definitions...

# By implementing the fixtures.js file this way, you establish a clear and organized structure for your Playwright BDD tests. This allows for better management of resources and facilitates code reuse across different step definitions. Feel free to modify it based on your specific testing requirements! If you have any further questions or need additional examples, just let me know!


-------------

# const row1=await page.locator(//tbody//tr[1])
  expect(row1).toBeVisible({ timeout: 5000 })

or 
await page.waitForSelector("//tbody//tr[1]", { timeout: 5000 });


# locater = page.locater('selector')


# await page.waitForSelector("//button[@id='submit']", { timeout: 5000 });
await page.click("//button[@id='submit']"); etkili bekleyip tiklama

await page.click("//button[@id='submit']", {
  timeout: 5000,         // Timeout for the click action
  delay: 100,            // Delay (in milliseconds) before the click
  button: 'left',        // Which mouse button to click (left, right, or middle)
  force: true,           // Force the click even if the element is not visible
  noWaitAfter: false,    // Prevent waiting for navigations after the click
});
# ornek kullanim
await employeeMasterData.calculate_salary_btn.click({ force: true ,timeout: 5000})


 #  When('I fill in the employee details', { timeout: 60000 }, async function () { }
 

#   
   const [newPage] = await Promise.all([
    page.context().waitForEvent('page'), // 90 saniye yeni tab in açılmasını bekle
    await page.getByRole('link', { name: 'Kinesis GPS' }).click()

  ]);
  // Yeni sekmeyi yüklenene kadar bekle
  await newPage.waitForLoadState()

  console.log('Yeni Kinesis GPS sayfası yüklendi ve kullanıma hazır.');

  # bunu global yap , boylece new page i butun step definition step lerinde kullanabilirsin
  let newPage    global level de koyduk , asagida new page in onunde const koymadik

  when() {
[newPage] = await Promise.all([
    page.context().waitForEvent('page'), // 90 saniye yeni tab in açılmasını bekle
    await page.getByRole('link', { name: 'Kinesis GPS' }).click()

  ]);
  // Yeni sekmeyi yüklenene kadar bekle
  await newPage.waitForLoadState()

  console.log('Yeni Kinesis GPS sayfası yüklendi ve kullanıma hazır.');

  }

----------------

# alert 

Then I click save changes
        
Then I verify the alert says "Employee was added successfully"
# Then('I verify the alert says {string}', async ({ page }, textInAlert) => {
       # Dialog (alert) olayını dinleyin
      page.on('dialog', async dialog => {
      const alertText = dialog.message();  // Alert mesajını alır
      console.log('Alert Text:', alertText);

        // Alert'i kapat
     await dialog.accept();  // Alert penceresini 
  });

  ---------------------------

  try {
  // Code that might throw an error
} catch (error) {
  
  //   console.error('An error occurred:', error.message);

  # console.log('Current URL:', currentUrl);
  # console.warn('Warning: The test for saving changes has failed.');
  # await page.screenshot({ path: 'error_screenshot.png' });
  # return; // Prevent further execution of this test step -- burda test step den disari cikar
  # throw new Error('This test has been intentionally failed.');
     // Log the error to console
  # console.error('An error occurred:', error.message);
    // Rethrow the error to indicate failure
  # throw error; // if there is no existing error to throw, you cannot use throw error; //yeniden error atma


}


# option da sadece ay ismi ile tiklama yapabiliyorsun ama hangi ay oldugunu bilmiyorsun, nasil click edecegiz , regex. --asagidakini tek satirda yaz ve tikla
await page.getByRole('option', { name:/^(January|February|March|April|May|June|July|August|September|October|November|December)$/ }).click();
---------------
# once git add .  git commit -m "commit message"   sonra main e git checkout yap , maine checkout yapmis olman codu oraya direkt aktarmaz , sonra merge islemi yap  ex: git merge mehmet
#Değişiklikleri Kaydet (Commit Et): mehmet branşında yaptığınız değişiklikleri git add . ve git commit -m "Commit mesajı" komutlarıyla kaydetmelisiniz. Aksi takdirde, commit yapmadığınız değişiklikler git dalları arasında taşınmaz ve kaybolabilir.

# git stash
git stash apply: Değişiklikleri uygular, ancak stash'teki değişiklikler silinmez.
git stash pop: Değişiklikleri uygular ve stash'teki değişiklikleri siler.

# git stash apply:

Stash'teki değişiklikleri çalışma alanınıza uygular, ancak stash'teki değişiklikler silinmez.
Değişiklikleri uyguladıktan sonra stash'teki kayıt hala durur ve gerektiğinde tekrar kullanılabilir.
 # git stash pop:

Stash'teki değişiklikleri çalışma alanınıza uygular ve uyguladıktan sonra stash'teki kayıt silinir.
Yani, değişiklikler geri alındıktan sonra stash kaydı otomatik olarak temizlenir.

# senaryo

"mehmet"
Değişiklik Yapma: "mehmet is tester" eklediniz, dosyanızın içeriği şimdi:

"mehmet is tester"
*Değişiklikleri Stash Etme:
 git stash komutunu kullandınız. Bu, yaptığınız değişiklikleri geçici olarak saklar ve çalışma alanınızı temizler. Şu anki durum:

branch-mehmet branch'ında içerik: "mehmet"
Başka Branch'a Geçiş: git checkout branch-b komutunu kullanarak başka bir branch'a geçtiniz.

Tekrar Geri Dönme: git checkout branch-mehmet komutuyla geri döndünüz. Şu an yine branch-mehmet branch'ındasınız ve dosyanızda içerik:

"mehmet"
Commit Yapma: git commit -m "Some changes" komutunu çalıştırdınız. Bu işlem, o anki çalışma alanınızdaki değişiklikleri kaydetti.

Değişiklikleri Geri Alma:

Eğer git stash apply veya git stash pop komutlarını kullanmazsanız, stash'te sakladığınız "mehmet is tester" değişikliğini geri alamazsınız.
Sonuç: Değişiklikleri geri almak için stash komutlarını kullanmanız gerekecek.
Özet: git stash ile saklanan değişiklikler, başka bir branch'a geçtikten sonra ve geri döndükten sonra git commit yaptıysanız, stash'teki değişiklikleri geri alabilmeniz için git stash apply veya git stash pop komutlarını kullanmanız gerekecek. Aksi takdirde, stash'te sakladığınız değişiklikler kaybolur.
 
 --------------------------

 




