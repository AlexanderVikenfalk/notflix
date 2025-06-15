import { test, expect } from '@playwright/test'

test.describe('Application', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await expect(page.getByRole('article')).toHaveCount(20)
    })

    test('should display the header and movie grid', async ({ page }) => {
        await expect(page.getByRole('banner')).toBeVisible()
        await expect(page.getByRole('link', { name: 'notflix' })).toBeVisible()
        await expect(page.getByRole('textbox', { name: 'Search' })).toBeVisible()

        await expect(page.getByRole('main')).toBeVisible()
        await expect(page.getByRole('list')).toBeVisible()
    })

    test('should display detailed movie info', async ({ page }) => {
        await page.getByRole('link', { name: 'Lilo & Stitch' }).first().click();

        await expect(page.getByRole('heading', { name: 'Lilo & Stitch' })).toBeVisible();
        await expect(page.getByText('Directed by Dean Fleischer')).toBeVisible();
        await expect(page.getByText('2025')).toBeVisible();
        await expect(page.getByText('The wildly funny and touching')).toBeVisible();
        await page.getByRole('img', { name: 'Lilo & Stitch' }).click();
        await expect(page.getByRole('link', { name: 'View on IMDb' })).toBeVisible();
    });

    test('should display searched movie', async ({ page }) => {
        const searchInput = page.getByRole('textbox', { name: 'Search' });
        await searchInput.click();
        await searchInput.type('lilo', { delay: 100 }); // Add slight delay between keystrokes
        
        await expect(page).toHaveURL(/\/search/);
        
        await expect(page.getByRole('heading', { name: 'Search Results' })).toBeVisible();
        await expect(page.getByText('results for "lilo"')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Lilo & Stitch' }).first()).toBeVisible();
    });

    test.describe('favorites functionality', () => {
        test.beforeEach(async ({ page }) => {
            await page.evaluate(() => localStorage.clear());
        });

        test('add to "my favorites" and remove again', async ({ page }) => {
            await page.goto('/');
            await page.getByRole('article').filter({ hasText: 'Until Dawn2025' }).getByLabel('Add to favorites').click();
            await page.getByRole('button', { name: 'Favorites', exact: true }).click();

            await expect(page.getByText('Until Dawn')).toBeVisible();
            await expect(page.getByRole('heading', { name: 'My Favorites' })).toBeVisible();
            await page.getByRole('button', { name: 'Remove from favorites' }).click();
            await expect(page.getByText('You haven’t added any')).toBeVisible();

        });
    });

    test('movie filters interaction', async ({ page }) => {
        const searchInput = page.getByRole('textbox', { name: 'Search' });
        await searchInput.click();
        await searchInput.type('mine', { delay: 100 });

        await expect(page.getByText('A Minecraft Movie')).toBeVisible();
        
        await page.locator('div').filter({ hasText: /^Filters$/ }).first().click();
        await page.getByLabel('Add Genre Filter').selectOption('Documentary');
        await page.getByRole('button', { name: 'Apply Filters' }).click();
        await expect(page.getByRole('heading', { name: 'No movies match your filters' })).toBeVisible();
        await page.getByRole('button', { name: 'Clear all filters' }).click();
        await expect(page.getByText('A Minecraft Movie')).toBeVisible();
    })

    test.describe('Search filters via direct URL', () => {
        test('should show 1 result for query only', async ({ page }) => {
            await page.goto('/search?page=1&q=lilo')
            const results = page.getByRole('article')
            await expect(results).toHaveCount(1)
        })

        test('should show 0 results for year range filter', async ({ page }) => {
            await page.goto('/search?page=1&q=lilo&yearFrom=2000&yearTo=2001')
            const results = page.getByRole('article')
            await expect(results).toHaveCount(0)
        })

        test('should show 0 results for incorrect genre filter', async ({ page }) => {
            await page.goto('/search?page=1&q=lilo&genres=Action')
            const results = page.getByRole('article')
            await expect(results).toHaveCount(0)
        })

        test('should show 0 results for low rating filter', async ({ page }) => {
            await page.goto('/search?page=1&q=lilo&ratingFrom=1&ratingTo=2')
            const results = page.getByRole('article')
            await expect(results).toHaveCount(0)
        })

        test('should show 1 result with full valid filter combination', async ({ page }) => {
            await page.goto('/search?page=1&q=lilo&genres=Comedy&yearFrom=2000&yearTo=2025&ratingFrom=7&ratingTo=8')
            const results = page.getByRole('article')
            await expect(results).toHaveCount(1)
        })
    })
}) 