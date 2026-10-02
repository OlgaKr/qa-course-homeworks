import type { Page } from '@playwright/test';

export async function fillPaymentForm(page: Page, name: string, email: string) {
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
}

export async function submitPaymentForm(
  page: Page,
  name: string,
  email: string,
) {
  fillPaymentForm(page, name, email);
  await page.getByRole('button', { name: 'Submit' }).click();
}
