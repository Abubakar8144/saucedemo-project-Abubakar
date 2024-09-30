import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
const fixturesData = require("../fixtures/fixtures.json")

test.describe('Reset app state tests', () => {
    let pageManager: PageManager

    test.beforeEach(async ({ page }) => {
        pageManager = new PageManager(page)
        await pageManager.getLoginPage().visitDefaultUrl()
        await pageManager.getLoginPage().login(fixturesData.valid_username, fixturesData.valid_password)
    });

    test('Reset app state after adding items in cart', async () => {

        //Adding items to the inventory
        await pageManager.getInventoryPage().addToCart(0)
        await pageManager.getInventoryPage().addToCart(1)
        await pageManager.getInventoryPage().addToCart(2)

        //Validating the number of items added in the cart 
        const cartCount = await pageManager.getInventoryPage().getCartCount()
        expect(cartCount).toBe('3')

        //Re-setting app state
        await pageManager.getInventoryPage().resetAppState()

        //Validating the number of items added in the cart 
        const cartCountAfterReset = await pageManager.getInventoryPage().getCartCount()
        expect(cartCountAfterReset).toBe('')


    });


});
