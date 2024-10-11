// @ts-check
import { test, expect } from '@playwright/test';
import allure from 'allure-playwright';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');


  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  const screenshot = await page.screenshot();
allure.addAttachment('Ekran Görüntüsü', screenshot, 'image/png');
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
