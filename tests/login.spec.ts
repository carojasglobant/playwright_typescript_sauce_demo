import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Correct Log in', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performLogin('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory.html/);
    const productsTitle = page.locator('.title');
    await expect(productsTitle).toHaveText('Products')
})