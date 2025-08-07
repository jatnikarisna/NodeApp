const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello! Welcome Team to MOAI OSS Family 2025. Let learn Kubernetes deployment using CI/CD Jenkins with delete create #1 method\n');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
