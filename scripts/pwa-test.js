const puppeteer = require('puppeteer');

async function testPWA() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log('Testing PWA installation...');
    
    try {
        await page.goto('https://flashusdtsender.xyz');
        
        // Check manifest
        const manifest = await page.evaluate(() => {
            const link = document.querySelector('link[rel="manifest"]');
            return link ? fetch(link.href).then(r => r.json()) : null;
        });
        
        if (!manifest) throw new Error('Manifest not found');
        
        // Check service worker
        const swRegistration = await page.evaluate(() => {
            return navigator.serviceWorker.getRegistration()
                .then(registration => registration ? true : false);
        });
        
        if (!swRegistration) throw new Error('Service Worker not registered');
        
        // Check offline functionality
        await page.setOfflineMode(true);
        await page.reload();
        const offlineContent = await page.content();
        
        if (!offlineContent.includes('Flash USDT Sender')) {
            throw new Error('Offline functionality not working');
        }
        
        console.log('PWA tests passed successfully!');
    } catch (error) {
        console.error('PWA test failed:', error);
        process.exit(1);
    }
    
    await browser.close();
}

testPWA();
