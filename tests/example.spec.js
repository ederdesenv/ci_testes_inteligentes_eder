// @ts-check
// test.spec.js
require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { ai } = require('@zerostep/playwright');

test.use({ browserName: 'chromium' });

test('Adicionar primeiro produto ao carrinho - SauceDemo', async ({ page }) => {

  // 1. Navegar para o site
  await page.goto('https://www.saucedemo.com/');

  // 2. Login via AI
  await ai('Type "standard_user" in the username field', { page, test });
  await ai('Type "secret_sauce" in the password field', { page, test });
  await ai('Click the Login button', { page, test });

  // 3. Aguardar página de produtos
  await page.waitForURL('**/inventory.html');
  console.log('✅ Login realizado com sucesso');

  // 4. Pegar o nome do primeiro produto via AI
  const firstProductName = await ai(
    'Get the name of the first product listed on the page',
    { page, test }
  );
  console.log(`✅ Primeiro produto encontrado: ${firstProductName}`);

  // 5. Clicar no botão "Add to cart" do primeiro produto via AI
  await ai(
    'Click the "Add to cart" button of the first product listed on the page',
    { page, test }
  );
  console.log('✅ Botão "Add to cart" clicado');

  // 6. Verificar badge do carrinho
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
  console.log('✅ Carrinho atualizado com 1 item');

  // 7. Ir ao carrinho
  await ai('Click on the shopping cart icon', { page, test });
  await page.waitForURL('**/cart.html');

  // 8. Confirmar produto no carrinho
  await ai(
    `Verify that "${firstProductName}" is listed in the cart`,
    { page, test }
  );
  console.log(`✅ Produto "${firstProductName}" confirmado no carrinho`);
});