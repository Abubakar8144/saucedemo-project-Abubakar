import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
const fixturesData = require("../fixtures/fixtures.json")

test.describe('Login Page Tests', () => {
    let pageManager: PageManager

    test.beforeEach(async ({ page }) => {
        pageManager = new PageManager(page)
        await pageManager.getLoginPage().visitDefaultUrl()
    })

    test('Successful login', async ({ page }) => {
        await pageManager.getLoginPage().login(fixturesData.valid_username, fixturesData.valid_password)
        await pageManager.getInventoryPage().validateCurrentUrl(page,fixturesData.inventoryURL)
    })

    test('Login with invalid credentials', async () => {
        await pageManager.getLoginPage().login(fixturesData.invalid_username, fixturesData.invalid_password)
        const errorMessage = await pageManager.getLoginPage().getErrorMessage()
        await expect(errorMessage).toContain(fixturesData.invalid_credentials_error_message)
    })

    test('Empty username error', async () => {
        await pageManager.getLoginPage().login('', fixturesData.valid_password)
        const errorMessage = await pageManager.getLoginPage().getErrorMessage()
        await expect(errorMessage).toContain(fixturesData.empty_username_error_message)
    })

    test('Empty password error', async () => {
        await pageManager.getLoginPage().login(fixturesData.valid_username, '')
        const errorMessage = await pageManager.getLoginPage().getErrorMessage()
        await expect(errorMessage).toContain(fixturesData.empty_password_error_message)
    })
});
