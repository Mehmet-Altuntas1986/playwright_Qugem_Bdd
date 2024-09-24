
//steps.js file larinda bu hook import edilmezse algilanmaz , ayni sekilde benzer bir hook step definition icinde olusturulabilir
const { createBdd } = require('playwright-bdd');

const { After,Before,BeforeAll,AfterAll } = createBdd();

import { LoginPage } from './pages/LoginPage';


let browser;
let page;

BeforeAll(async function ({ $workerInfo, browser }) {
  console.log("beforeall is running")
  
});


Before(async () => {
  console.log("before each scnerio hook")
  
});




After( async function () {
    console.log("after each scnerio hook")

  // runs after each scenario, you can access to World as 'this'.
});




AfterAll(async function ({ $workerInfo, browser }) {
  console.log("afterall is running")
  
});

module.exports = { browser, page };


//https://vitalets.github.io/playwright-bdd/#/writing-steps/hooks