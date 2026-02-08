import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Add first product to cart', async({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    await loginPage.goto();
    await loginPage.performLogin('standard_user', 'secret_sauce')
    await expect(page).toHaveURL(/inventory.html/);
    await productsPage.validateProductsTitleIsVisible();
    await productsPage.addFirstElement();
    await expect(productsPage.cart).toHaveText("1");
})

