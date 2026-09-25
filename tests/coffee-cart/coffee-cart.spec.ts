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
    await page.getByRole("textbox", { name: "Name" }).fill("Olga");
    await page.getByRole("textbox", { name: "Email" }).fill("olga@test.com");
    await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue(
      "Olga",
    );
    await expect(page.getByRole("textbox", { name: "Email" })).toHaveValue(
      "olga@test.com",
    );
  });

  test("should successfully place order for Cappuccino and display purchase confirmation", async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole("textbox", { name: "Name" }).fill("Olga");
    await page.getByRole("textbox", { name: "Email" }).fill("olga@test.com");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByRole("button", { name: "Thanks for your purchase." }),
    ).toBeVisible();
  });

  test("should display Cappuccino in cart after adding it from menu", async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(
      page.locator("div").filter({ hasText: /^Cappuccino$/ }),
    ).toBeVisible();
  });
});
