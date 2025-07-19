# Exemplos de Teste - API com EMAIL

## 1. Registrar Usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "password": "senha123",
    "email": "usuario1@exemplo.com"
  }'
```

## 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "password": "senha123"
  }'
```

## 3. Recuperar Senha
```bash
curl -X POST http://localhost:3000/auth/recover \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "email": "usuario1@exemplo.com"
  }'
```

## 4. Listar Usernames
```bash
curl -X GET http://localhost:3000/auth/usernames
```

## 5. Resetar Senha (após bloqueio)
```bash
curl -X PATCH http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "email": "usuario1@exemplo.com",
    "newPassword": "novaSenha123"
  }'
```

## Mudanças Implementadas:

✅ **CPF → EMAIL**: Todas as referências de CPF foram substituídas por EMAIL  
✅ **Validação**: Email com formato válido (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)  
✅ **Unicidade**: Email deve ser único no sistema  
✅ **Endpoints atualizados**:
- `POST /auth/register` - agora requer email
- `POST /auth/recover` - agora requer email  
- `PATCH /auth/reset-password` - agora requer email

## Documentação Swagger:
Acesse: http://localhost:3000/api-docs 