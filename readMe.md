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

 
#  this.months_all=this.page.locator("//ul[@role='listbox']/li")   //12 elements li[1] , li[2]

 boyle sona ekleyebilirsin

// Tüm ayların metinlerini al
const months = await this.months_all.allTextContents();
console.log(months);  // ["January", "February", ..., "December"]

// İlk ayı (January) seç
await this.months_all.nth(0).click();

// Üçüncü ayı (March) seç
await this.months_all.nth(2).click();

const monthCount = await this.months_all.count();
# Tüm Öğeler Üzerinde Döngü

for (let i = 0; i < monthCount; i++) {
  const month = await this.months_all.nth(i).textContent();
  console.log(`Month ${i + 1}: ${month}`);
  // Belirli bir işlem yap
  await this.months_all.nth(i).click();  // Her ayı tıklamak gibi
}

---------------------------
// 1. Dropdown'u açmak için input kutusuna tıklayın
await this.page.click('#dropdownInput'); // Dropdown'un inputunun locator'ı

// 2. Ay seçeneğini bul ve tıkla
const monthOption = this.page.getByRole('option', { name: /^(January|February|March|April|May|June|July|August|September|October|November|December)$/ });
await monthOption.click(); // Bulunan ay seçeneğine tıklayın

// 3. Yıl seçeneğini bul ve tıkla
const yearOption = this.page.getByRole('option', { name: /^(2022|2023|2024|2025)$/ });
await yearOption.click(); // Bulunan yıl seçeneğine tıklayın


-------------

# dataTable usage 

@only
    Scenario: Verify that if an employee added in the employee master data , that data comes correctly to payroll module
  #  Then I navigate to "https://qugem-staging.netlify.app/employee"
  #  Then I add an employee with details:
    | Name  | ID Number | Company                 | Gross Salary |
    | Kenan | 124       | QUICKLY TRANSPORTE GMBH | 4.000,00     |


 # Then('I add an employee with details:', async ({ page }, dataTable) => {
  // Get all rows from the data table
  const employees = dataTable.rows(); //array of arrays

  // Log the first row's first column (Name)
  console.log(employees[0][0]); // This accesses the "Name" in the first row

  // Optional: You can loop through the rows and log each employee's details
  for (const [name, idNumber, company, grossSalary] of employees) {
    console.log(`Name: ${name}, ID Number: ${idNumber}, Company: ${company}, Gross Salary: ${grossSalary}`);
  }
});

# usages 
Then('I add an employee with details:', async ({ page }, dataTable) => {
  const employees = dataTable.rows(); // Retrieve all rows from the DataTable

  // Iterate through all employee details
  for (let i = 0; i < employees.length; i++) { //kac row var , herbirini ayir
    const employee = employees[i];
    console.log(`Adding employee: Name: ${employee.Name}, ID: ${employee['ID Number']}, Company: ${employee.Company}, Salary: ${employee['Gross Salary']}`);
    
    // Use the data in your automation logic (e.g., form filling)
    await page.fill('#employeeName', employee.Name);
    await page.fill('#employeeId', employee['ID Number']);
    await page.fill('#employeeCompany', employee.Company);
    await page.fill('#employeeSalary', employee['Gross Salary']);
    await page.click('#submitButton');
  }
});


----------------
# BasePage deki alert handle methodlarinin kullanimi

// 1. Adım: Pop-up'ı tetikleyin (örneğin, bir butona tıklayarak)
await basePage.triggerPopup('button#trigger-alert');

// 2. Adım: Pop-up'ı yakalayın ve 'accept' işlemi ile kabul edin
await basePage.handleAllPopups('accept');

// 3. Adım: Pop-up mesajını alın ve konsola yazdırın
const dialogMessage = await basePage.getDialogMessage();
console.log(`Captured pop-up message: ${dialogMessage}`);

-----------------------------------
 # bir array degerleri ile diger array degerlerini iceriyormu verification , toContain kullanamzsin

     expect(actualHeaders).toEqual(expect.arrayContaining(expectedHeaders));


 Expected Headers: [
  'Nr',
  'Driver',
  'Start Date',
  'End Date',
  'Start Kilometer',
  'End Kilometer',
  'Distance'
]
Actual Headers: [
  'Nr',
  'Driver',
  'Start Date',
  'End Date',
  'Start Kilometer',
  'End Kilometer',
  'Distance',
  '',
  ''
]

# filtre kullanimi bazen faydali olabilir
// Örnek bir dizi
const actualHeaders = ['Nr', 'Driver', 'Start Date', 'End Date', 'Start Kilometer', 'End Kilometer', 'Distance', '', ''];

