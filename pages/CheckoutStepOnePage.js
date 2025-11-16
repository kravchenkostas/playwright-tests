export class CheckoutStepOnePage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.codeInput = page.locator('[data-test="postalCode"]');
    this.continueCartButton = page.locator('[data-test="continue"]');
  }

  async fillUserInfo(firstName, lastName, code) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.codeInput.fill(code);
  }

  async pressContinue() {
    await this.continueCartButton.click();
  }
}
