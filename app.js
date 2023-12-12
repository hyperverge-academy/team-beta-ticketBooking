const express = require('express');
const routes = require('./routes/health.route.js')
const app = express();
const port = 3000;
const user = require('./routes/users.route.js');

app.use(express.json())
app.use(routes)
app.use("/",user)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});