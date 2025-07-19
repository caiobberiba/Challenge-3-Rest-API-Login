# API de Login (Exemplo para Estudos)

Esta API foi criada para fins de estudo e simula um sistema de autenticação simples, sem uso de banco de dados (tudo em memória). Permite criar usuários, realizar login, bloquear após 3 tentativas inválidas, recuperar senha via CPF e resetar senha de usuários bloqueados.

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
- O CPF deve ser único (não pode ser duplicado).
- O username deve ser único.

### Login
`POST /auth/login`
```json
{
  "username": "usuario",
  "password": "senha"
}
```
- Após 3 tentativas inválidas, o usuário será bloqueado.

### Listar usernames
`GET /auth/usernames`
- Retorna a lista de todos os usernames cadastrados.

### Recuperar senha
`POST /auth/recover`
```json
{
  "username": "usuario",
  "cpf": "12345678901"
}
```
- Retorna a senha se os dados estiverem corretos.

### Resetar senha (usuários bloqueados)
`PATCH /auth/reset-password`
```json
{
  "username": "usuario",
  "cpf": "12345678901",
  "newPassword": "novaSenha123"
}
```
- Apenas usuários bloqueados podem resetar a senha.
- Valida username e CPF antes de permitir o reset.
- Após o reset, o usuário é automaticamente desbloqueado.

## Observações
- Todos os dados são armazenados apenas em memória (serão perdidos ao reiniciar o servidor).
- Não utilize esta API em produção.
- O CPF é validado como único para evitar duplicatas.
- Usuários bloqueados precisam resetar a senha para voltar a acessar o sistema. 