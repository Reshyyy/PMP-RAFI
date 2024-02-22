const sql = require('mssql');

const config = {
    user: 'dbadmin',
    password: 'c0rp0r@t3d@t@b@53!',
    server: 'sql-rafi-dxcore-qat.database.windows.net', 
    database: 'RAFI-PROCUREMENTMGT-PLAN'
};

sql.connect(config).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.error(`Failed to connect to the database: ${error}`);
});