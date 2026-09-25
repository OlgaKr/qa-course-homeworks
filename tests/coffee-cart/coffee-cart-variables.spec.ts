import { test, expect } from "@playwright/test";

const customerName = "Olga";
const customerEmail = "olga@test.com";

test.describe("Coffee-cart-css", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should update total after adding a drink", async ({ page }) => {
    const cappuccino = page.locator('[data-test="Cappuccino"]');
    const checkout = page.locator('[data-test="checkout"]');

    await cappuccino.click();
    await expect(checkout).toContainText("Total: $19.00");
  });

  test("should display correct total after adding two drinks", async ({
    page,
  }) => {
    const cappuccino = page.locator('[data-test="Cappuccino"]');
    const espresso = page.locator('[data-test="Espresso"]');
    const checkout = page.locator('[data-test="checkout"]');

    await cappuccino.click();
    await espresso.click();

    await expect(checkout).toContainText("Total: $29.00");
  });

  test("should fill and validate checkout form fields after adding an item to cart", async ({
    page,
  }) => {
    const checkout = page.locator('[data-test="checkout"]');
    const conPanna = page.locator('[data-test="Espresso_Con Panna"]');
    const name = page.getByRole("textbox", { name: "Name" });
    const email = page.getByRole("textbox", { name: "Email" });

    await conPanna.click();
    await checkout.click();

    await name.fill(customerName);
    await email.fill(customerEmail);
    await expect(name).toHaveValue(customerName);
    await expect(email).toHaveValue(customerEmail);
  });

  test("should successfully place order for Cappuccino and display purchase confirmation", async ({
    page,
  }) => {
    const cappuccino = page.locator('[data-test="Cappuccino"]');
    const checkout = page.locator('[data-test="checkout"]');
    const name = page.getByRole("textbox", { name: "Name" });
    const email = page.getByRole("textbox", { name: "Email" });
    const submit = page.getByRole("button", { name: "Submit" });
    const thanks = page.getByRole("button", {
      name: "Thanks for your purchase.",
    });

    await cappuccino.click();
    await checkout.click();
    await name.fill(customerName);
    await email.fill(customerEmail);
    await submit.click();

    await expect(thanks).toBeVisible();
  });

  test("should display Cappuccino in cart after adding it from menu", async ({
    page,
  }) => {
    const cappuccino = page.locator('[data-test="Cappuccino"]');
    const cartPage = page.getByRole("link", { name: "Cart page" });
    const cappuccinoInCart = page
      .locator("div")
      .filter({ hasText: /^Cappuccino$/ });

    await cappuccino.click();
    await cartPage.click();

    await expect(cappuccinoInCart).toBeVisible();
  });
});
