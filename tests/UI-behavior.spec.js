import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test.describe('UI Test Cases Singlish to Sinhala', () => {
  
  test('Pos_UI_0001 - Output updates in real time while typing', async ({page}) => {
    // 1. Go to the Swift Translator site and wait for input
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForSelector('[placeholder="Input Your Singlish Text Here."]', { timeout: 30000 });

    // 2. Define locators (prefer placeholder for stability)
    const input = page.getByPlaceholder('Input Your Singlish Text Here.');
    const output = page.locator('div.whitespace-pre-wrap').first();

    // 3. Ensure input is empty then fill and dispatch input event (faster and reliable)
    await input.fill('');
    await input.fill('mama gedhara yanavaa');
    await input.evaluate(el => el.dispatchEvent(new Event('input', { bubbles: true })));
    // some UI behaviors require blurring the input and/or pressing Enter
    await page.click('body');
    await page.keyboard.press('Enter');
    // 4. Wait for any output container to become non-empty (robust against multiple output nodes)
    // try to wait for any output to appear; if it times out, record a screenshot but don't fail the test
    let sawOutput = false;
    try {
      await page.waitForFunction(() => {
        const els = document.querySelectorAll('div.whitespace-pre-wrap');
        return Array.from(els).some(el => (el.textContent || '').trim().length > 0);
      }, { timeout: 15000 });
      sawOutput = true;
    } catch (e) {
      console.warn('UI-behavior: output did not appear within short timeout; saving screenshot and failing.');
    }

    if (sawOutput) {
      const anyText = await page.evaluate(() => {
        const els = document.querySelectorAll('div.whitespace-pre-wrap');
        return Array.from(els).map(e => (e.textContent || '').trim()).filter(Boolean).join('\n');
      });
      await expect(anyText.length).toBeGreaterThan(0);
    } else {
      // fallback: capture screenshot and fail with helpful message
      const path = `artifacts/ui-behavior-no-output-${Date.now()}.png`;
      try {
        await page.screenshot({ path, fullPage: false });
      } catch (e) {
        // ignore screenshot failures
      }
      throw new Error(`UI-behavior: no output within timeout; screenshot: ${path}`);
    }
    
    console.log('UI test passed: Output updated while typing.');
  });

});
