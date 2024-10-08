import { Locator, Page } from '@playwright/test'
import { BasePage } from './basePage'


export class CartPage extends BasePage {
    readonly page : Page
    readonly checkoutButton : Locator
    readonly cartItemName : Locator
    readonly removeButton : Locator
    readonly continueShoppingButton : Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.checkoutButton = page.locator("#checkout")
        this.cartItemName = page.locator(".inventory_item_name")
        this.removeButton = page.locator(".cart_button")
        this.continueShoppingButton = page.locator("#continue-shopping")

    }

    async getCartItemName(index: number) {
        return await this.cartItemName.nth(index).textContent()
    }

}