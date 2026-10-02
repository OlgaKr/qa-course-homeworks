import { test, expect } from '@playwright/test';
import { fillPaymentForm, submitPaymentForm } from './page-actions';

test.describe('Coffee-cart-css', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('should fill and validate checkout form fields after adding an item to cart', async ({
    page,
  }) => {
    const name = 'Olga';
    const email = 'olga@test.com';
    await fillPaymentForm(page, name, email);
    await expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue(
      'Olga',
    );
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(
      'olga@test.com',
    );
  });

  test('should successfully place order for Cappuccino and display purchase confirmation', async ({
    page,
  }) => {
    const name = 'Olga';
    const email = 'olga@test.com';

    await submitPaymentForm(page, name, email);
    await expect(
      page.getByRole('button', { name: 'Thanks for your purchase.' }),
    ).toBeVisible();
  });
});