// Boş string'leri filtreleme
# const filteredHeaders = actualHeaders.filter(header => header.trim() !== '');

console.log(filteredHeaders);  // ['Nr', 'Driver', 'Start Date', 'End Date', 'Start Kilometer', 'End Kilometer', 'Distance']

----------------------------------------------------------------------------
# textContent():
 Tek bir öğenin metin içeriğini string olarak döndürür.
# allTextContents()
  Birden fazla öğenin metin içeriklerini dizi (array) olarak döndürür, her öğe için ayrı bir string içerir.

  ---------------------------------------------------------------------------
# JavaScript'te ve diğer birçok programlama dilinde metot isimleri genellikle küçük harfle başlar

#dynamic locater aldiginda "selector" bunu degil      --> `selector ` bu sekilde kullan

---------------
# elementHandles()  ile herbir elementi ayristirabiliyoruz ve visibility ,text leri almada sonra kullaniyoruz

Then('verify employee information table {string} are visible', async ({ page }, headerText) => {
  const employeeMasterData = new EmployeeMasterDataPage(page);
  
  // Tablodaki başlık elemanlarını al
  const table_Headers_elements = await employeeMasterData.table_headers.elementHandles(); // Element handle'larını al
  console.log("Table headers elements count:", table_Headers_elements.length);

  // Başlık elemanlarının görünürlük kontrolü ve belirli bir başlığın varlığını kontrol et
  let headerFound = false; // Başlık bulundu mu kontrolü için

  for (const element of table_Headers_elements) {
    const headerTextContent = await element.innerText(); // Görünür metni al
    const isVisible = await element.isVisible(); // Elemanın görünür olup olmadığını kontrol et

    // Başlığın görünür olup olmadığını kontrol et
    if (isVisible) {
      console.log(`${headerTextContent}: is visible on the page.`);
      
      // Belirli bir başlık metni kontrolü
      if (headerTextContent === headerText) {
        console.log(`${headerText} is present in the header list.`);
        headerFound = true; // Başlık bulundu
      }
    } else {
      console.log(`${headerTextContent}: is not visible on the page.`);
    }
  }

  // Eğer başlık bulunamadıysa hata mesajı
  if (!headerFound) {
    console.error(`${headerText} is not found in the header list.`);
    await expect.fail(`${headerText} is not found in the header list.`);
  }
});


# allTextContent ile elementlerin  textlerini array icine atabiliyoruz ama viisbility ve inner text de ise yaramadi
  const table_Headers_elements = await employeeMasterData.table_headers.AllTextContent(); // array olustu

for (const element of table_Headers_elements) {
    const headerTextContent = await element.innerText(); //AllTextContent ile calismadi
    const isVisible = await element.isVisible();         //AllTextContent ile calismadi
}

------------------------
# Takım Çalışmasında Rebase Kullanımı İçin İdeal Zamanlar
Feature Dalını Güncel Tutmak: Kendi dalınızı, ekibin main dalında yaptığı güncellemelerle uyumlu hale getirmek için rebase kullanabilirsiniz.
Pull Request Öncesi Commit’leri Temizlemek: Çekme isteği (pull request) açmadan önce commit geçmişinizi düzenlemek ve gereksiz commit’leri birleştirmek için rebase yapabilirsiniz.
Çatışmaları Önceden Çözmek: Güncel main dalına göre rebase yaparak, dalınızı son haliyle uyumlu hale getirir ve çatışmaları önceden çözmüş olursunuz.

Senaryo: Takım Çalışmasında Rebase Kullanımı
Diyelim ki projede main dalı var ve siz de kendi özelliğiniz üzerinde çalışmak için feature-x adında bir dal açtınız. Çalışma sürecinde ekip arkadaşlarınız main dalına yeni commit'ler ekledi, ancak siz bu güncellemeleri almadan çalışmanıza devam ettiniz. İşte rebase kullanarak nasıl güncel hale gelebileceğinizi görelim.

1. Başlangıç Durumu: Main Dalından Ayrılma
Başlangıçta, main dalında birkaç commit var. main dalı C commit’ine kadar ilerlemiş durumda. Siz de bu noktada kendi dalınızı feature-x adıyla oluşturdunuz ve kendi değişikliklerinizi eklemeye başladınız.

Başlangıç Durumu:

mathematica
Copy code
main:       A---B---C
                \
