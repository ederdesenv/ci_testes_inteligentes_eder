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

