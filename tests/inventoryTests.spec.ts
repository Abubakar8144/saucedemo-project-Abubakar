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

    test('Add single item to cart', async ({ page }) => {

        //Adding item to cart 
        await pageManager.getInventoryPage().addToCart(0)
        const cartCount = await pageManager.getInventoryPage().getCartCount()
        expect(cartCount).toBe('1')

        //Fetching the item's name that is being added in cart from inventory page
        const inventoryItemName1 = await pageManager.getInventoryPage().getInventoryItemName(0)


        //Navigating to and validating Cart Page
        await pageManager.getInventoryPage().cartBadge.click()
        await pageManager.getCartPage().validateCurrentUrl(page, fixturesData.cartPageURL)


        //Fetching the item's name that are present on Cart page
        const cartItemName1 = await pageManager.getCartPage().getCartItemName(0)

        //Validating the item's names that are present on Cart page with the names that were added in inventory page
        await expect(inventoryItemName1).toBe(cartItemName1)

    });


    test('Add multiple items to cart', async ({ page }) => {

        //Adding items to cart 
        await pageManager.getInventoryPage().addToCart(0)
        await pageManager.getInventoryPage().addToCart(1)
        const cartCount = await pageManager.getInventoryPage().getCartCount()
        expect(cartCount).toBe('2')

        //Fetching the item's names that are being added in cart from inventory page
        const inventoryItemName1 = await pageManager.getInventoryPage().getInventoryItemName(0)
        const inventoryItemName2 = await pageManager.getInventoryPage().getInventoryItemName(1)

        //Navigating to and validating Cart Page
        await pageManager.getInventoryPage().cartBadge.click()
        await pageManager.getCartPage().validateCurrentUrl(page, fixturesData.cartPageURL)


        //Fetching the item's names that are present on Cart page
        const cartItemName1 = await pageManager.getCartPage().getCartItemName(0)
        const cartItemName2 = await pageManager.getCartPage().getCartItemName(1)


        //Validating the item's names that are present on Cart page with the names that were added in inventory page
        await expect(inventoryItemName1).toBe(cartItemName1)
        await expect(inventoryItemName2).toBe(cartItemName2)

    });


});


