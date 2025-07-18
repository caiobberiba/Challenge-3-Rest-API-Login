const express = require('express');
const router = express.Router();

// Lista de usuários em memória
const users = [];
const loginAttempts = {};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - cpf
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               cpf:
 *                 type: string
 *                 description: CPF com exatamente 11 números
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário já existe
 */
router.post('/register', (req, res) => {
  const { username, password, cpf } = req.body;
  if (!username || !password || !cpf || !/^\d{11}$/.test(cpf)) {
    return res.status(400).json({ error: 'Dados inválidos. CPF deve ter exatamente 11 números.' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Usuário já existe.' });
  }
  if (users.find(u => u.cpf === cpf)) {
    return res.status(400).json({ error: 'CPF já cadastrado. O CPF deve ser único.' });
  }
  users.push({ username, password, cpf });
  res.status(201).json({ message: 'Usuário criado com sucesso.' });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Usuário ou senha inválidos
 *       403:
 *         description: Conta bloqueada
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ error: 'Usuário ou senha inválidos.' });
  }
  if (loginAttempts[username] && loginAttempts[username].blocked) {
    return res.status(403).json({ error: 'Conta bloqueada por excesso de tentativas.' });
  }
  if (user.password !== password) {
    if (!loginAttempts[username]) loginAttempts[username] = { count: 0, blocked: false };
    loginAttempts[username].count++;
    if (loginAttempts[username].count >= 3) {
      loginAttempts[username].blocked = true;
      return res.status(403).json({ error: 'Conta bloqueada por excesso de tentativas.' });
    }
    return res.status(400).json({ error: 'Usuário ou senha inválidos.' });
  }
  // Login bem-sucedido
  loginAttempts[username] = { count: 0, blocked: false };
  res.json({ message: 'Login realizado com sucesso.' });
});

/**
 * @swagger
 * /auth/recover:
 *   post:
 *     summary: Recupera a senha do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - cpf
 *             properties:
 *               username:
 *                 type: string
 *               cpf:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha recuperada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/recover', (req, res) => {
  const { username, cpf } = req.body;
  const user = users.find(u => u.username === username && u.cpf === cpf);
  if (!user) {
    return res.status(400).json({ error: 'Dados inválidos.' });
  }
  res.json({ password: user.password });
});

/**
 * @swagger
 * /auth/usernames:
 *   get:
 *     summary: Retorna a lista de usernames cadastrados
 *     responses:
 *       200:
 *         description: Lista de usernames
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usernames:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/usernames', (req, res) => {
  const usernames = users.map(u => u.username);
  res.json({ usernames });
});

/**
 * @swagger
 * /auth/reset-password:
 *   patch:
 *     summary: Reseta a senha de um usuário bloqueado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - cpf
 *               - newPassword
 *             properties:
 *               username:
 *                 type: string
 *               cpf:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha resetada com sucesso
 *       400:
 *         description: Dados inválidos ou usuário não encontrado
 *       403:
 *         description: Usuário não está bloqueado
 */
router.patch('/reset-password', (req, res) => {
  const { username, cpf, newPassword } = req.body;
  
  if (!username || !cpf || !newPassword) {
    return res.status(400).json({ error: 'Dados inválidos. Username, CPF e nova senha são obrigatórios.' });
  }
  
  const user = users.find(u => u.username === username && u.cpf === cpf);
  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado ou CPF inválido.' });
  }
  
  if (!loginAttempts[username] || !loginAttempts[username].blocked) {
    return res.status(403).json({ error: 'Usuário não está bloqueado. Apenas usuários bloqueados podem resetar a senha.' });
  }
  
  // Atualizar a senha
  user.password = newPassword;
  
  // Desbloquear o usuário
  loginAttempts[username] = { count: 0, blocked: false };
  
  res.json({ message: 'Senha resetada com sucesso. Usuário desbloqueado.' });
});

module.exports = router; 