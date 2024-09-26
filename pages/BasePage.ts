import { expect, Page } from "@playwright/test"

export class BasePage {
    readonly page: Page


    constructor(page: Page) {
        this.page = page

    }


    async waitForNumberOfSeconds({ page }, timeInSeconds: number) {
        await page.waitForTimeout(timeInSeconds * 1000)
    }

    async waitForLoadState(page: Page) {
        await page.waitForLoadState('domcontentloaded')
        await page.waitForLoadState('load')
    }

    async validateCurrentUrl(page: Page, url: string) {
        await page.waitForURL(url)
        await expect.soft(page.url()).toContain(url)
    }

    async validateCurrentUrlWithLoadState(page: Page, url: string) {
        await this.waitForLoadState(page)
        await expect.soft(page.url()).toContain(url)
    }

    async visitDefaultUrl() {
        await this.page.goto("/")
    }

    async click(locator: string) {
        await this.page.click(locator)
    }

    async type(locator: string, text: string) {
        await this.page.fill(locator, text)
    }

    async navigateTo(url: string) {
        await this.page.goto(url)
    }

    async getTitle() {
        return await this.page.title()
    }

    async waitForElement(locator: string) {
        await this.page.waitForSelector(locator)
    }
}