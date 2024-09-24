import { defineConfig } from '@playwright/test';
import { defineBddConfig,cucumberReporter,CucumberJsonReporter } from 'playwright-bdd';

const testDir = defineBddConfig({
  paths: ['.cucumber/features/*.feature'], 
  require: ['.cucumber/stepDefinitions/*.js'],
  tags: '', // Etiketleri burada belirtin
  //importTestFrom:'.cucumber/fixtures.js'            //documentasyonu oku , fixtures.js file indaki bir yapiyi kullanmak icin 

});




export default defineConfig({
testDir,
workers:6,
 
  reporter: [
    cucumberReporter('html', { outputFile: '.cucumber-report/report.html' }), 
    cucumberReporter('json', { outputFile: '.cucumber-report/report.json' }),
    cucumberReporter('junit', { outputFile: '.cucumber-report/report.xml',suiteName: 'my suite' }),
  ],
  
  use: {
   
  
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',    //screenshot: 'on',  ekle screenshot: 'of', screenshot: 'only-on-failure',   
    video:"retain-on-failure",
  },
  
  
});




//npx bddgen && npx playwright test     test icin
//npm init -y   package.json olusturur , script kismina npx bddgen && npx playwright test      yapistir
