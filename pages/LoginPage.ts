import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage class represents the login page of the Sauce Demo application.
 * This class extends BasePage and provides specific methods and locators for interacting
 * with login functionality including username/password input and authentication.
 */
export class LoginPage extends BasePage {
    readonly swaglabsLabel: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessageLabel: Locator;

    /**
     * Creates an instance of LoginPage and initializes all page locators.
     * @param page - The Playwright Page object representing the browser tab
     */
    constructor(page: Page) {
        super(page)
        this.swaglabsLabel = page.getByText('Swag Labs');
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessageLabel = page.locator('[data-test="error"]');
    }

    /**
     * Navigates to the login page of the application.
     * This method overrides the base goto() method to specifically navigate to the login page,
     * using the configured base URL from playwright.config.ts.
     * 
     * @example
     * await loginPage.goto();
     */
    async goto() {
        await this.page.goto('/')
    }

    /**
     * Performs the complete login flow by entering credentials and clicking the login button.
     * This method uses the base class methods to ensure robust interaction with the login form elements.
     * 
     * @param user - The username to enter in the username input field
     * @param password - The password to enter in the password input field
     * 
     * @example
     * await loginPage.performLogin('standard_user', 'secret_sauce');
     * 
     * @example
     * // Example with invalid credentials (will show error message)
     * await loginPage.performLogin('invalid_user', 'wrong_password');
     */
    async performLogin(user: string, password: string) {
        await this.fillElement(this.usernameInput, user);
        await this.fillElement(this.passwordInput, password);
        await this.clickElement(this.loginButton)
    }

    /**
     * Validates that the Swag Labs header label is visible on the page.
     * This method can be used to verify that the login page has loaded successfully.
     * 
     * @example
     * await loginPage.isSwagLabsLabelVisible();
     */
    async isSwagLabsLabelVisible() {
        await this.isElementVisible(this.swaglabsLabel);
    }

    /**
     * Validates that the error message is displayed on the login page.
     * This method is useful for testing scenarios where invalid credentials are provided.
     * 
     * @example
     * await loginPage.performLogin('invalid_user', 'wrong_password');
     * await loginPage.isErrorMessageVisible();
     */
    async isErrorMessageVisible() {
        await this.isElementVisible(this.errorMessageLabel);
    }

    /**
     * Gets the text content of the error message.
     * This method can be used to validate specific error messages for different scenarios.
     * 
     * @returns The text content of the error message element
     * 
     * @example
     * await loginPage.performLogin('invalid_user', 'wrong_password');
     * const errorMessage = await loginPage.getErrorMessageText();
     * console.log('Error message:', errorMessage);
     */
    async getErrorMessageText(): Promise<string> {
        return await this.errorMessageLabel.textContent() || '';
    }

    /**
     * Validates that the username input field is visible and ready for interaction.
     * This method can be used to verify that the login form is properly loaded.
     * 
     * @example
     * await loginPage.isUsernameInputVisible();
     */
    async isUsernameInputVisible() {
        await this.isElementVisible(this.usernameInput);
    }

    /**
     * Validates that the password input field is visible and ready for interaction.
     * This method can be used to verify that the login form is properly loaded.
     * 
     * @example
     * await loginPage.isPasswordInputVisible();
     */
    async isPasswordInputVisible() {
        await this.isElementVisible(this.passwordInput);
    }

    /**
     * Validates that the login button is visible and clickable.
     * This method can be used to verify that the login form is properly loaded.
     * 
     * @example
     * await loginPage.isLoginButtonVisible();
     */
    async isLoginButtonVisible() {
        await this.isElementVisible(this.loginButton);
    }
}
