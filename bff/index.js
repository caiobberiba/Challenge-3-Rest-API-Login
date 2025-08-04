const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.BFF_PORT || 3001;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/auth';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// BFF Routes - Proxy to API
app.post('/bff/register', async (req, res) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
  }
});

app.post('/bff/login', async (req, res) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
  }
});

app.post('/bff/recover', async (req, res) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recover`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Recover error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
  }
});

app.post('/bff/reset-password', async (req, res) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/reset-password`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Reset password error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
  }
});

app.get('/bff/usernames', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/usernames`);
    res.json(response.data);
  } catch (error) {
    console.error('Get usernames error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Internal server error' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve other pages
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

app.get('/recover', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/recover.html'));
});

app.get('/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/reset-password.html'));
});

// Serve static files from the public directory (after BFF routes)
app.use(express.static(path.join(__dirname, '../public')));

// Start server
app.listen(PORT, () => {
  console.log(`BFF Server running on: http://localhost:${PORT}`);
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log(`Static files served from: ${path.join(__dirname, '../public')}`);
}); 