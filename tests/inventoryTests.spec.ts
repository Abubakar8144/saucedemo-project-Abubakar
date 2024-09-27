import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
const fixturesData = require("../fixtures/fixtures.json")

test.describe('Inventory Page Tests', () => {
    let pageManager: PageManager

    test.beforeEach(async ({ page }) => {
        pageManager = new PageManager(page)
        await pageManager.getLoginPage().visitDefaultUrl()
        await pageManager.getLoginPage().login(fixturesData.valid_username, fixturesData.valid_password)
    });

    test('Add multiple items to cart', async () => {
        await pageManager.getInventoryPage().addToCart(0)
        await pageManager.getInventoryPage().addToCart(1)
        const cartCount = await pageManager.getInventoryPage().getCartCount()
        expect(cartCount).toBe('2')
    });

    // test('Remove items from cart', async () => {
    //     await pageManager.getInventoryPage().addToCart(0)
    //     await pageManager.getInventoryPage().addToCart(1)
    //     const cartCount = await pageManager.getInventoryPage().getCartCount()
    //     expect(cartCount).toBe('2')
    //     await pageManager.getInventoryPage().addToCart(0)
    //     await pageManager.getInventoryPage().addToCart(1)
    //     expect(cartCount).toBe('')
        
    // });


});
