import { Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'


export class CheckoutInfoPage extends BasePage {
    readonly page: Page
    readonly continueButton: Locator
    readonly cartItemName: Locator
    readonly firstNameField: Locator
    readonly lastNameField: Locator
    readonly postalCodeField: Locator
    readonly cancelButton: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.continueButton = page.locator("#continue")
        this.cartItemName = page.locator(".inventory_item_name")
        this.firstNameField = page.locator("#first-name")
        this.lastNameField = page.locator("#last-name")
        this.postalCodeField = page.locator("#postal-code")
        this.cancelButton = page.locator("#cancel")
    }

}