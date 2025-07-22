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
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *                 description: Email válido
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou usuário já existe
 */
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  
  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!username || !password || !email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Dados inválidos. Email deve ter formato válido.' });
  }
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Usuário já existe.' });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado. O email deve ser único.' });
  }
  
  users.push({ username, password, email });
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
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha recuperada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/recover', (req, res) => {
  const { username, email } = req.body;
  const user = users.find(u => u.username === username && u.email === email);
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
 *               - email
 *               - newPassword
 *             properties:
 *               username:
 *                 type: string
 *               email:
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
  const { username, email, newPassword } = req.body;
  
  if (!username || !email || !newPassword) {
    return res.status(400).json({ error: 'Dados inválidos. Username, email e nova senha são obrigatórios.' });
  }
  
  const user = users.find(u => u.username === username && u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado ou email inválido.' });
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

/**
 * @swagger
 * /auth/delete/{username}:
 *   delete:
 *     summary: Deleta um usuário pelo username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       400:
 *         description: Usuário não encontrado
 */
router.delete('/delete/:username', (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ error: 'Username é obrigatório.' });
  }
  const index = users.findIndex(u => u.username === username);
  if (index === -1) {
    return res.status(400).json({ error: 'Usuário não encontrado.' });
  }
  users.splice(index, 1);
  // Remove tentativas de login também
  delete loginAttempts[username];
  res.json({ message: 'Usuário deletado com sucesso.' });
});

module.exports = router; 