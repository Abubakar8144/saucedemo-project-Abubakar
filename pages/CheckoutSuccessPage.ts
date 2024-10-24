import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'


export class CheckoutSuccessPage extends BasePage {
    readonly page: Page
    readonly backToHomeButton: Locator
    readonly completeHeader: Locator
    readonly completeText: Locator
    readonly cartBadge: Locator
    

    constructor(page: Page) {
        super(page)
        this.page = page
        this.backToHomeButton = page.locator("#back-to-products")
        this.completeHeader = page.locator(".complete-header")
        this.completeText = page.locator(".complete-text")
        this.cartBadge = page.locator('.shopping_cart_link')
        
    }

}