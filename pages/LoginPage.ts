import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'


export class LoginPage extends BasePage {
    readonly page: Page
    readonly usernameField : Locator
    readonly passwordField : Locator
    readonly loginButton : Locator
    readonly errorMessage : Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.usernameField = page.locator("#user-name")
        this.passwordField = page.locator("#password")
        this.loginButton = page.locator("#login-button")
        this.errorMessage = page.locator("[data-test=\"error\"]")

    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }


    async getErrorMessage() {
        return await this.errorMessage.textContent()
    }
}
