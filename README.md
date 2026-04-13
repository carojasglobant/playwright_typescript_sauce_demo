# 🎭 Playwright TypeScript Sauce Demo

## 📋 Overview

This is a comprehensive test automation project that uses **Playwright with TypeScript** to test both web interfaces and APIs. The project is structured with the **Page Object Model (POM)** pattern and is configured to run tests against two main targets:

- **Sauce Demo** (e-commerce web application)
- **Swagger Petstore** (REST API)

## 🏗️ Project Architecture

```
playwright_typescript_sauce_demo/
├── pages/                    # Page Objects (POM)
│   ├── BasePage.ts          # Base class with common methods
│   ├── LoginPage.ts         # Login page Page Object
│   └── ProductsPage.ts      # Products page Page Object
├── tests/                   # Tests organized by type
│   ├── web/                 # Web interface tests
│   │   ├── login.spec.ts    # Login tests
│   │   └── products.spec.ts # Products tests
│   └── api/                 # API tests
│       └── user.spec.ts     # User API tests
├── playwright.config.ts     # Playwright configuration
├── package.json            # Project dependencies
├── API_TROUBLESHOOTING.md  # Troubleshooting documentation
└── README.md               # This documentation
```

## 🛠️ Configuration

### Playwright Config (`playwright.config.ts`)

The project is configured with **two main projects**:

#### 🌐 Web Project
- **Target**: Sauce Demo (https://www.saucedemo.com/)
- **Browser**: Chrome Desktop
- **Features**: Screenshots on failure, video on failure, trace on retry

#### 🔌 API Project  
- **Target**: Swagger Petstore (https://petstore3.swagger.io/api/v3/)
- **Features**: Lightweight configuration without browser

## 🎯 Available Tests

### 📱 Web Tests

#### 1. Login Tests (`login.spec.ts`)
- **"Correct Log in"**: Verifies successful login with valid credentials
- **"Incorret Log in"**: Verifies error handling with incorrect credentials

#### 2. Products Tests (`products.spec.ts`)
- **"Add first product to cart"**: Complete flow login → add product to cart

### 🔌 API Tests

#### User API Tests (`user.spec.ts`)
- **"User Login - Successful"**: User login test via API
- **"User Logout - Successful"**: User logout test via API  
- **"Get User by Username - Nonexistent User"**: Handling of non-existing users
- **"Create User - Simple Test"**: User creation with robust error handling

## 🧩 Patterns and Best Practices

### Page Object Model (POM)

#### 🏗️ BasePage.ts
```typescript
export class BasePage {
    // Reusable methods for all pages:
    // - goto(): Base navigation
    // - clickElement(): Click with visibility wait
    // - fillElement(): Fill inputs with wait
    // - isElementVisible(): Visibility validation
    // - doesTheElementContainsText(): Content validation
}
```

#### 🎭 LoginPage.ts
```typescript
export class LoginPage extends BasePage {
    // Locators: swaglabsLabel, usernameInput, passwordInput, loginButton, errorMessageLabel
    // Methods: performLogin() - encapsulates complete login flow
}
```

#### 🛍️ ProductsPage.ts  
```typescript
export class ProductsPage extends BasePage {
    // Locators: productsTitle, btnAddToCart, cart
    // Methods: validateProductsTitleIsVisible(), addFirstElement()
}
```

## 🚀 Usage Instructions

### 📦 Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers (first time only)
npx playwright install
```

### 🎬 Running Tests

```bash
# Run all tests
npx playwright test

# Run only web tests
npx playwright test --project=web

# Run only API tests
npx playwright test --project=api

# Run specific tests
npx playwright test tests/web/login.spec.ts
npx playwright test tests/api/user.spec.ts

# Run in debug mode (with visible browser)
npx playwright test --debug

# Run with specific configuration
npx playwright test --project=web --headed  # visible browser
npx playwright test --project=api --reporter=html  # HTML report
```

### 📊 Viewing Reports

```bash
# Open latest HTML report
npx playwright show-report

# Generate specific report
npx playwright test --reporter=html
npx playwright show-report report
```

### 🛠️ Development and Debugging

```bash
# Run specific test in debug mode
npx playwright test tests/web/login.spec.ts --debug

# Run with inspector mode
npx playwright test --debug

# Auto-record code
npx playwright codegen https://www.saucedemo.com/

# View detailed trace of failed test
npx playwright test --trace on
```

## 🔥 Key Features

### 🎯 Robust Configuration
- **Parallelization**: Tests executed in parallel for speed
- **Retries**: Retry configuration for CI/CD
- **Screenshots**: Automatic on failure
- **Video**: Recording on failure
- **Trace**: Detailed logging for debugging

### 🛡️ API Error Handling
API tests are designed to handle Swagger Petstore server instability:
- Accept alternative status codes (404, 500)
- Detailed response logging
- Robust structure that doesn't fail due to server issues

### 🎨 Clean and Maintainable Code
- **TypeScript**: Strong typing for better maintenance
- **POM**: Clear separation between business logic and locators
- **Reusable methods**: BasePage with common functionality
- **Descriptive names**: Tests and methods with clear names

## 🔧 Customization and Extension

### Adding New Web Tests

1. **Create new Page Object** (if needed):
```typescript
// pages/CheckoutPage.ts
export class CheckoutPage extends BasePage {
    readonly firstNameInput: Locator;
    // ... other locators
    
    constructor(page: Page) {
        super(page)
        // locator initialization
    }
    
    async fillCheckoutForm(firstName: string, lastName: string, zipCode: string) {
        // implementation
    }
}
```

2. **Create new test**:
```typescript
// tests/web/checkout.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('Complete checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    await loginPage.goto();
    await loginPage.performLogin('standard_user', 'secret_sauce');
    // ... checkout flow
});
```

### Adding New API Tests

```typescript
// tests/api/pet.spec.ts
import { test, expect } from '@playwright/test';

test('Create new pet', async ({ request }) => {
    const petData = {
        "name": "fluffy",
        "photoUrls": ["url1"],
        "status": "available"
    };
    
    const response = await request.post('pet', {
        data: petData
    });
    
    expect(response.status()).toBe(200);
    
    const pet = await response.json();
    expect(pet.name).toBe(petData.name);
});
```

## 🎓 Best Practices Implemented

### ✅ Clean Code
- Strong TypeScript typing throughout the project
- Descriptive method and variable names
- Clear separation of responsibilities

### ✅ Robust Tests
- Explicit vs implicit waits
- Error scenario handling
- Precise and relevant validations

### ✅ Maintainability  
- Reusable Page Objects
- Flexible configuration
- Clear documentation

### ✅ CI/CD Ready
- CI environment compatible configuration
- Multiple format reports
- Headless mode by default

---

**🎯 Summary**: This project is an excellent foundation for any team wanting to implement modern test automation with Playwright, TypeScript, and design best practices. The modular architecture allows easy extension to add more tests, pages, or functionality based on project needs.
