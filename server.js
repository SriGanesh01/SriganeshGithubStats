const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3001;

app.get('/screenshot', async (req, res) => {
	try {
		const browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		const page = await browser.newPage();

		// Replace with the URL where your React app is running
		await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

		// Optional: Wait for the component to render by checking for an element
		await page.waitForSelector('h1'); // e.g., the header in HeroHome

		// Screenshot only the HeroHome component (adjust selector as needed)
		const element = await page.$('div.w-[500px]');
		const screenshot = await element.screenshot({ type: 'png' });

		await browser.close();

		res.set('Content-Type', 'image/png');
		res.send(screenshot);
	} catch (error) {
		console.error('Error taking screenshot:', error);
		res.status(500).send('Error generating image');
	}
});

app.listen(PORT, () => {
	console.log(`Screenshot API running on http://localhost:${PORT}`);
});
