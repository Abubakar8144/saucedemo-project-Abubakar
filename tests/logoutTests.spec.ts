import { test, expect } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
import { LoginPage } from '../pages/LoginPage'
const fixturesData = require("../fixtures/fixtures.json")

test.describe('Logout Tests', () => {
    let pageManager: PageManager
    let loginPage:LoginPage

    test.beforeEach(async ({ page }) => {
        pageManager = new PageManager(page)
        loginPage = new LoginPage(page)
        await pageManager.getLoginPage().visitDefaultUrl()
        await pageManager.getLoginPage().login(fixturesData.valid_username, fixturesData.valid_password)
    });

    test('Logout from inventory page', async ({ page }) => {
        // Ensure the user is on the inventory page
        await pageManager.getInventoryPage().validateCurrentUrl(page,fixturesData.inventoryURL)

        // Perform logout action
        await pageManager.getInventoryPage().logout()

        // Verify that user is redirected back to the login page
        await pageManager.getLoginPage().validateCurrentUrl(page, fixturesData.defaultURL)
   
        // Verify the login form elements appear after logout
        await expect(await loginPage.usernameField).toBeVisible()
        await expect(await loginPage.passwordField).toBeVisible()
        await expect(await loginPage.loginButton).toBeVisible()
        
    })

})