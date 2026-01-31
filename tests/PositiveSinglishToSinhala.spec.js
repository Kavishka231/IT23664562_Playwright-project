import { test, expect } from '@playwright/test';

test.describe('Positive Test Cases Singlish to Sinhala', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
  });

  const testCases = [
    {
      input: 'Api yamu ikmanata ethanata',
      output: 'අපි යමු ඉක්මනට එතනට'
    },
    {
      input: 'suba aluth avurudhdhak!',
      output: 'සුබ අලුත් අවුරුද්දක්!'
    },
    {
      input: 'mata ikmanata enna vennee nae',
      output: 'මට ඉක්මනට එන්න වෙන්නේ නැ'
    },
    {
      input: 'mama gedhara yanavaa, amma mata hodha bath  ekak hadhala thibunaa',
      output: 'මම ගෙදර යනවා, අම්ම මට හොද බත්  එකක් හදල තිබුනා'
    },
    {
      input: '6.30PM mata English class thibunaa',
      output: '6.30PM මට English class තිබුනා'
    },
    {
      input: '2026-01-15 api yamu',
      output: '2026-01-15 අපි යමු'
    },
    {
      input: 'hari hari eka balannam mama',
      output: 'හරි හරි එක බලන්නම් මම'
    },
    {
      input: 'oba enavanam nam, mama kiyala dhennam',
      output: 'ඔබ එනවනම් නම්, මම කියල දෙන්නම්'
    },
    {
      input: 'mama laptop eka ready karala thibunaa',
      output: 'මම laptop එක ready කරල තිබුනා'
    },
    {
      input: 'mama eyaava balan giyaa',
      output: 'මම එයාව බලන් ගියා'
    },

    // Medium inputs
    {
      input: 'mama office yanna kalin lunch gaththa saha Zoom meeting ekata join venna unaa',
      output: 'මම office යන්න කලින් lunch ගත්ත සහ Zoom meeting එකට join වෙන්න උනා'
    },
    {
      input: 'api  weekend  picnic giyaa dhurakata , eeka nisaa mata hithanne mama heta enna vennee naehae.',
      output: 'අපි  weekend  picnic ගියා දුරකට , ඒක නිසා මට හිතන්නෙ මම හෙට එන්න වෙන්නේ නැහැ.'
    },
    {
      input: ' adha project eka complete karanna oone, oyaage report eka submit karanna mata heta.',
      output: ' අද project එක complete කරන්න ඕනෙ, ඔයාගෙ report එක submit කරන්න මට හෙට'
    },
    {
      input: 'api  2024-01-28 project eka complete karanna balamu, ethakota client godak happy veyi kiyala mata hithanne.',
      output: 'අපි  2024-01-28 project එක complete කරන්න බලමු, එතකොට client ගොඩක් happy වෙයි කියල මට හිතන්නෙ.'
    },
    {
      input: 'meeka Rs. 5000/-ta thiyenavaa, oyaata 10% discount ekak illanna puluvandha? poddak check karanna',
      output: 'මේක Rs. 5000/-ට තියෙනවා, ඔයාට 10% discount එකක් ඉල්ලන්න පුලුවන්ද? පොඩ්ඩක් check කරන්න'
    },
    {
      input: 'mata hithenne adha library ekee books gaena research karanna kalin, notebook ekak ganna oonee',
      output: 'මට හිතෙන්නෙ අද library එකේ books ගැන research කරන්න කලින්, notebook එකක් ගන්න ඕනේ'
    },
    {
      input: 'oyage mee maasee rent Rs. 25,000/- pay karanna, ethakota landlord happy veyi.',
      output: 'ඔයගෙ මේ මාසේ rent Rs. 25,000/- pay කරන්න, එතකොට landlord happy වෙයි'
    },
    {
      input: 'ela machan! hari hari api heta enava kiyala dhanne naehae nedha?',
      output: 'එල මචන්! හරි හරි අපි හෙට එනව කියල දන්නෙ නැහැ නේද?'
    },
    {
      input: 'poddak balanna... document tika attach karala, email ekak dhanna',
      output: 'පොඩ්ඩක් බලන්න... document ටික attach කරල, email එකක් දන්න'
    },
    {
      input: 'oya shop ekata gihin 2 kg rice illagena enna, iilagata bath hadhamu.',
      output: 'ඔය shop එකට ගිහින් 2 kg rice ඉල්ලගෙන එන්න, ඊලගට බත් හදමු.'
    },

    // Long input
    {
      input: 'jivithaye saebae sathuta laebenne sarala dhevalvalin kiyala mama hithuve adha dhavasedhi gedhara issaraha thanakola matha idhagena the koppayak bonnakota aava suvadha saha sithala hulaga maagee hitha sansun kala. Eken passe mama punchi pothak kiyavanna patan gaththa. Eka pituvakin eka pituvata yanakota kaalaya galaa yanava vage heguna. jivithaye godak rahas thiyenava kiyala thearuna. E sansunkama thamaa mata laebuna lokuma dheya.',
      output: 'ජිවිතයෙ සැබැ සතුට ලැබෙන්නෙ සරල දෙවල්වලින් කියල මම හිතුවෙ අද දවසෙදි ගෙදර ඉස්සරහ තනකොල මත ඉදගෙන තෙ කොප්පයක් බොන්නකොට ආව සුවද සහ සිතල හුලග මාගේ හිත සන්සුන් කල. එකෙන් පස්සෙ මම පුන්චි පොතක් කියවන්න පටන් ගත්ත. එක පිටුවකින් එක පිටුවට යනකොට කාලය ගලා යනව වගෙ හෙගුන. ජිවිතයෙ ගොඩක් රහස් තියෙනව කියල තේරුන. එ සන්සුන්කම තමා මට ලැබුන ලොකුම දෙය.'
    }
  ];

  testCases.forEach(({ input, output }, index) => {
    test(`Positive_${index + 1}`, async ({ page }) => {
      await page.fill('textarea', input);
      await expect(page.locator('div.whitespace-pre-wrap').first())
        .toContainText(output);
    });
  });

});



