import { test, expect } from "@playwright/test";

test.describe("Coffee-cart-css", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should update total after adding a drink", async ({ page }) => {
    await page.locator('[data-test="Cappuccino"]').click();

    await expect(page.locator('[data-test="checkout"]')).toContainText(
      "Total: $19.00",
    );
  });

  test("should display correct total after adding two drinks", async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Espresso"]').click();

    await expect(page.locator('[data-test="checkout"]')).toContainText(
      "Total: $29.00",
    );
  });

  test("should fill and validate checkout form fields after adding an item to cart", async ({
    page,
  }) => {
    await page.locator('[data-test="Espresso_Con Panna"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator("#name").fill("Olga");
    await page.locator("#email").fill("olga@test.com");

    await expect(page.locator("#name")).toHaveValue("Olga");
    await expect(page.locator("#email")).toHaveValue("olga@test.com");
  });

  test("should successfully place order for Cappuccino and display purchase confirmation", async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator("#name").fill("Olga");
    await page.locator("#email").fill("olga@test.com");
    await page.locator("#submit-payment").click();

    await expect(page.locator(".snackbar.success")).toBeVisible();
  });

  test("should display Cappuccino in cart after adding it from menu", async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[href="/cart"]').click();

    const product = page.locator(
      '.list-item:has([aria-label="Remove all Cappuccino"])',
    );

    await expect(product).toContainText("Cappuccino");
  });
});
