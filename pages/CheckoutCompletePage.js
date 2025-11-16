import { expect } from "@playwright/test";

export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeTextMessage = page.locator('[data-test="complete-header"]');
  }
  async getCompletionMessage(text) {
    await expect(this.completeTextMessage).toHaveText(text);
  }
}
