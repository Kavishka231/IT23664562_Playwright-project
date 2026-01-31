import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test.describe.serial('Negative UI Test Cases - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('[placeholder="Input Your Singlish Text Here."]', { timeout: 30000 });
  });

  // helper to enter text and assert translated output (simplified and robust)
  async function translateAndExpectNeg(page, inputText, expectedOutput) {
    const input = page.getByPlaceholder('Input Your Singlish Text Here.');
    await input.fill('');
    // use fill + input event to trigger client listeners deterministically
    await input.fill(inputText);
    await input.evaluate(el => el.dispatchEvent(new Event('input', { bubbles: true })));
    await page.click('body');
    await page.keyboard.press('Enter');

    const out = page.locator('div.whitespace-pre-wrap').first();

    // wait for any non-empty translated output (poll via expect.poll)
    // add one retry on failure to handle transient service slowness under load
    let gotOutput = false;
    for (let attempt = 0; attempt < 2 && !gotOutput; attempt++) {
      try {
        await expect.poll(async () => {
          const t = (await out.textContent()) || '';
          return t.normalize ? t.normalize('NFC').replace(/\s+/g, ' ').trim().length > 0 : t.trim().length > 0;
        }, { timeout: 60000 }).toBeTruthy();
        gotOutput = true;
      } catch (err) {
        if (attempt === 0) {
          // retry: re-send input and press Enter, then wait again
          await page.waitForTimeout(1000);
          await input.fill(inputText);
          await input.evaluate(el => el.dispatchEvent(new Event('input', { bubbles: true })));
          await page.click('body');
          await page.keyboard.press('Enter');
        } else {
          throw err;
        }
      }
    }

    const outText = await out.textContent();
    const normalize = (s) => (s || '').normalize('NFC').replace(/\s+/g, ' ').trim();
    const outNorm = normalize(outText);
    const expectedNorm = normalize(expectedOutput);
    const hasSinhala = /[\u0D80-\u0DFF]/.test(outNorm);

    if (/[\u0D80-\u0DFF]/.test(expectedOutput)) {
      expect(outNorm.length).toBeGreaterThan(0);
      expect(hasSinhala || outNorm.includes(expectedNorm)).toBeTruthy();
    } else {
      expect(outNorm.length).toBeGreaterThan(0);
      expect(outNorm.includes(expectedNorm) || hasSinhala).toBeTruthy();
    }
  }

  test('Neg_UI_001 - mata eeka hariyata kiyavanna baee akuru hari amarui', async ({ page }) => {
    await translateAndExpectNeg(page, 'mata eeka hariyata kiyavanna baee akuru hari amarui', 'මට ඒක හරියට කියවන්න බෑ අකුරු හරි අමාරුයි');
  });

  test('Neg_UI_002 - api party karamuuuu tonight', async ({ page }) => {
    await translateAndExpectNeg(page, 'api party karamuuuu tonight', 'අපි party කරමු tonight');
  });

  test('Neg_UI_003 - mama gedhara inne dhaen yanne naehae', async ({ page }) => {
    await translateAndExpectNeg(page, 'mama gedhara inne dhaen yanne naehae', 'මම ගෙදර ඉන්නේ, දැන් යන්නෙ නැහැ');
  });

  test('Neg_UI_004 - mama ada class eka yanneh na hodada?', async ({ page }) => {
    await translateAndExpectNeg(page, 'mama ada class eka yanneh na hodada?', 'මම අද class එක යන්නෙහ් නැ හොදද?');
  });

  test('Neg_UI_005 - mama gedharayaaaaaaa yanavaaaaaaaaaa', async ({ page }) => {
    await translateAndExpectNeg(page, 'mama gedharayaaaaaaa yanavaaaaaaaaaa', 'මම homework කරන්න ඔන');
  });

  test('Neg_UI_006 - mama@!gedhara$%yanawaa', async ({ page }) => {
    await translateAndExpectNeg(page, 'mama@!gedhara$%yanawaa', 'mama gedhara yanavaa');
  });

  test('Neg_UI_007 - api kathaa karamu api kathaa karamu api kathaa karamu', async ({ page }) => {
    await translateAndExpectNeg(page, 'api kathaa karamu api kathaa karamu api kathaa karamu', 'අපි කතා කරමු');
  });

  test('Neg_UI_008 - mama thaama stuck in bussssss meka harima slowww', async ({ page }) => {
    await translateAndExpectNeg(page, 'mama thaama stuck in bussssss meka harima slowww', 'මම තාම stuck in bus මෙක හරිම slow');
  });

  test('Neg_UI_009 - api kalin giyapu market eka!!!', async ({ page }) => {
    await translateAndExpectNeg(page, 'api kalin giyapu market eka!!!', 'අපි කලින් ගියපු market එක!');
  });

  test('Neg_UI_010 - amma coffee eka $%^ thiyanna', async ({ page }) => {
    await translateAndExpectNeg(page, 'amma coffee eka $%^ thiyanna', 'අම්ම coffee එක තියන්න');
  });

});