// @ts-check

const { test, expect } = require('@playwright/test');

test('Caso de Teste 1 - Login com standard_user', async ({ page }) => {
  // 1. Navegar para a página
  await page.goto('https://www.saucedemo.com/');
  // 2. Verificar que a página carregou corretamente
  await expect(page).toHaveTitle(/Swag Labs/);
  // 3. Preencher o campo de usuário
  await page.locator('#user-name').fill('standard_user');
  // 4. Preencher o campo de senha
  await page.locator('#password').fill('secret_sauce');
  // 5. Clicar no botão de login
  await page.locator('#login-button').click();
  // 6. Verificar que o login foi bem-sucedido
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  // 7. Verificar que o título da página de produtos está visível
  await expect(page.locator('.title')).toHaveText('Products');
  console.log('✅ Login realizado com sucesso!');
});

test('Caso de Teste 2 - Adicionar Sauce Labs Backpack ao carrinho', async ({ page }) => {
  // 1. Acessar o site
  await page.goto('https://www.saucedemo.com/');
  // 2. Realizar login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button'); // ⚠️ Corrija os links do seu código original
  // 3. Verificar que o login foi bem-sucedido
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
  // 4. Clicar no produto "Sauce Labs Backpack"
  await page.click('text=Sauce Labs Backpack');
  // 5. Verificar que a página do produto foi aberta
  await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
  // 6. Clicar em "Add to cart"
  await page.click('button[data-test="add-to-cart"]');
  // 7. Verificar que o item foi adicionado ao carrinho
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  // 8. Verificar que o botão mudou para "Remove"
  await expect(page.locator('button[data-test="remove"]')).toBeVisible();
  console.log('✅ Caso de Teste 2 concluído com sucesso!');
});