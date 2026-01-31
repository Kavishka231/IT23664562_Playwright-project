import { test, expect } from '@playwright/test';

test.describe('UI Test Cases Singlish to Sinhala', () => {
  
  test('Pos_UI_0001 - Output updates in real time while typing', async ({page}) => {
    // 1. Go to the Swift Translator site
    await page.goto('https://www.swifttranslator.com/');

    // 2. Define locators
    const input = page.locator('textarea');
    const output = page.locator('div.whitespace-pre-wrap').first();

    // 3. Type input slowly to simulate user typing
    await input.type('mama gedhara yanavaa', { delay: 100 });

    // 4. Wait a short time to ensure output updates
    await page.waitForTimeout(500);

    // 5. Check UI behavior: output should not be empty
    await expect(output).not.toBeEmpty();
    
    console.log('UI test passed: Output updated while typing.');
  });

});
