import { Page, Locator } from "@playwright/test";
import { ElementActions } from "../wrappers/elementActions";

export class CartPage {

    private elementActions = new ElementActions();

    cartBtn: Locator;
    productName: Locator;
    deleteLink: Locator;

    constructor(private page: Page){

        this.cartBtn = this.page.locator("#cartur");
        this.productName = this.page.locator("#tbodyid td:nth-child(2)");
        this.deleteLink = this.page.getByRole("link", { name: "Delete" });
    }

    async openCart(){
        await this.elementActions.click(this.cartBtn);
        await this.page.waitForSelector("#tbodyid");
    }

    async getProductName(){
        await this.page.waitForSelector("#tbodyid tr");
        return await this.elementActions.getText(this.productName);
    }

    async deleteProduct(){
        await this.elementActions.click(this.deleteLink);
    }
}