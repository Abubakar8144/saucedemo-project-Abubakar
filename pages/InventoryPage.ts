import { BasePage } from './basePage'

export class InventoryPage extends BasePage {
    readonly inventoryItems = '.inventory_item'
    readonly addToCartButtons = '[data-test^="add-to-cart"]'
    readonly cartBadge = '.shopping_cart_badge'

    async getItemCount() {
        return await this.page.locator(this.inventoryItems).count()
    }

    async addToCart(index: number) {
        const buttons = this.page.locator(this.addToCartButtons)
        await buttons.nth(index).click()
    }

    async getCartCount() {
        const badge = await this.page.locator(this.cartBadge)
        return await badge.count() ? await badge.textContent() : '0'
    }
}
