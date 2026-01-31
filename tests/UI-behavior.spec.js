import { test, expect } from '@playwright/test';

test('Pos_UI_0001 - Output updates while typing', async ({ page }) => {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  const input = page.getByPlaceholder('Input Your Singlish Text Here.');
  await input.fill('mama gedhara yanavaa');
  await input.evaluate(e => e.dispatchEvent(new Event('input',{ bubbles: true })));
  const out = page.locator('div.whitespace-pre-wrap').first();
  await expect(out).toHaveText(/[\u0D80-\u0DFF]/, { timeout: 20000 });
});
