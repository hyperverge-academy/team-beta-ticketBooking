const express = require('express');
const routes = require('./routes/health.route.js')
const app = express();
const port = 3000;

app.use(routes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