feature-x:        D---E
A, B, C: Ekip arkadaşlarınızın main dalında yaptığı commit'ler.
D, E: Kendi feature-x dalınızda yaptığınız commit'ler.

2. Main Dalında Yeni Değişiklikler
Siz feature-x dalında çalışırken ekip arkadaşlarınız main dalında bazı güncellemeler yaptı ve yeni commit'ler eklendi. Şu anda main dalı F commit’ine kadar ilerlemiş durumda.

Main Dalında Yeni Commit’ler:

mathematica
Copy code
main:       A---B---C---F---G
                \
feature-x:        D---E
F ve G commit’leri main dalında sonradan yapılmış yeni güncellemeleri temsil ediyor. Siz bu güncellemeleri kendi dalınıza almak için rebase işlemi yapabilirsiniz.
3. Feature Dalında Rebase İşlemi Yapmak
Kendi dalınızda git rebase main komutunu çalıştırarak, feature-x dalını güncel main dalı üzerine taşıyabilirsiniz. Bu, dalınızdaki değişiklikleri (D ve E commit’leri) main dalındaki son güncellemelerin arkasına taşır.

Rebase Komutu:

git checkout feature-x
git rebase main

Bu işlemden sonra dalınız şu şekilde görünür:

Rebase Sonrası:

main:       A---B---C---F---G
                            \
feature-x (rebased):         D'---E'
D' ve E', feature-x dalındaki değişikliklerinizin yeniden yazılmış halleridir. Böylece, commit’leriniz artık en güncel main dalının üzerine sıralanmış olur.
Rebase ve Çatışma (Conflict) Çözme
Eğer main dalındaki commit'ler ile feature-x dalındaki commit'ler aynı dosya veya satırda değişiklik yapmışsa, rebase sırasında çatışmalar (conflict) ortaya çıkabilir. Bu durumda Git size hangi dosyalarda çatışma olduğunu bildirir, ve çatışmayı çözmeniz istenir:

Çatışma Çözme: Çatışan dosyaları açın, gerekli düzenlemeleri yaparak hangi değişikliklerin korunacağına karar verin.

Çatışmayı Onaylama ve Devam Etme:

git add <çatışma-yaşanan-dosya>
git rebase --continue
Eğer daha fazla çatışma yoksa rebase işlemi devam eder ve güncellenmiş commit’lerinizi temiz bir şekilde yerleştirir.

----------------------------

# Git Revert Nedir?
git revert, Git’te yapılan bir commit’i geri almak, yani commit’in etkisini iptal etmek için kullanılan bir komuttur. Ancak, revert komutu geri alınan commit’i doğrudan silmez; onun yerine orijinal commit’in etkisini tersine çeviren yeni bir commit oluşturur. Bu, takım çalışmasında güvenli bir şekilde geçmişteki hataları düzeltmek veya istenmeyen değişiklikleri geri almak için kullanılır.

main:    A---B---C---D---E

git revert <D'nin commit ID'si>


main:    A---B---C---D---E---D'    sonuc ta diger commitler silinmedi D ye donduk cunku orda sistem iyi calisiyordu, ordan tekrar devam ettik

Avantajları
Geçmiş Korunur: Commit geçmişi değiştirilmez, tüm değişiklikler kaydedilir.
Takım İçin Güvenli: Diğer geliştiricilerin çalışmalarını etkilemeden geri alma işlemi yapılır.


# Git Revert ve Git Reset Arasındaki Fark
Git Revert	                                                    Git Reset
Geri alma işlemi için yeni bir commit oluşturur.	      Commit’i tamamen siler.
Paylaşılan dallarda güvenle kullanılır.	                Paylaşılan dallarda önerilmez, çünkü commit geçmişini değiştirir.
Geçmişteki bireysel commit'leri geri alabilir.	        Genellikle son commit'leri silmek için kullanılır.

# Git Reset Nedir?
git reset, bir Git deposundaki commit geçmişini değiştirmek için kullanılan bir komuttur. Bu komut, belirli bir commit'e geri dönmenizi sağlar ve o commit'ten sonraki commit'leri siler veya geri alır. git reset, genellikle çalışma dizinini veya index’i (staging area) temizlemek için kullanılır.

Ne Zaman Kullanılmalı?
1. Son Commit’i Geri Alma: Yanlış bir commit yaptıysanız ve bunu geri almak istiyorsanız.
2. Staging Alanını Temizleme: Değişikliklerinizi staging alanından kaldırmak ve çalışma dizinini temizlemek için.
3. Geçmişi Düzenleme: Commit geçmişini düzeltmek veya gereksiz commit'leri silmek için.


