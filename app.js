const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  res.send('Hello, World! Welcome Team to MOAI OSS BIG Family 2025. Let learn & share with rolling update 07192025...spirit#6\n');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
