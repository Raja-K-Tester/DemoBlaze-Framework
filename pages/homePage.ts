import { Page, Locator } from "@playwright/test";
import { ElementActions } from "../wrappers/elementActions";

export class HomePage {

    private elementActions = new ElementActions();

    laptops: Locator;
    nextBtn: Locator;
    macbook: Locator;
    productPrice: Locator;

    constructor(private page: Page) {

        this.laptops = this.page.getByText("Laptops");
        this.nextBtn = this.page.locator("#next2");

        // Correct locator for MacBook product link
        this.macbook = this.page.locator(".card-title a", { hasText: "MacBook Pro" });

        this.productPrice = this.page.locator(".card-block h5").first();
    }

    async clickLaptops() {
        await this.elementActions.click(this.laptops);

        // wait for laptops to load
        await this.page.waitForSelector(".card-title a");
    }

    async clickNext() {
        await this.elementActions.click(this.nextBtn);

        // wait until next page loads MacBook
        await this.macbook.waitFor();
    }

    async getProductName() {
        return await this.macbook.textContent();
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    async clickProduct() {
        await this.elementActions.click(this.macbook);
    }
}