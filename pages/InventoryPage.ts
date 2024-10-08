import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './basePage'

export class InventoryPage extends BasePage {
    readonly page:Page
    readonly addToCartButtons : Locator
    readonly cartBadge : Locator
    readonly burgerMenuButton : Locator
    readonly logoutButton : Locator
    readonly resetAppStateButton: Locator
    readonly inventoryItemName : Locator
    readonly inventoryItemPrice : Locator
    readonly removeFromInventoryButtons : Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.addToCartButtons = page.locator(".btn_inventory")
        this.cartBadge = page.locator('.shopping_cart_link')
        this.burgerMenuButton = page.locator("#react-burger-menu-btn")
        this.logoutButton = page.locator("#logout_sidebar_link")
        this.resetAppStateButton = page.locator("#reset_sidebar_link")
        this.inventoryItemName = page.locator('.inventory_item_name')
        this.inventoryItemPrice = page.locator('.inventory_item_price')
        this.removeFromInventoryButtons = page.locator('.btn_secondary')
    }

    // async getItemCount() {
    //     return await this.inventoryItems.count()
    // }

    async addToCart(index: number) {
        await this.addToCartButtons.nth(index).click()
        await expect(this.addToCartButtons.nth(index)).toHaveText('Remove')
    }

    async getInventoryItemName(index: number) {
        return await this.inventoryItemName.nth(index).textContent()
    }

    async getInventoryItemPrice(index: number) {
        const priceText = await this.inventoryItemPrice.nth(index).textContent()
        const price = parseFloat(priceText?.replace('$', '') || '0');
        return price;
    }

    async getCartCount() {
        return await this.cartBadge.textContent()
    }
    
    async openMenu(){
        await this.burgerMenuButton.click()
    }

    async logout(){
        await this.openMenu()
        await this.logoutButton.click()
    }

    async resetAppState(){
        await this.openMenu()
        await this.resetAppStateButton.click()
    }
}
