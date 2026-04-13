import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ProductsPage class represents the inventory/products page of the Sauce Demo application.
 * This class extends BasePage and provides specific methods and locators for interacting
 * with product listing, product selection, and shopping cart functionality.
 */
export class ProductsPage extends BasePage {
    readonly productsTitle: Locator;
    readonly btnAddToCart: Locator;
    readonly cart: Locator;
    readonly productSortDropdown: Locator;
    readonly productInventoryContainer: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;

    /**
     * Creates an instance of ProductsPage and initializes all page locators.
     * @param page - The Playwright Page object representing the browser tab
     */
    constructor(page: Page) {
        super(page)
        this.productsTitle = page.locator('[data-test="title"]');
        this.cart = page.locator('[data-test="shopping-cart-link"]');
        this.btnAddToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productInventoryContainer = page.locator('[data-test="inventory-container"]');
        this.productNames = page.locator('[data-test="inventory-item-name"]');
        this.productPrices = page.locator('[data-test="inventory-item-price"]');
    }

    /**
     * Validates that the "Products" title is visible on the page.
     * This method verifies that the products page has loaded successfully and displays the correct title.
     * 
     * @example
     * await productsPage.validateProductsTitleIsVisible();
     */
    async validateProductsTitleIsVisible() {
        await this.isElementVisible(this.productsTitle);
        await this.doesTheElementContainsText(this.productsTitle, 'Products')
    }

    /**
     * Adds the first product (Sauce Labs Backpack) to the shopping cart.
     * This method clicks the "Add to Cart" button for the first product in the inventory.
     * 
     * @example
     * await productsPage.addFirstElement();
     */
    async addFirstElement() {
        await this.clickElement(this.btnAddToCart)
    }

    /**
     * Validates that the shopping cart badge shows the correct item count.
     * This method asserts that the cart displays the expected number of items.
     * 
     * @param expectedCount - The expected number of items that should be in the cart
     * 
     * @example
     * await productsPage.validateCartItemCount('1');
     */
    async validateCartItemCount(expectedCount: string) {
        await this.doesTheElementContainsText(this.cart, expectedCount);
    }

    /**
     * Clicks on the shopping cart link to navigate to the cart page.
     * This method uses the base clickElement method to ensure robust interaction.
     * 
     * @example
     * await productsPage.clickOnCart();
     */
    async clickOnCart() {
        await this.clickElement(this.cart);
    }

    /**
     * Validates that the products inventory container is visible.
     * This method ensures that the product listing has loaded successfully.
     * 
     * @example
     * await productsPage.isProductInventoryVisible();
     */
    async isProductInventoryVisible() {
        await this.isElementVisible(this.productInventoryContainer);
    }

    /**
     * Gets the number of products currently displayed on the page.
     * This method counts all product items in the inventory container.
     * 
     * @returns The count of products displayed on the page
     * 
     * @example
     * const productCount = await productsPage.getProductCount();
     * console.log(`Found ${productCount} products`);
     */
    async getProductCount(): Promise<number> {
        return await this.productNames.count();
    }

    /**
     * Gets the name of a specific product by its index position.
     * 
     * @param index - The zero-based index of the product in the inventory list
     * @returns The name of the product at the specified index
     * 
     * @example
     * const firstProductName = await productsPage.getProductNameByIndex(0);
     * console.log('First product:', firstProductName);
     */
    async getProductNameByIndex(index: number): Promise<string> {
        const productElement = this.productNames.nth(index);
        return await productElement.textContent() || '';
    }

    /**
     * Gets the price of a specific product by its index position.
     * 
     * @param index - The zero-based index of the product in the inventory list
     * @returns The price of the product at the specified index (including $ symbol)
     * 
     * @example
     * const firstProductPrice = await productsPage.getProductPriceByIndex(0);
     * console.log('First product price:', firstProductPrice);
     */
    async getProductPriceByIndex(index: number): Promise<string> {
        const priceElement = this.productPrices.nth(index);
        return await priceElement.textContent() || '';
    }

    /**
     * Adds a specific product to the cart by its name.
     * This method finds the product by name and clicks its corresponding "Add to Cart" button.
     * 
     * @param productName - The name of the product to add to the cart
     * 
     * @example
     * await productsPage.addProductToCartByName('Sauce Labs Backpack');
     */
    async addProductToCartByName(productName: string) {
        // Find the product by name and then find its corresponding add to cart button
        const productLocator = this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName });
        const addToCartButton = productLocator.locator('..').locator('[data-test^="add-to-cart-"]');
        await this.clickElement(addToCartButton);
    }

    /**
     * Validates that a product with the specified name is visible in the inventory.
     * 
     * @param productName - The name of the product to validate
     * 
     * @example
     * await productsPage.isProductVisible('Sauce Labs Backpack');
     */
    async isProductVisible(productName: string) {
        const productLocator = this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName });
        await this.isElementVisible(productLocator);
    }

    /**
     * Sorts products by the specified option in the sort dropdown.
     * 
     * @param sortOption - The sorting option to select (e.g., 'Name (A to Z)', 'Price (low to high)')
     * 
     * @example
     * await productsPage.sortProducts('Price (low to high)');
     */
    async sortProducts(sortOption: string) {
        await this.clickElement(this.productSortDropdown);
        await this.page.locator(`option:has-text("${sortOption}")`).click();
    }

    /**
     * Validates that the sort dropdown is visible and interactive.
     * This method ensures that the sort functionality is available on the page.
     * 
     * @example
     * await productsPage.isSortDropdownVisible();
     */
    async isSortDropdownVisible() {
        await this.isElementVisible(this.productSortDropdown);
    }
}
