import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly swaglabsLabel: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessageLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.swaglabsLabel = page.getByText('Swag Labs');
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessageLabel = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('/')
    }

    async performLogin(user: string, password: string) {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}