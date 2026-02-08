import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    readonly productsTitle: Locator;
    readonly btnAddToCart: Locator;
    readonly cart: Locator;

    constructor(page: Page) {
        super(page)
        this.productsTitle = page.locator('[data-test="title"]');
        this.cart = page.locator('[data-test="shopping-cart-link"]');
        this.btnAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    }

    async validateProductsTitleIsVisible() {
        this.isElementVisible(this.productsTitle);
        this.doesTheElementContainsText(this.productsTitle, 'Products')
    }

    async addFirstElement() {
        this.clickElement(this.btnAddToCart)
    }
}