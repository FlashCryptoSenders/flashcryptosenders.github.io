const sharp = require('sharp');
const fs = require('fs');

const sizes = {
    'mstile-70x70': 70,
    'mstile-144x144': 144,
    'mstile-150x150': 150,
    'mstile-310x150': { width: 310, height: 150 },
    'mstile-310x310': 310
};

async function generateTiles() {
    const source = fs.readFileSync('./assets/logo.svg');
    
    for (const [name, size] of Object.entries(sizes)) {
        const width = typeof size === 'object' ? size.width : size;
        const height = typeof size === 'object' ? size.height : size;
        
        await sharp(source)
            .resize(width, height)
            .toFile(`./assets/${name}.png`);
        
        console.log(`Generated ${name}.png`);
    }
}

generateTiles().catch(console.error);
