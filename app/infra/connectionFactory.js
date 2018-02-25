var mysql = require('mysql');

function createDbConnection() {

    if(!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'casadocodigo_nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'casadocodigo_nodejs_dev'
        });
    }
}

//wrapper
module.exports = function () {
    return createDbConnection;
}