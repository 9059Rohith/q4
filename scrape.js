const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=0',
  'https://sanand0.github.io/tdsdata/js_table/?seed=1',
  'https://sanand0.github.io/tdsdata/js_table/?seed=2',
  'https://sanand0.github.io/tdsdata/js_table/?seed=3',
  'https://sanand0.github.io/tdsdata/js_table/?seed=4',
  'https://sanand0.github.io/tdsdata/js_table/?seed=5',
  'https://sanand0.github.io/tdsdata/js_table/?seed=6',
  'https://sanand0.github.io/tdsdata/js_table/?seed=7',
  'https://sanand0.github.io/tdsdata/js_table/?seed=8',
  'https://sanand0.github.io/tdsdata/js_table/?seed=9',
];

(async () => {
  const browser = await chromium.launch();
  let grandTotal = 0;

  for (const url of urls) {
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for the table to be rendered by JavaScript
    await page.waitForSelector('table', { timeout: 15000 });

    const numbers = await page.$$eval('table td', cells =>
      cells
        .map(cell => parseFloat(cell.innerText.replace(/,/g, '').trim()))
        .filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${urls.indexOf(url)} | URL: ${url} | Numbers found: ${numbers.length} | Sum: ${pageSum}`);
    grandTotal += pageSum;

    await page.close();
  }

  await browser.close();
  
  console.log('');
  console.log('========================================');
  console.log(`TOTAL SUM OF ALL NUMBERS: ${grandTotal}`);
  console.log('========================================');
})();
