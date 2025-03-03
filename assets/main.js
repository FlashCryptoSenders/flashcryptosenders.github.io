document.addEventListener('DOMContentLoaded', function() {
    // Initialize dynamic elements
    initializeAnimations();
    setupIndexNow();
    loadSchemaData();
    setupScrollEffects();
});

function initializeAnimations() {
    const features = document.querySelectorAll('.feature');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(feature);
    });
}

function setupIndexNow() {
    const submitButton = document.getElementById('submitIndexNow');
    if (!submitButton) return;

    submitButton.addEventListener('click', async () => {
        try {
            const response = await submitToIndexNow();
            displayIndexNowResponse(response);
        } catch (error) {
            console.error('IndexNow submission failed:', error);
            displayIndexNowResponse({ error: error.message });
        }
    });
}

async function submitToIndexNow() {
    const payload = {
        host: window.location.hostname,
        key: '4ed2c320c1d446c29683245ed9830748',
        urlList: [
            `${window.location.origin}/`,
            `${window.location.origin}/features`,
            `${window.location.origin}/pricing`
        ]
    };

    const response = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    return response.json();
}

function displayIndexNowResponse(response) {
    const responseElement = document.getElementById('indexNowResponse');
    if (responseElement) {
        responseElement.textContent = JSON.stringify(response, null, 2);
    }
}

async function loadSchemaData() {
    try {
        const response = await fetch('/schema.json');
        const schema = await response.json();
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    } catch (error) {
        console.error('Failed to load schema data:', error);
    }
}

function setupScrollEffects() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Error handling and logging
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ', msg, '\nURL: ', url, '\nLine: ', lineNo, '\nColumn: ', columnNo, '\nError object: ', error);
    return false;
};

// Performance monitoring
if (window.performance) {
    const timing = window.performance.timing;
    window.addEventListener('load', () => {
        console.log('Page load time:', timing.loadEventEnd - timing.navigationStart + 'ms');
    });
}
