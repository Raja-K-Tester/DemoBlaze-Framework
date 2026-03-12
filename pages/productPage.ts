import { Page,Locator } from "@playwright/test";
import { ElementActions } from "../wrappers/elementActions";

export class ProductPage {

    private elementActions = new ElementActions();
    productTitle:Locator;
    addToCartBtn:Locator;

    constructor(private page: Page) {
    this.page=page;    
    this.productTitle = this.page.locator(".name");
    this.addToCartBtn = this.page.locator("text=Add to cart");
    }


    async getProductTitle() {
        return await this.elementActions.getText(this.productTitle);
    }

    async addToCart() {

        this.page.once("dialog", dialog => dialog.accept());

        await this.elementActions.click(this.addToCartBtn);
    }
}