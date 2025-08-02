const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World! Welcome Team to MOAI OSS BIG Family 2025. Let learn & share with rollout 08022025...spirit#5\n');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
