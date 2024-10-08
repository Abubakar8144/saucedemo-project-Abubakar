import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { InventoryPage } from './InventoryPage'
import { CheckoutInfoPage } from './checkoutInfoPage'
import { CartPage } from './cartPage'
import { CheckoutOverviewPage } from './CheckoutOverviewPage'
import { CheckoutSuccessPage } from './CheckoutSuccessPage'



export class PageManager {
    readonly page: Page
    readonly loginPage: LoginPage
    readonly inventoryPage: InventoryPage
    readonly cartPage: CartPage
    readonly checkoutInfoPage: CheckoutInfoPage
    readonly checkoutOverviewPage: CheckoutOverviewPage
    readonly checkoutSuccessPage: CheckoutSuccessPage 

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(page)
        this.inventoryPage = new InventoryPage(page)
        this.cartPage = new CartPage(page)
        this.checkoutInfoPage = new CheckoutInfoPage(page)
        this.checkoutOverviewPage = new CheckoutOverviewPage(page)
        this.checkoutSuccessPage = new CheckoutSuccessPage(page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getInventoryPage() {
        return this.inventoryPage
    }

    getCartPage() {
        return this.cartPage
    }

    getCheckoutInfoPage() {
        return this.checkoutInfoPage
    }

    getCheckoutOverviewPage() {
        return this.checkoutOverviewPage
    }

    getCheckoutSuccessPage() {
        return this.checkoutSuccessPage
    }


}
