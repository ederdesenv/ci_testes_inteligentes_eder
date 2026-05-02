[![CI - Testes Automatizados com IA Generativa](https://github.com/ederdesenv/ci_testes_inteligentes_eder/actions/workflows/ci-ia.yml/badge.svg)](https://github.com/ederdesenv/ci_testes_inteligentes_eder/actions/workflows/ci-ia.yml)

# ci_testes_inteligentes_eder
Repositório atende a atividade: Pipeline de CI e automação de testes sem e com o suporte e recursos de IA


caso de teste: validar o login com IA 
Código: 
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
