const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/health.route.js');
const usersRoutes = require('./routes/users.route.js');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(routes);
app.use(usersRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});