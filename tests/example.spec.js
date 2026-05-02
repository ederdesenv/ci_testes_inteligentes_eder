// @ts-check
// test.spec.js
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { ai } = require('@zerostep/playwright');

test.use({ browserName: 'chromium' });

test('Adicionar produto mais barato ao carrinho - SauceDemo', async ({ page }) => {

  // 1. Navegar para o site
  await page.goto('https://www.saucedemo.com/');

  // 2. Login via AI
  await ai('Type "standard_user" in the username field', { page, test });
  await ai('Type "secret_sauce" in the password field', { page, test });
  await ai('Click the Login button', { page, test });

  // 3. Verificar se o login foi bem-sucedido
  const isLoggedIn = await page.url().includes('inventory.html') ||
    await page.locator('.inventory_list').isVisible().catch(() => false);

  if (isLoggedIn) {
    console.log('✅ Login realizado com sucesso!');
  } else {
    const errorMessage = await page.locator('[data-test="error"]').textContent().catch(() => 'Erro desconhecido');
    console.error(`❌ Erro de login: ${errorMessage}`);
    throw new Error(`Falha no login: ${errorMessage}`);
  }

});