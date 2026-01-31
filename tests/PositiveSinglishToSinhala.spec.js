import { test, expect } from '@playwright/test';

test.setTimeout(120000);

test.describe('Positive Functional Test Cases - Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForSelector('[placeholder="Input Your Singlish Text Here."]', { timeout: 30000 });
  });

  // helper to enter text and assert translated output
  async function translateAndExpect(page, inputText, expectedOutput) {
    const input = page.getByPlaceholder('Input Your Singlish Text Here.');
    await input.click();
    await input.fill('');
    // use fill + dispatch input event so listeners run but avoid slow typing
    await input.fill(inputText);
    await input.evaluate(el => el.dispatchEvent(new Event('input', { bubbles: true })));
    // blur the input to trigger processing if needed
    await page.click('body');
    // allow more time for translation to run
    await page.waitForTimeout(800);
    const out = page.locator('div.whitespace-pre-wrap').first();
    const expectedAlt = expectedOutput.slice(0, -1);
    await page.waitForFunction(
      (exp, alt) => {
        const el = document.querySelector('div.whitespace-pre-wrap');
        if (!el) return false;
        const normalize = (s) => (s || '').normalize('NFC').replace(/\s+/g, ' ').trim();
        const txt = normalize(el.textContent || '');
        const e = normalize(exp);
        const a = normalize(alt);
        return txt.includes(e) || txt.includes(a);
      },
      expectedOutput,
      expectedAlt,
      { timeout: 15000 }
    );
  }

  test('Pos_Fun_0001 - Api yamu ikmanata ethanata', async ({ page }) => {
    await translateAndExpect(page, 'Api yamu ikmanata ethanata', 'අපි යමු ඉක්මනට එතනට');
  });

  test('Pos_Fun_0002 - suba aluth avurudhdhak!', async ({ page }) => {
    await translateAndExpect(page, 'suba aluth avurudhdhak!', 'සුබ අලුත් අවුරුද්දක්!');
  });

  test('Pos_Fun_0003 - mata ikmanata enna vennee nae', async ({ page }) => {
    await translateAndExpect(page, 'mata ikmanata enna vennee nae', 'මට ඉක්මනට එන්න වෙන්නේ නැ');
  });

  test('Pos_Fun_0004 - mama gedhara yanavaa, amma mata hodha bath ekak hadhala thibunaa', async ({ page }) => {
    await translateAndExpect(page, 'mama gedhara yanavaa, amma mata hodha bath ekak hadhala thibunaa', 'මම ගෙදර යනවා, අම්ම මට හොද බත්  එකක් හදල තිබුනා');
  });

  test('Pos_Fun_0005 - 6.30PM mata English class thibuna', async ({ page }) => {
    await translateAndExpect(page, '6.30PM mata English class thibuna', '6.30PM මට English class තිබුනා');
  });

  test('Pos_Fun_0006 - 2026-01-15 api yamu', async ({ page }) => {
    await translateAndExpect(page, '2026-01-15 api yamu', '2026-01-15 අපි යමු');
  });

  test('Pos_Fun_0007 - hari hari eka balannam mama', async ({ page }) => {
    await translateAndExpect(page, 'hari hari eka balannam mama', 'හරි හරි එක බලන්නම් මම');
  });

  test('Pos_Fun_0008 - oba enavanam nam, mama kiyala dhennam', async ({ page }) => {
    await translateAndExpect(page, 'oba enavanam nam, mama kiyala dhennam', 'ඔබ එනවනම් නම්, මම කියල දෙන්නම්');
  });

  test('Pos_Fun_0009 - mama laptop eka ready karala thibunaa', async ({ page }) => {
    await translateAndExpect(page, 'mama laptop eka ready karala thibunaa', 'මම laptop එක ready කරල තිබුනා');
  });

  test('Pos_Fun_0010 - mama eyaava balan giyaa', async ({ page }) => {
    await translateAndExpect(page, 'mama eyaava balan giyaa', 'මම එයාව බලන් ගියා');
  });

  test('Pos_Fun_0011 - mama office yanna kalin lunch gaththa saha Zoom meeting ekata join venna unaa', async ({ page }) => {
    await translateAndExpect(page, 'mama office yanna kalin lunch gaththa saha Zoom meeting ekata join venna unaa', 'මම office යන්න කලින් lunch ගත්ත සහ Zoom meeting එකට join වෙන්න උනා');
  });

  test('Pos_Fun_0012 - api weekend picnic giyaa dhurakata , eeka nisaa mata hithanne mama heta enna vennee naehae.', async ({ page }) => {
    await translateAndExpect(page, 'api weekend picnic giyaa dhurakata , eeka nisaa mata hithanne mama heta enna vennee naehae.', 'අපි  weekend  picnic ගියා දුරකට , ඒක නිසා මට හිතන්නෙ මම හෙට එන්න වෙන්නේ නැහැ.');
  });

  test('Pos_Fun_0013 - api adha project eka complete karanna oone, oyaage report eka submit karanna mata heta.', async ({ page }) => {
    await translateAndExpect(page, 'api adha project eka complete karanna oone, oyaage report eka submit karanna mata heta.', 'අපි අද project එක complete කරන්න ඕනෙ, ඔයාගෙ report එක submit කරන්න මට හෙට');
  });

  test('Pos_Fun_0014 - api adha 2024-01-28 project eka complete karanna balamu, ethakota client godak happy veyi kiyala mata hithanne.', async ({ page }) => {
    await translateAndExpect(page, 'api adha 2024-01-28 project eka complete karanna balamu, ethakota client godak happy veyi kiyala mata hithanne.', 'අපි අද 2024-01-28 project එක complete කරන්න බලමු, එතකොට client ගොඩක් happy වෙයි කියල මට හිතන්නෙ.');
  });

  test('Pos_Fun_0015 - meeka Rs. 5000/-ta thiyenavaa, oyaata 10% discount ekak illanna puluvandha? poddak check karanna', async ({ page }) => {
    await translateAndExpect(page, 'meeka Rs. 5000/-ta thiyenavaa, oyaata 10% discount ekak illanna puluvandha? poddak check karanna', 'මේක Rs. 5000/-ට තියෙනවා, ඔයාට 10% discount එකක් ඉල්ලන්න පුලුවන්ද? පොඩ්ඩක් check කරන්න');
  });

  test('Pos_Fun_0016 - mata hithenne adha library ekee books gaena research karanna kalin, notebook ekak ganna oonee', async ({ page }) => {
    await translateAndExpect(page, 'mata hithenne adha library ekee books gaena research karanna kalin, notebook ekak ganna oonee', 'මට හිතෙන්නෙ අද library එකේ books ගැන research කරන්න කලින්, notebook එකක් ගන්න ඕනේ');
  });

  test('Pos_Fun_0017 - oyage mee maasee rent Rs. 25,000/- pay karanna, ethakota landlord happy veyi.', async ({ page }) => {
    await translateAndExpect(page, 'oyage mee maasee rent Rs. 25,000/- pay karanna, ethakota landlord happy veyi.', 'ඔයගෙ මේ මාසේ rent Rs. 25,000/- pay කරන්න, එතකොට landlord happy වෙයි');
  });

  test('Pos_Fun_0018 - ela machan! hari hari api heta enava kiyala dhanne naehae nedha?', async ({ page }) => {
    await translateAndExpect(page, 'ela machan! hari hari api heta enava kiyala dhanne naehae nedha?', 'එල මචන්! හරි හරි අපි හෙට එනව කියල දන්නෙ නැහැ නේද?');
  });

  test('Pos_Fun_0019 - poddak balanna... document tika attach karala, email ekak dhanna', async ({ page }) => {
    await translateAndExpect(page, 'poddak balanna... document tika attach karala, email ekak dhanna', 'පොඩ්ඩක් බලන්න... document ටික attach කරල, email එකක් දන්න');
  });

  test('Pos_Fun_0020 - oya shop ekata gihin 2 kg rice illagena enna, iilagata bath hadhamu', async ({ page }) => {
    await translateAndExpect(page, 'oya shop ekata gihin 2 kg rice illagena enna, iilagata bath hadhamu', 'ඔය shop එකට ගිහින් 2 kg rice ඉල්ලගෙන එන්න, ඊලගට බත් හදමු.');
  });

  test('Pos_Fun_0021 - jivithaye saebae sathuta laebenne sarala dhevalvalin kiyala mama hithuve adha dhavasedhi gedhara issaraha thanakola matha idhagena the koppayak bonnakota aava suvadha saha sithala hulaga maagee hitha sansun kala. Eken passe mama punchi pothak kiyavanna patan gaththa. Eka pituvakin eka pituvata yanakota kaalaya galaa yanava vage heguna. jivithaye godak rahas thiyenava kiyala thearuna. E sansunkama thamaa mata laebuna lokuma dheya.', async ({ page }) => {
    const inputText = 'jivithaye saebae sathuta laebenne sarala dhevalvalin kiyala mama hithuve adha dhavasedhi gedhara issaraha thanakola matha idhagena the koppayak bonnakota aava suvadha saha sithala hulaga maagee hitha sansun kala. Eken passe mama punchi pothak kiyavanna patan gaththa. Eka pituvakin eka pituvata yanakota kaalaya galaa yanava vage heguna. jivithaye godak rahas thiyenava kiyala thearuna. E sansunkama thamaa mata laebuna lokuma dheya.';
    const expectedOutput = 'ජිවිතයෙ සැබැ සතුට ලැබෙන්නෙ සරල දෙවල්වලින් කියල මම හිතුවෙ අද දවසෙදි ගෙදර ඉස්සරහ තනකොල මත ඉදගෙන තෙ කොප්පයක් බොන්නකොට ආව සුවද සහ සිතල හුලග මාගේ හිත සන්සුන් කල. එකෙන් පස්සෙ මම පුන්චි පොතක් කියවන්න පටන් ගත්ත. එක පිටුවකින් එක පිටුවට යනකොට කාලය ගලා යනව වගෙ හෙගුන. ජිවිතයෙ ගොඩක් රහස් තියෙනව කියල තේරුන. එ සන්සුන්කම තමා මට ලැබුන ලොකුම දෙය.';
    await translateAndExpect(page, inputText, expectedOutput);
  });

  test('Pos_Fun_0022 - api weekend eken trip ekak Kandy valata yanna plan karala thibuna, mama tickets book karala, hotel reservation karala, amma ekka plan discuss karala, travel bag pack karala, GPS map set karala, vehicle fuel fill karala, passe api yamu, trip eka complete karanna', async ({ page }) => {
    const inputText = 'api weekend eken trip ekak Kandy valata yanna plan karala thibuna, mama tickets book karala, hotel reservation karala, amma ekka plan discuss karala, travel bag pack karala, GPS map set karala, vehicle fuel fill karala, passe api yamu, trip eka complete karanna';
    const expectedOutput = 'අපි weekend එකෙන් trip එකක් Kandy වලට යන්න plan කරල තිබුන, මම tickets book කරල, hotel reservation කරල, අම්ම එක්ක plan discuss කරල, travel bag pack කරල, GPS map සෙට් කරල, vehicle fuel fill කරල, පස්සෙ අපි යමු, trip එක complete කරන්න';
    await translateAndExpect(page, inputText, expectedOutput);
  });

  test('Pos_Fun_0023 - Mama iiye havasa shopping mall ekata giya – Rs. 3,500k budget ekak thibuna mata! Ekata mama gaththe Rs. 2,000ka dress ekak saha Rs. 1,500k bag ekak. Havasa 6:45tama mama eva genalla gedharin thibba. Shopping karadhdhi time godak giyath e feel eka godak vatinava nedha? Eka thamaa me dhavasee hodhama dhee vunee.', async ({ page }) => {
    const inputText = 'Mama iiye havasa shopping mall ekata giya – Rs. 3,500k budget ekak thibuna mata! Ekata mama gaththe Rs. 2,000ka dress ekak saha Rs. 1,500k bag ekak. Havasa 6:45tama mama eva genalla gedharin thibba. Shopping karadhdhi time godak giyath e feel eka godak vatinava nedha? Eka thamaa me dhavasee hodhama dhee vunee.';
    const expectedOutput = 'මම ඊයෙ හවස shopping mall එකට ගිය – Rs. 3,500ක් budget එකක් තිබුන මට! එකට මම ගත්තෙ Rs. 2,000ක dress එකක් සහ Rs. 1,500ක් bag එකක්. හවස 6:45ටම මම එව ගෙනල්ල  ගෙදරින් තිබ්බ. Shopping කරද්දි time ගොඩක් ගියත් එ feel එක ගොඩක් වටිනව නේද? එක තමා මෙ දවසේ හොදම දේ වුනේ.';
    await translateAndExpect(page, inputText, expectedOutput);
  });

  test('Pos_Fun_0024 - ikmanata gedhara yanne kohomadha?', async ({ page }) => {
    await translateAndExpect(page, 'ikmanata gedhara yanne kohomadha?', 'ඉක්මනට ගෙදර යන්නෙ කොහොමද?');
  });

});
