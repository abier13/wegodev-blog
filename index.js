const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();
const port = 3000;

// untuk menangani request json
app.use(express.json());

// config swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentasion Blog',
      version: '0.0.1',
      description: 'Belajar NodeJs',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Import Router
const uploadRouter = require('./src/routes/upload.routes');
const userRouter = require('./src/routes/user.routes');

// Routes Import
app.use(express.static(path.join(__dirname)));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1', uploadRouter);
app.use('/v1', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
