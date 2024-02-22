const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
app.use(express.json());
const { createProxyMiddleware } = require('http-proxy-middleware');

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

app.use(
  '/rafi.ph/oauth2/token',
  createProxyMiddleware({
    target: 'http://20.188.123.92:3000/',
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy Error');
    }
  })
);

sql.connect(config).then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error(`Failed to connect to the database: ${error}`);
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// CRUD
