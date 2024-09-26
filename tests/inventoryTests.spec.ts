import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

test.describe('Inventory Page Tests', () => {
    let pageManager: PageManager;

    test.beforeEach(async ({ page }) => {
        pageManager = new PageManager(page);
        await pageManager.getLoginPage().navigateTo('https://www.saucedemo.com/');
        await pageManager.getLoginPage().login('standard_user', 'secret_sauce');
    });

    test('Check number of items in inventory', async () => {
        const itemCount = await pageManager.getInventoryPage().getItemCount();
        expect(itemCount).toBeGreaterThan(0);
    });

    test('Add first item to cart', async () => {
        await pageManager.getInventoryPage().addToCart(0);
        const cartCount = await pageManager.getInventoryPage().getCartCount();
        expect(cartCount).toBe('1');
    });

    test('Add multiple items to cart', async () => {
        await pageManager.getInventoryPage().addToCart(0);
        await pageManager.getInventoryPage().addToCart(1);
        const cartCount = await pageManager.getInventoryPage().getCartCount();
        expect(cartCount).toBe('2');
    });

    test('Check cart icon after adding an item', async () => {
        await pageManager.getInventoryPage().addToCart(0);
        const cartCount = await pageManager.getInventoryPage().getCartCount();
        expect(cartCount).toBe('1');
    });

    test('Verify title of the inventory page', async () => {
        const title = await pageManager.getInventoryPage().getTitle();
        expect(title).toBe('Swag Labs');
    });
});
