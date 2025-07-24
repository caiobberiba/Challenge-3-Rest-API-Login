const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Login API',
      version: '1.0.0',
      description: 'API for authentication and password recovery (example for study purposes)'
    },
    servers: [
      { url: 'http://localhost:3000' }
    ]
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running in: http://localhost:${PORT}`);
  console.log(`Swagger Documentation: http://localhost:${PORT}/api-docs`);
}); 