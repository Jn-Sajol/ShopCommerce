const express = require('express');
// const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
// const prisma = new PrismaClient();

app.use(bodyParser.json());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
