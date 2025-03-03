const fs = require('fs');
const path = require('path');

function validatePWA() {
    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
    const required = ['name', 'short_name', 'start_url', 'display', 'icons'];
    
    const errors = [];
    
    required.forEach(field => {
        if (!manifest[field]) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    if (manifest.icons) {
        const requiredSizes = ['192x192', '512x512'];
        const sizes = manifest.icons.map(icon => icon.sizes);
        
        requiredSizes.forEach(size => {
            if (!sizes.includes(size)) {
                errors.push(`Missing icon size: ${size}`);
            }
        });
    }

    return errors;
}

const errors = validatePWA();
if (errors.length > 0) {
    console.error('PWA Validation Errors:', errors);
    process.exit(1);
} else {
    console.log('PWA validation passed');
}