1. Soft Reset (--soft)
Kullanım: git reset --soft <commit_id>
Etkisi:
Geri dönülen commit'ten sonraki tüm commit'ler kaldırılır.
Değişiklikler staging alanında kalır.

2. Mixed Reset (Varsayılan)
Kullanım: git reset <commit_id>
Etkisi:
Geri dönülen commit'ten sonraki tüm commit'ler kaldırılır.
Değişiklikler çalışma dizininde kalır, staging alanı temizlenir.

3. Hard Reset (--hard)
Kullanım: git reset --hard <commit_id>
Etkisi:
Geri dönülen commit'ten sonraki tüm commit'ler kaldırılır.
Tüm değişiklikler kaybolur (hem staging hem de çalışma dizininden).
Özet Tablosu
Reset Türü	Diğer Commit'lere Etkisi	Değişikliklerin Durumu
Soft	Sonraki commit'ler kaldırılır	Değişiklikler staging alanında kalır
Mixed	Sonraki commit'ler kaldırılır	Değişiklikler çalışma dizininde kalır
Hard	Sonraki commit'ler kaldırılır	Tüm değişiklikler kaybolur


------
# git checkout HEAD son komite gecis yapar    
# git checkout HEAD~1 son komitten bir onceki komit e gecis yapar     


-------------------------------------------------
1. Çalışma Dizininde Değişiklik Yapma
**Durum: Şimdi main dalındasınız ve yeni bir özellik eklemek için bir dosyada değişiklik yapıyorsunuz. Örneğin, app.js dosyasını açtınız ve yeni bir fonksiyon eklediniz.

Aşama: Çalışma Dizin (Working Directory)

Ne Yapılıyor?: app.js dosyasında değişiklik yaptınız. Henüz bu değişiklikler kaydedilmedi.

2. Değişiklikleri Staging Alanına Eklemek
git add app.js
Aşama: Staging Alanı (Staging Area)

Ne Yapılıyor?: app.js dosyasındaki değişiklikler staging alanına eklendi. Bu aşamada, commit yapmaya hazır hale getirildi.

3. Değişiklikleri Yerel Depoya Kaydetmek
Komut: Değişikliklerinizi kaydetmek için commit yapıyorsunuz:

git commit -m "Yeni özellik eklendi"
Aşama: Yerel Depo (Local Repository)

Ne Yapılıyor?: app.js dosyasındaki değişiklikler, yeni bir commit (E) olarak yerel depoya kaydedildi.

4. Staging Alanında Değişikliklerin İptali
Durum: Ancak, daha sonra yaptığınız değişiklikleri tekrar gözden geçirince, bazı hatalar olduğunu fark ettiniz. Staging alanındaki değişiklikleri geri almak istiyorsunuz.

Komut: Staging alanındaki değişiklikleri iptal etmek için:

git reset app.js
Aşama: Staging Alanı
Ne Yapılıyor?: app.js dosyası staging alanından çıkarıldı ve çalışma dizininde değişiklikler kalmaya devam etti.


5. Çalışma Dizininde Değişiklikleri İptal Etme
Durum: Hatalı değişikliklerin tamamen geri alınmasını istiyorsunuz.

Komut: Çalışma dizinindeki değişiklikleri iptal etmek için:

git checkout -- app.js
Aşama: Çalışma Dizin
Ne Yapılıyor?: app.js dosyası önceki durumuna geri döndü. Artık çalışma dizininde değişiklik yok.

# Özet
Çalışma Dizin: Dosyalar üzerinde değişiklik yaparız (örneğin, app.js dosyasını düzenlemek).
Staging Alanı: Değişiklikleri commit için hazır hale getiririz (git add ile).
Yerel Depo: Değişiklikleri kalıcı hale getiririz (git commit ile).
İptal İşlemleri: Staging alanından ve çalışma dizininden değişiklikleri geri alabiliriz (git reset ve git checkout ile).
Bu senaryo, Git’in çalışma alanları arasındaki geçişleri ve her bir aşamanın işlevini anlamanıza yardımcı olacaktır. Eğer daha fazla bilgi isterseniz, lütfen sormaktan çekinmeyin!


----------------------------------------
# bir elementin enable olmasini belirli sure icinde bekleme
  await expect(anyButtonElement).toBeEnabled({timeout:5000});

--------------------------------------------------
#`${variable}` dogru kullanim    --- bu sekilde olunca parametreleri algilayabilir
#'${variable}' yanlis kullanim

--------------------------------------------------





