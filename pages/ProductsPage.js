export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.selectDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator(".inventory_item");
  }

  async sortByPrice() {
    await this.selectDropdown.waitFor();
    await this.selectDropdown.selectOption("hilo");
  }

  async addMostExpensiveItemToCart() {
    const firstItem = this.inventoryItems.first();
    const addToCartButton = firstItem.locator("button");

    await addToCartButton.click();
  }
}
