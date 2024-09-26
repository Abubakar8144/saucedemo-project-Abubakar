import { BasePage } from './basePage'

export class LoginPage extends BasePage {
    readonly usernameField = '#user-name'
    readonly passwordField = '#password'
    readonly loginButton = '#login-button'
    readonly errorMessage = '[data-test="error"]'

    async login(username: string, password: string) {
        await this.type(this.usernameField, username)
        await this.type(this.passwordField, password)
        await this.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(this.errorMessage)
    }
}
