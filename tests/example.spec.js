// @ts-check

const { test, expect } = require('@playwright/test');

test.use({ browserName: 'chromium' });

test('Testar login', async ({ page }) => {
  // ── 1. Navegar ────────────────────────────────────────────────────────────
  await page.goto('https://www.saucedemo.com/');

  // ── 2. Login ──────────────────────────────────────────────────────────────
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // ── 3. Confirmar login ────────────────────────────────────────────────────
  await expect(page).toHaveURL(/inventory/);
  console.log('✅ Login realizado com sucesso');
});