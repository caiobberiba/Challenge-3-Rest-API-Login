# Test Examples - API with EMAIL

## 1. Register User
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

## 3. Recover Password
```bash
curl -X POST http://localhost:3000/auth/recover \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "email": "usuario1@exemplo.com"
  }'
```

## 4. List Usernames
```bash
curl -X GET http://localhost:3000/auth/usernames
```

## 5. Reset Password (after lockout)
```bash
curl -X PATCH http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario1",
    "email": "usuario1@exemplo.com",
    "newPassword": "novaSenha123"
  }'
```

## Implemented Changes:

✅ **CPF → EMAIL**: All references to CPF have been replaced by EMAIL  
✅ **Validation**: Email with valid format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)  
✅ **Uniqueness**: Email must be unique in the system  
✅ **Updated endpoints**:
- `POST /auth/register` - now requires email
- `POST /auth/recover` - now requires email  
- `PATCH /auth/reset-password` - now requires email

## Swagger Documentation:
Access: http://localhost:3000/api-docs 