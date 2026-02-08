import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    
    }

    async goto() {
        await this.page.goto('/')
    }

    // Base method to click webelements
    async clickElement(locator : Locator) {
       await locator.waitFor({state:'visible'});
       await locator.click();
    }

    // Base method to fill text inside inputs
    async fillElement(locator : Locator, text: string) {
       await locator.waitFor({state:'visible'});
       await locator.fill(text);
    }

    // Base method to validate visibility 
    async isElementVisible(locator : Locator ) {
       await expect(locator).toBeVisible();
    }

      // Base method to validate text inside element
    async doesTheElementContainsText(locator : Locator, text: string ) {
       await expect(locator).toHaveText(text);
    }
}