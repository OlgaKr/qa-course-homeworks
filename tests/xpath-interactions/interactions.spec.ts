import { test, expect } from "@playwright/test";

test.describe("Sortable table", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("should increase selected count when rows are selected", async ({
    page,
  }) => {
    const searchByTagCheckbox = page.locator(
      "xpath=//tr[.//td[normalize-space()='Пошук за тегом']]//input[@type='checkbox']",
    );

    const selectedCount = page.locator(
      "xpath=//span[@data-testid='interactions-selected-count']",
    );

    const createArticleCheckbox = page.locator(
      "xpath=//tr[.//td[normalize-space()='Створення статті']]//input[@type='checkbox']",
    );

    await expect(selectedCount).toHaveText("Вибрано: 0");
    await searchByTagCheckbox.check();
    await expect(searchByTagCheckbox).toBeChecked();
    await expect(selectedCount).toHaveText("Вибрано: 1");
    await createArticleCheckbox.check();
    await expect(createArticleCheckbox).toBeChecked();
    await expect(selectedCount).toHaveText("Вибрано: 2");
  });

  test("should change row order when table is sorted", async ({ page }) => {
    const nameSortButton = page.locator(
      "xpath=//button[@data-testid='interactions-sort-name']",
    );

    const nameHeader = page.locator(
      "xpath=//th[.//button[@data-testid='interactions-sort-name']]",
    );

    await expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

    const testNames = page.locator(
      "xpath=//table[@data-testid='interactions-table']/tbody/tr/td[2]",
    );

    await expect(testNames.first()).toBeVisible();
    const namesBeforeSorting = await testNames.allTextContents();
    await nameSortButton.click();
    await expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    const namesAfterSorting = await testNames.allTextContents();
    expect(namesAfterSorting).toEqual([...namesBeforeSorting].reverse());
  });
});
