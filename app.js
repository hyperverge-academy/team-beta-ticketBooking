const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const userModel = require('./models/users.model.js');

const routes = require('./routes/health.route.js');

const usersRoutes = require('./routes/users.route.js');



const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(routes);
app.use(userRoutes);

const busRoutes = require('./routes/buses.route')
app.use(busRoutes)


app.listen(port, async() => {
  const registerADminSucceded = await userModel.registerAdmin();
  if (!registerADminSucceded){
    console.log("Account dont exist!")
    app.close();
  }
  console.log(`Server is listening on port ${port}`);
});