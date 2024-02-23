const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
app.use(express.json());

//cors
app.use(require('cors')())
app.use(express.static('dist'))

const sql = require('mssql');
require('dotenv').config()

const config = {
  user: 'dbadmin',
  password: 'c0rp0r@t3d@t@b@53!',
  server: 'sql-rafi-dxcore-qat.database.windows.net',
  database: 'RAFI-PROCUREMENTMGT-PLAN'
};

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));




sql.connect(config).then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error(`Failed to connect to the database: ${error}`);
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// TEST
app.get("/api/v1", (req, res) => {
  res.send("hello tae");
})

app.get("/test", (req, res) => {
  res.send('hello');
})


