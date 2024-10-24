import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

const fixturesData = require("../fixtures/fixtures.json")

test.describe('Order Placement Tests', () => {
    let pageManager: PageManager

    test.beforeEach(async ({ page }) => {
        pageManager = new PageManager(page)
        await pageManager.getLoginPage().visitDefaultUrl()
        await pageManager.getLoginPage().login(fixturesData.valid_username, fixturesData.valid_password)
    });

    test('Place a successfull Order', async ({ page }) => {

        //Adding items to cart
        await pageManager.getInventoryPage().addToCart(0)
        await pageManager.getInventoryPage().addToCart(1)


        //Validating the number of items added in the cart
        const cartCount = await pageManager.getInventoryPage().getCartCount()
        expect(cartCount).toBe('2')


        //Fetching the item's names that are being added in cart from inventory page
        const inventoryItemName1 = await pageManager.getInventoryPage().getInventoryItemName(0)
        const inventoryItemName2 = await pageManager.getInventoryPage().getInventoryItemName(1)


        //Fetching the item's prices that are being added in cart
        const inventoryItemPrice1 = await pageManager.getInventoryPage().getInventoryItemPrice(0)
        const inventoryItemPrice2 = await pageManager.getInventoryPage().getInventoryItemPrice(1)

        //Calculating the total price of all the added items in the cart
        const totalInventoryItemsPrice = inventoryItemPrice1 + inventoryItemPrice2


        //Navigating to and validating Cart Page
        await pageManager.getInventoryPage().cartBadge.click()
        await pageManager.getCartPage().validateCurrentUrl(page, fixturesData.cartPageURL)


        //Fetching the item's names that are present on Cart page
        const cartItemName1 = await pageManager.getCartPage().getCartItemName(0)
        const cartItemName2 = await pageManager.getCartPage().getCartItemName(1)


        //Validating the item's names that are present on Cart page with the names that were added in inventory page
        await expect(inventoryItemName1).toBe(cartItemName1)
        await expect(inventoryItemName2).toBe(cartItemName2)


        //Navigating to and validating Checkout Info Page
        await pageManager.getCartPage().checkoutButton.click()
        await pageManager.getCheckoutInfoPage().validateCurrentUrl(page, fixturesData.checkoutInfoPageURL)


        //Filling the Checkout Info Form
        await pageManager.getCheckoutInfoPage().firstNameField.fill(fixturesData.first_name)
        await pageManager.getCheckoutInfoPage().lastNameField.fill(fixturesData.last_name)
        await pageManager.getCheckoutInfoPage().postalCodeField.fill(fixturesData.PostalCode)


        //Navigating to and validating Checkout Overview Page
        await pageManager.getCheckoutInfoPage().continueButton.click()
        await pageManager.getCheckoutOverviewPage().validateCurrentUrl(page, fixturesData.checkoutOverviewPageURL)


        //Validating the total price of all the added items in the cart with the calculated total price
        const totalPrice = await pageManager.getCheckoutOverviewPage().getTotalPrice()
        await expect(totalInventoryItemsPrice).toBe(totalPrice)


        //Finishing the order
        await pageManager.getCheckoutOverviewPage().finishButton.click()

        
        //Validating the checkout completion
        await pageManager.getCheckoutSuccessPage().validateCurrentUrl(page, fixturesData.checkoutCompletePageURL)
        await expect(pageManager.getCheckoutSuccessPage().completeHeader).toHaveText("Thank you for your order!")
        await expect(pageManager.getCheckoutSuccessPage().completeText).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")



    });



});
