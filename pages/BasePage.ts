import { expect, type Locator, type Page } from '@playwright/test';

/**
 * BasePage class provides common methods and properties that are shared across all page objects.
 * This class implements the Page Object Model pattern and serves as the foundation for all
 * specific page classes in the test automation framework.
 */
export class BasePage {
    readonly page: Page;

    /**
     * Creates an instance of BasePage.
     * @param page - The Playwright Page object representing the browser tab
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to the base URL of the application.
     * This method uses the base URL configured in playwright.config.ts and navigates to the root path.
     * 
     * @example
     * await basePage.goto();
     */
    async goto() {
        await this.page.goto('/')
    }

    /**
     * Clicks on a web element after ensuring it's visible.
     * This method waits for the element to be in a visible state before performing the click action,
     * providing a robust way to interact with elements that might need time to load.
     * 
     * @param locator - The Playwright Locator representing the element to click
     * 
     * @example
     * await basePage.clickElement(page.locator('[data-test="login-button"]'));
     */
    async clickElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    /**
     * Fills a text input field with the specified text.
     * This method waits for the element to be visible before attempting to fill it,
     * ensuring the input is ready for interaction.
     * 
     * @param locator - The Playwright Locator representing the input element to fill
     * @param text - The text string to enter into the input field
     * 
     * @example
     * await basePage.fillElement(page.locator('[data-test="username"]'), 'standard_user');
     */
    async fillElement(locator: Locator, text: string) {
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }

    /**
     * Validates that a web element is visible on the page.
     * This method asserts that the element is visible, throwing an error if it's not found
     * or not visible. Useful for verifying that page elements have loaded correctly.
     * 
     * @param locator - The Playwright Locator representing the element to validate
     * 
     * @throws Error if the element is not visible
     * 
     * @example
     * await basePage.isElementVisible(page.locator('.title'));
     */
    async isElementVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    /**
     * Validates that an element contains the expected text.
     * This method asserts that the element's text content exactly matches the expected text,
     * providing precise validation of element content.
     * 
     * @param locator - The Playwright Locator representing the element to validate
     * @param text - The expected text content that should be present in the element
     * 
     * @throws Error if the element does not contain the expected text
     * 
     * @example
     * await basePage.doesTheElementContainsText(page.locator('.title'), 'Products');
     */
    async doesTheElementContainsText(locator: Locator, text: string) {
        await expect(locator).toHaveText(text);
    }
}
