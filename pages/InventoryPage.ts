import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './basePage'

export class InventoryPage extends BasePage {
    readonly page:Page
    //readonly inventoryItems : Locator
    readonly addToCartButtons : Locator
    readonly cartBadge : Locator
    readonly burgerMenuButton : Locator
    readonly logoutButton : Locator
    readonly resetAppStateButton: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        //this.inventoryItems = page.locator('.inventory_item')
        this.addToCartButtons = page.locator(".btn_inventory")
        this.cartBadge = page.locator('.shopping_cart_link')
        this.burgerMenuButton = page.locator("#react-burger-menu-btn")
        this.logoutButton = page.locator("#logout_sidebar_link")
        this.resetAppStateButton = page.locator("#reset_sidebar_link")
    }

    // async getItemCount() {
    //     return await this.inventoryItems.count()
    // }

    async addToCart(index: number) {
        await this.addToCartButtons.nth(index).click()
        await expect(this.addToCartButtons.nth(index)).toHaveText('Remove')
    }

    async getCartCount() {
        return await this.cartBadge.textContent()
        //return await this.cartBadge.count() ? await this.cartBadge.textContent() : '0'
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
