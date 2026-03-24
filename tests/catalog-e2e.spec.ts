import { test, expect } from '@playwright/test';

test.describe('Catalog Page E2E', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the catalog page
    await page.goto('/');
  });

  test('should load all products initially', async ({ page }) => {
    // Wait for the products list to be visible
    const productList = page.locator('ul.catalog__products li');

    // Wait until at least one product appears
    await page.waitForSelector('ul.catalog__products li');

    // Assert there is at least one product
    const count = await productList.count();
    expect(count).toBeGreaterThan(0);

    // Ensure loading spinner disappears
    const loading = page.locator('.catalog__is-loading');
    await expect(loading).toHaveCount(0);
  });

  test('should search for a jacket and filter by Mens category', async ({ page }) => {
    // Fill search bar
    const searchInput = page.locator('pe-search-bar input');
    await searchInput.waitFor({ state: 'visible', timeout: 30000 });
    await searchInput.fill('jacket');
    await searchInput.press('Enter');

    // Open the category dropdown using accessible role
    const categoryToggle = page.getByRole('button', { name: 'Filter by category: Select' });
    await categoryToggle.click();

    // Wait for the dropdown menu to appear
    const categoryMenu = page.locator('.dropdown-menu.show');
    await categoryMenu.waitFor({ state: 'visible', timeout: 30000 });

    // Click the correct option
    const mensOption = categoryMenu.getByRole('menuitemradio', { name: 'Mens Clothing', exact: true });
    await mensOption.click();

    // Wait for filtered products
    const productItems = page.locator('ul.catalog__products li >>> pe-product-card');
    await expect(productItems).toHaveCount(1);

    // Click view details
    const viewDetailsBtn = productItems.locator('text=View Details');
    await viewDetailsBtn.click();

    // Verify navigation
    await expect(page).toHaveURL(/\/product-details\/\d+/);
  });
});
