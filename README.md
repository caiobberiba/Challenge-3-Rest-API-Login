# API de Login (Exemplo para Estudos)

Esta API foi criada para fins de estudo e simula um sistema de autenticação simples, sem uso de banco de dados (tudo em memória). Permite criar usuários, realizar login, bloquear após 3 tentativas inválidas e recuperar senha via CPF.

## Tecnologias Utilizadas
- Node.js
- Express
- Swagger (Documentação)

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npx nodemon index.js
   ```
   ou
   ```bash
   node index.js
   ```

O servidor estará disponível em: http://localhost:3000

## Documentação Swagger
Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

### Criar usuário
`POST /auth/register`
```json
{
  "username": "usuario",
  "password": "senha",
  "cpf": "12345678901"
}
```
- O CPF deve ter exatamente 11 números.

### Login
`POST /auth/login`
```json
{
  "username": "usuario",
  "password": "senha"
}
```
- Após 3 tentativas inválidas, o usuário será bloqueado.

### Recuperar senha
`POST /auth/recover`
```json
{
  "username": "usuario",
  "cpf": "12345678901"
}
```
- Retorna a senha se os dados estiverem corretos.

## Observações
- Todos os dados são armazenados apenas em memória (serão perdidos ao reiniciar o servidor).
- Não utilize esta API em produção. 