const express = require('express');
const router = express.Router();

// Lista de usuários em memória
const users = [];
const loginAttempts = {};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
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
 *                 description: Valid email
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid data or user already exists
 */
router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!username || !password || !email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid data. Email must be valid.' });
  }
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'User already exists.' });
  }
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email already registered. Email must be unique.' });
  }
  
  users.push({ username, password, email });
  res.status(201).json({ message: 'User created successfully.' });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
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
 *         description: Login successful
 *       400:
 *         description: Invalid username or password
 *       403:
 *         description: Account blocked
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password.' });
  }
  if (loginAttempts[username] && loginAttempts[username].blocked) {
    return res.status(403).json({ error: 'Account blocked due to too many attempts.' });
  }
  if (user.password !== password) {
    if (!loginAttempts[username]) loginAttempts[username] = { count: 0, blocked: false };
    loginAttempts[username].count++;
    if (loginAttempts[username].count >= 3) {
      loginAttempts[username].blocked = true;
      return res.status(403).json({ error: 'Account blocked due to too many attempts.' });
    }
    return res.status(400).json({ error: 'Invalid username or password.' });
  }
  // Successful login
  loginAttempts[username] = { count: 0, blocked: false };
  res.json({ message: 'Login successful.' });
});

/**
 * @swagger
 * /auth/recover:
 *   post:
 *     summary: Recover user password
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
 *         description: Password recovered successfully
 *       400:
 *         description: Invalid data
 */
router.post('/recover', (req, res) => {
  const { username, email } = req.body;
  const user = users.find(u => u.username === username && u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid data.' });
  }
  res.json({ password: user.password });
});

/**
 * @swagger
 * /auth/usernames:
 *   get:
 *     summary: Returns the list of registered usernames
 *     responses:
 *       200:
 *         description: List of usernames
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
 *     summary: Reset password for a blocked user
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
 *         description: Password reset successfully
 *       400:
 *         description: Invalid data or user not found
 *       403:
 *         description: User is not blocked
 */
router.patch('/reset-password', (req, res) => {
  const { username, email, newPassword } = req.body;
  
  if (!username || !email || !newPassword) {
    return res.status(400).json({ error: 'Invalid data. Username, email and new password are required.' });
  }
  
  const user = users.find(u => u.username === username && u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'User not found or invalid email.' });
  }
  
  if (!loginAttempts[username] || !loginAttempts[username].blocked) {
    return res.status(403).json({ error: 'User is not blocked. Only blocked users can reset the password.' });
  }
  
  // Update password
  user.password = newPassword;
  
  // Unblock user
  loginAttempts[username] = { count: 0, blocked: false };
  
  res.json({ message: 'Password reset successfully. User unblocked.' });
});

/**
 * @swagger
 * /auth/delete/{username}:
 *   delete:
 *     summary: Delete a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user to be deleted
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: User not found
 */
router.delete('/delete/:username', (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }
  const index = users.findIndex(u => u.username === username);
  if (index === -1) {
    return res.status(400).json({ error: 'User not found.' });
  }
  users.splice(index, 1);
  // Remove login attempts as well
  delete loginAttempts[username];
  res.json({ message: 'User deleted successfully.' });
});

module.exports = router; 