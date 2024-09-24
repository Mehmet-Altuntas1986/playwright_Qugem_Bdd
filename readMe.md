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


.vscode/settings.json  file inida  ekledik, boylece feature file inda given,when,then e tiklayinca stepdefinitions lara ulasabiliriz

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
Fixture olusturma - ve kullanimi 
