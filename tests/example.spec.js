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

  // 3. Aguardar página de produtos
  await page.waitForURL('**/inventory.html');
  console.log('✅ Login realizado com sucesso');

  // 4. Coletar preços e encontrar o mais barato
  const products = await page.$$eval('.inventory_item', (items) => {
    return items.map((item) => {
      const name = item.querySelector('.inventory_item_name')?.textContent?.trim();
      const priceText = item.querySelector('.inventory_item_price')?.textContent?.trim();
      const price = parseFloat(priceText?.replace('$', ''));
      return { name, price, priceText };
    });
  });

  const cheapest = products.reduce((min, p) => p.price < min.price ? p : min);
  console.log(`✅ Produto mais barato: ${cheapest.name} - ${cheapest.priceText}`);

  // 5. Adicionar ao carrinho via AI
  await ai(
    `Find the product named "${cheapest.name}" and click its "Add to cart" button`,
    { page, test }
  );
  console.log('✅ Produto adicionado ao carrinho');

  // 6. Verificar badge do carrinho
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
  console.log('✅ Carrinho atualizado com 1 item');

  // 7. Ir ao carrinho
  await ai('Click on the shopping cart icon', { page, test });
  await page.waitForURL('**/cart.html');

  // 8. Confirmar produto no carrinho
  await ai(
    `Verify that "${cheapest.name}" is listed in the cart`,
    { page, test }
  );
  console.log(`✅ Produto "${cheapest.name}" confirmado no carrinho`);
});