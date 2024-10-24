import { expect, Page } from "@playwright/test"

export class BasePage {
    readonly page: Page


    static super() {
        throw new Error("Method not implemented.");
    }
    constructor(page: Page) {
        this.page = page

    }


    async validateCurrentUrl(page: Page, url: string) {
        await page.waitForURL(url)
        await expect(page).toHaveURL(url)
    }


    async visitDefaultUrl() {
        await this.page.goto("/")
    }


    async navigateTo(url: string) {
        await this.page.goto(url)
    }

}