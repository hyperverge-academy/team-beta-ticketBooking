const express = require('express');
const bodyParser = require('body-parser')

const routes = require('./routes/health.route.js')
const bookingRoutes = require('./routes/users.route.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(routes);

app.use(bookingRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});