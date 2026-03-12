import { Page,Locator } from "@playwright/test";
import { ElementActions } from "../wrappers/elementActions";

export class LoginPage {

    private elementActions = new ElementActions();
    loginLink:Locator;
    username:Locator;
    password:Locator;
    loginBtn:Locator;
    userLabel:Locator;
    constructor(private page: Page) {
        this.page=page; 
        this.loginLink = this.page.locator("#login2");
        this.username = this.page.locator("#loginusername");
        this.password = this.page.locator("#loginpassword");
        this.loginBtn = this.page.locator("button[onclick='logIn()']");
        this.userLabel = this.page.locator("#nameofuser");
    }

   

    async login(username: string, password: string) {

        await this.elementActions.click(this.loginLink);
        await this.elementActions.type(this.username, username);
        await this.elementActions.type(this.password, password);
        await this.elementActions.click(this.loginBtn);
    }

    async getLoggedUser() {
        return await this.elementActions.getText(this.userLabel);
    }
}