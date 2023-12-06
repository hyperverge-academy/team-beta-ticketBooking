const express = require('express');
const routes = require('./routes/health.route.js')
const app = express();
const port = 3000;

app.use(routes)

// app.get('/', (req, res) => {
//   res.send('Hello, Beta!');
// });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



