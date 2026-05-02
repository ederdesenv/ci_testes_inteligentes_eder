// @ts-check

const { test, expect } = require('@playwright/test');

test.use({ browserName: 'chromium' });

test('Logar e adicionar o produto mais barato ao carrinho', async ({ page }) => {
  // ── 1. Navegar ────────────────────────────────────────────────────────────
  await page.goto('https://www.saucedemo.com/');

  // ── 2. Login ──────────────────────────────────────────────────────────────
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // ── 3. Confirmar login ────────────────────────────────────────────────────
  await expect(page).toHaveURL(/inventory/);
  console.log('✅ Login realizado com sucesso');

  // ── 4. Ler preços e nomes ─────────────────────────────────────────────────
  const priceLocator = page.locator('.inventory_item_price');
  const nameLocator  = page.locator('.inventory_item_name');
  await expect(priceLocator.first()).toBeVisible();

  const rawPrices = await priceLocator.allTextContents();
  const rawNames  = await nameLocator.allTextContents();

  const prices   = rawPrices.map(p => parseFloat(p.replace('$', '')));
  const minPrice = Math.min(...prices);
  const minIndex = prices.indexOf(minPrice);

  console.log(`💰 Produto mais barato: "${rawNames[minIndex]}" — $${minPrice}`);

  // ── 5. Adicionar ao carrinho ──────────────────────────────────────────────
  await page.locator('.btn_inventory').nth(minIndex).click();

  // ── 6. Verificar badge do carrinho ────────────────────────────────────────
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  console.log('✅ Produto mais barato adicionado ao carrinho com sucesso');

  // ── 7. Abrir carrinho ─────────────────────────────────────────────────────
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart/, { timeout: 10_000 });

  // ── 8. Validar item no carrinho ───────────────────────────────────────────
  const cartName  = await page.locator('.inventory_item_name').textContent();
  const cartPrice = await page.locator('.inventory_item_price').textContent();

  expect(cartName?.trim()).toBe(rawNames[minIndex].trim());
  expect(parseFloat(cartPrice?.replace('$', '') ?? '0')).toBe(minPrice);

  console.log(`🛒 Produto no carrinho: ${cartName} — ${cartPrice}`);

}
);