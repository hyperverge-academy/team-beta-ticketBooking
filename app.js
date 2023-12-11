const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/health.route')


const app = express();
const port = 3000;
app.use(bodyParser.json())

app.use(routes)

const busRoutes = require('./routes/buses.route')
app.use(busRoutes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
