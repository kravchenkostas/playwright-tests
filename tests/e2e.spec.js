import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test("@ui Авторизация пользователя ", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");
  await loginPage.loginSuccesfully();

  await productPage.sortByPrice();
  await productPage.addMostExpensiveItemToCart();

  await cartPage.openCart();
  await cartPage.checkForOpenCartPage("Sauce Labs Fleece Jacket");
  await cartPage.startCheckout();

  await checkoutStepOnePage.fillUserInfo("Test", "User", "12345");
  await checkoutStepOnePage.pressContinue();

  await checkoutStepTwoPage.finishCheckout();

  await checkoutCompletePage.getCompletionMessage("Thank you for your order!");
});
