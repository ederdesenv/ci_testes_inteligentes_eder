[![CI - Testes Automatizados com IA Generativa](https://github.com/ederdesenv/ci_testes_inteligentes_eder/actions/workflows/ci-ia.yml/badge.svg)](https://github.com/ederdesenv/ci_testes_inteligentes_eder/actions/workflows/ci-ia.yml)

# ci_testes_inteligentes_eder
> [!NOTE]
> Repositório atende à atividade: **Pipeline de CI e automação de testes sem e com o suporte e recursos de IA** , disciplina de Engenharia de Software, curso de Pós-Graduação Lato Sensu  Desenvolvimento Web e Mobile — Instituto Federal Sudeste de MG.

# 1. Objetivo do Projeto
  Este projeto tem como finalidade demonstrar a configuração de dois pipelines de Integração Contínua (CI) no GitHub Actions: um voltado à execução de testes automatizados convencionais e outro destinado a testes elaborados com apoio de Inteligência Artificial Generativa. 

# 2. Aplicação-alvo utilizada nos Testes
A Aplicação selecionada para os testes é: https://www.saucedemo.com/ este site está vinculado a comunidade Cantinho das QA’s que surgiu com a iniciativa de promover o estudo e divulgação de conhecimento na área de Qualidade e Testes.
A aplicação escolhida promove um ambiente perfeito para interação de testes manuais e/ou automatizados pois contem tela de login , cadastros , formulários , menu ou seja componentes que sugerem várias cenários de testes.

# 3. Tecnologias Utilizadas
O Playwright Test (Microsoft) foi selecionado para a automação por seu mecanismo de sincronização automática (auto-wait), que elimina a necessidade de intervalos de espera manuais. A ferramenta oferece suporte nativo aos motores Chromium, Firefox e WebKit por meio de uma API unificada, garantindo ampla compatibilidade entre navegadores. Além disso, sua integração com múltiplas linguagens de programação e pipelines de CI consolida o Playwright como solução robusta e escalável para ambientes de desenvolvimento voltados à qualidade de software.

# 4. Estrutura do Projeto
O repositório organiza separadamente os artefatos da aplicação, scripts de teste, configurações de pipeline e documentação de métricas. Os testes estão distribuídos entre tests/manual e tests/ia, enquanto os workflows encontram-se em .github/workflows.

# 5 - Casos de testes 
Casos de testes:
Caso de teste 1: Validar o Login 
Este teste verifica se o login e senha informado estão corretos e caso estejam retorna mensagem “Login realizado com sucesso” senão retorna “Erro de login”.
Caso de teste 2: adicionar produto no carrinho
Este teste valida o login, após logar na página https://www.saucedemo.com/inventory.html
Seleciona-se o primeiro produto da lista e adiciona ao carrinho.

# 6. Testes Automatizados
Estes 2 casos de testes foram automatizados e estão no GitHub actions:
- automação 1 - validar o login
- automação 2 - adicionar produto no carrinho 

# 7 - Testes inteligentes com IA 
casos de teste com IA
Foram criados 3 scripts de automação com IA para validar os casos de testes 1 e 2 afins de comparar as métricas com os testes automatizados sem IA. 
- validar o login com IA 
- adicionar produto no carrinho com IA
O 3º script valida o login , e ao acessar a pagina de produtos vai procurar o produto de menor valor (mais barato). ( escolha de menor valor utiliza a api https://app.zerostep.com/ que se comunica com um agente e IA).

# 8. GitHub Actions
Foram criados 2 pipeline de testes com os nomes:
CI - Testes Automatizados (ci.yml)
CI - Testes Automatizados com IA Generativa (ci-ia.yml)

# 9. Métricas e Evidências

Para os 2 casos de teste realizou-se a comparação de tempo entre os testes automatizados sem IA em relação aos testes automatizados com IA.

## Resultado dos Testes

- **Caso de teste: validar o login com IA**  
  Tempo médio de execução: **7,2 ms**

- **Caso de teste: automação 1 - validar o login**  
  Tempo médio de execução: **2,6 ms**

---

- **Caso de teste: adicionar produto no carrinho com IA**  
  Tempo médio de execução: **10,8 ms**

- **Caso de teste: automação 2 - adicionar produto no carrinho**  
  Tempo médio de execução: **2,0 ms**


# 10. Variáveis de Ambiente
Nos testes com que envolvem a comunicação com a API ZeroStep (https://zerostep.com)
utiliza-se a ZEROSTEP_TOKEN.

# 11. Justificativa Técnica
A escolha do Playwright como framework de automação fundamenta-se em sua arquitetura orientada a eventos com mecanismo de auto-wait nativo, que elimina dependências de esperas artificiais e torna os scripts mais estáveis e determinísticos. O suporte unificado a múltiplos motores de renderização (Chromium, Firefox e WebKit) garante cobertura ampla de compatibilidade de navegadores sem incremento de complexidade operacional. A integração nativa com pipelines de CI, como o GitHub Actions, viabiliza a execução contínua e automatizada dos testes a cada ciclo de desenvolvimento.
A seleção do site SauceDemo como aplicação-alvo justifica-se por seu conjunto deliberadamente diversificado de componentes interativos — tela de login, listagem de produtos, carrinho de compras e formulários —, que oferece uma base representativa para a elaboração de casos de teste funcionais cobrindo fluxos críticos de usuário, como autenticação e operações de e-commerce.
A adoção da API ZeroStep nos testes com IA Generativa introduz uma camada de inteligência comportamental que transcende os limites dos seletores estáticos. O agente de IA é capaz de interpretar intenções em linguagem natural e navegar dinamicamente pela interface, o que possibilita a validação de cenários mais complexos — como a identificação e seleção do produto de menor valor — sem necessidade de hardcode de locators específicos. Esse modelo de teste orientado por agente representa uma evolução significativa em relação à automação tradicional, conferindo maior resiliência a mudanças de layout e reduzindo o custo de manutenção dos scripts.

A separação entre os dois pipelines (ci.yml e ci-ia.yml) permite a análise comparativa de métricas objetivas — como tempo de execução, estabilidade e cobertura —, fornecendo evidências empíricas para embasar decisões sobre quando e como incorporar IA Generativa em estratégias de qualidade de software.

# 12. Conclusão
O projeto comparou dois pipelines no GitHub Actions: um com testes tradicionais (Playwright) e outro orientado por IA Generativa (API ZeroStep).
Automação tradicional se destacou pela previsibilidade e desempenho em fluxos bem definidos, sendo ideal para validações rápidas e contínuas.
IA Generativa brilhou na resiliência: ao interpretar linguagem natural e navegar dinamicamente pela interface, eliminou dependência de locators estáticos e lidou melhor com cenários complexos ou exploratórios.
Conclusão central: as abordagens são complementares. A escolha — ou combinação — depende do contexto, maturidade da aplicação e custo de manutenção. A IA Generativa não substitui a automação tradicional, mas a amplia, reduzindo esforço de manutenção e viabilizando testes mais complexos com menos fricção técnica.

# 13. Referências
- [Playwright – Documentação oficial](https://playwright.dev/docs/intro)
- [GitHub Actions – Documentação oficial](https://docs.github.com/pt/actions)
- [ZeroStep AI – GitHub](https://github.com/zerostep-ai/zerostep)





