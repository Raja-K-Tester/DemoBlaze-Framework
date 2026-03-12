import { Locator } from "@playwright/test";

export class ElementActions {

    async click(locator: Locator) {
        await locator.click();
    }

    async type(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async getText(locator: Locator):Promise<string|null> {
       await locator.waitFor({ state: "visible" });
        return await locator.textContent();
    }

    async isVisible(locator: Locator) {
        return await locator.isVisible();
    }
}