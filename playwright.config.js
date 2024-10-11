import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';


const testDir = defineBddConfig({
 
  features: '.cucumber/features/*.feature',
  steps: '.cucumber/stepDefinitions/*.js',

  //importTestFrom:'.cucumber/fixtures.js'            //documentasyonu oku , fixtures.js file indaki bir yapiyi kullanmak icin 

});


export default defineConfig({

  testDir,

 //workers:6,
  timeout: 60000, // Sets the maximum wait time for each test to 60 seconds (60000ms) -- important setting

 workers: process.env.CI ? 4 : 6,// workers: process.env.CI ? 2 : 8,   Use 2 workers in CI,  but 8 workers in your local enviroment ayarlandi
 //retries:1,  //if test fails , runs one more time 
 fullyParallel: true, // Enable full parallel execution in local or CI Enviroment  (butun testler birbirinden bagimsiz olmali )


  reporter: [
    cucumberReporter('html', { outputFile: '.cucumber-report/report.html', skipAttachments: ['video/webm', 'application/zip'], }), 

    cucumberReporter('json', { outputFile: '.cucumber-report/report.json', skipAttachments: true }),
    cucumberReporter('junit', { outputFile: '.cucumber-report/report.xml', suiteName: 'my suite' }),
    
    ['allure-playwright', { outputDir: 'allure-results' }],

    
  ],


  use: {


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',    //screenshot: 'on',  ekle screenshot: 'of', screenshot: 'only-on-failure',   
    video: "retain-on-failure",
    //headless:true,
  },

//devices kisminda '' kismindan istedigini secebilir ve bir isim verebilirsin
//Cannot use --browser option in terminal if devices are used
  // projects: [
  //   {
  //     name: 'chrome',
  //     use: {
  //       ...devices['Desktop Chrome'],
  //     },
  //   },

  //   {
  //     name: 'firefox',
  //     use: {
  //       ...devices['Desktop Firefox'],
  //     },
  //   },

  //   {
  //     name: 'iphone 15',
  //     use: {
  //       ...devices['iPhone 8 Plus'],
  //     },
  //   },
   
  //],




});



//shift+command+7 /  changes the selected area to a comment
//npx bddgen && npx playwright test     test icin
//npm init -y   package.json olusturur , script kismina npx bddgen && npx playwright test      yapistir
