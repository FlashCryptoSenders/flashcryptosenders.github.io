module.exports = {
    ci: {
        collect: {
            url: ['https://flashusdtsender.xyz/'],
            numberOfRuns: 3,
            settings: {
                onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
                preset: 'desktop'
            }
        },
        upload: {
            target: 'temporary-public-storage'
        },
        assert: {
            assertions: {
                'categories:performance': ['error', {minScore: 0.9}],
                'categories:accessibility': ['error', {minScore: 0.9}],
                'categories:best-practices': ['error', {minScore: 0.9}],
                'categories:seo': ['error', {minScore: 0.9}],
                'categories:pwa': ['error', {minScore: 0.9}]
            }
        }
    }
};
