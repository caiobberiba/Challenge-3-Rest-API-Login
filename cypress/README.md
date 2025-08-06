# Cypress E2E Tests

Este diretório contém os testes End-to-End automatizados usando Cypress para a aplicação login-api.

## Estrutura do Projeto

```
cypress/
├── e2e/                    # Testes End-to-End
│   └── first-test.cy.js   # Teste inicial
├── fixtures/              # Dados de teste
├── support/               # Arquivos de suporte
│   ├── commands.js        # Comandos personalizados
│   └── e2e.js            # Configurações globais
├── downloads/            # Arquivos baixados durante os testes
├── screenshots/          # Screenshots dos testes
├── videos/              # Vídeos dos testes
└── package.json         # Dependências do Cypress
```

## Comandos Disponíveis

### Executar Cypress em modo interativo
```bash
npm run cypress:open
# ou
npx cypress open
```

### Executar testes em modo headless
```bash
npm run cypress:run
# ou
npx cypress run
```

### Executar testes específicos
```bash
npm run test:e2e
# ou
npx cypress run --spec 'cypress/e2e/**/*.cy.js'
```

## Configuração

- **Base URL**: http://localhost:3001
- **Configuração**: `cypress.config.js` na raiz do projeto

## Comandos Personalizados

### `cy.login(email, password)`
Realiza login na aplicação com email e senha fornecidos.

### `cy.logout()`
Realiza logout da aplicação.

### `cy.waitForPageLoad()`
Aguarda o carregamento completo da página.

## Exemplo de Teste

```javascript
describe('Login Test', () => {
  it('should login successfully', () => {
    cy.login('user@example.com', 'password123')
    cy.url().should('include', '/dashboard')
  })
})
```

## Dicas

1. Sempre use `data-cy` attributes para seletores
2. Use comandos personalizados para ações repetitivas
3. Mantenha os testes independentes
4. Use fixtures para dados de teste
5. Documente cenários complexos 