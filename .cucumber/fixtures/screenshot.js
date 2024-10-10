// .cucumber/fixtures/screenshot.js
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Define the screenshot directory relative to the project root
const screenshotDir = join(process.cwd(), 'screenshots');

// Ensure the screenshots directory exists
if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
}

/**
 * Function to take a screenshot and return its path.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 * @param {string} screenshotName - The name of the screenshot file.
 */
export async function takeScreenshot(page, screenshotName) {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    // Create a full screenshot path with date
    const fullScreenshotName = `${screenshotName}_${formattedDate}.png`;
    const screenshotPath = join(screenshotDir, fullScreenshotName);

    // Capture the screenshot
    await page.screenshot({ path: screenshotPath });
    return screenshotPath;  // Return path for attaching to the report
}
