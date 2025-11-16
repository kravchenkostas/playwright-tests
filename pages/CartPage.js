import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cart = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItemInCart = page.locator(
      '[data-test="inventory-item-name"]'
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async openCart() {
    const openCartButton = this.cart;

    await openCartButton.click();
  }

  async checkForOpenCartPage(text) {
    await expect(this.inventoryItemInCart).toHaveText(text);
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}
