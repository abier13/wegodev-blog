const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// untuk menangani request json
app.use(express.json());

// Import Router
const uploadRouter = require('./src/routes/upload.routes');

// Routes Import
app.use(express.static(path.join(__dirname)));
app.use('/api', uploadRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
