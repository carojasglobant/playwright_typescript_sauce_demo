import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Correct Log in', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory.html/);
    const productsTitle = page.locator('.title');
    await expect(productsTitle).toHaveText('Products')
})

test('Incorret Log in', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('standard_user', 'incorret_sauce')
    await expect(loginPage.errorMessageLabel).toBeVisible();
})

test('Locked out user', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessageLabel).toBeVisible();
    const errorMessage = await loginPage.getErrorMessageText();
    await expect(errorMessage).toContain('Sorry, this user has been locked out.');
})