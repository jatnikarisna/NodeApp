const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.send('Hello, World! Welcome Team to MOAI OSS BIG Family 2025. Let learn & share with delete-create 07262025...spirit#1\n');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
