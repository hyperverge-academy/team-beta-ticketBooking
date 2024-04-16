const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userLayer = require('./dbLayers/user.layers.js');

const routes = require('./routes/health.route.js');

const usersRoutes = require('./routes/users.route.js');

const busRoutes = require('./routes/buses.route')

const app = express();
const port = process.env.PORT || 3000

const dbConnection = require('./config/db.model.js')

app.use(cors());
app.use(bodyParser.json());

app.use(routes);
app.use(usersRoutes);
app.use(busRoutes)

async function server() {
  try {
    await dbConnection();
    const serverApp = app.listen(port, async () => {
      const registerADminSucceded = await userLayer.registerAdmin();
      if (!registerADminSucceded) {
        console.log("Account doesn't exist!");
        serverApp.close(() => {
          console.log(`Server App is Closed`);
        });
      }
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

server();


// app.listen(port, async() => {
//   const registerADminSucceded = await userModel.registerAdmin();
//   console.log(registerADminSucceded , "ss")
//   if (!registerADminSucceded){
//     console.log("Account dont exist!")
//     app.close();
//   }
//   console.log(`Server is listening on port ${port}`);
// });