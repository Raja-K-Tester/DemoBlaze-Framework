import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { ProductPage } from "../pages/productPage";
import { CartPage } from "../pages/cartPage";
import loginData from "../data/loginData.json";

test("Demoblaze E2E Scenario", async ({ page }) => {

    await page.goto("https://www.demoblaze.com");

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.login(loginData.username, loginData.password);

    const user = await loginPage.getLoggedUser();
    console.log("Logged User:", user);

    // Navigate to laptops and next page
    await homePage.clickLaptops();
    await homePage.clickNext();

    // Get product info
    const productName = await homePage.getProductName();
    const price = await homePage.getProductPrice();

    console.log("Selected Product:", productName, price);

    // Open product details
    await homePage.clickProduct();

    const productTitle = await productPage.getProductTitle();

    // Verify product name matches
    expect(productTitle?.trim()).toBe(productName?.trim());

    // Add to cart
    await productPage.addToCart();

    // Open cart
    await cartPage.openCart();

    const cartProduct = await cartPage.getProductName();

    // Verify same product in cart
    expect(cartProduct?.trim()).toBe(productTitle?.trim());

    // Delete product
    await cartPage.deleteProduct();

    // Logout
    await page.click("#logout2");
});