import { Locator, Page } from '@playwright/test'
import { BasePage } from './basePage'


export class CheckoutOverviewPage extends BasePage {
    readonly page: Page
    readonly finishButton: Locator
    readonly checkoutItemsName: Locator
    readonly totalPrice: Locator
    readonly cancelButton: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.finishButton = page.locator("#finish")
        this.checkoutItemsName = page.locator(".inventory_item_name")
        this.cancelButton = page.locator("#cancel")
        this.totalPrice = page.locator(".summary_subtotal_label")
    }

    async getTotalPrice() {
        const priceText = await this.totalPrice.textContent()
        const price = parseFloat(priceText?.replace('Item total: $', '') || '0');
        return price;
    }

}