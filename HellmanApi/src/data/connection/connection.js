const mysql = require('mysql');
const config = require('../../config');



exports.connect = () => {
    const con = mysql.createConnection({
        host: config.DATABASE_HOST,
        port: config.DATABASE_PORT,
        user: config.DATABASE_LOGIN,
        password: config.DATABASE_PASSWORD,
        database: config.DATABASE_NAME
     });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    return con;
}

exports.execute = async(query) => {
   return new Promise((resolve, reject) => {
        this.connect().query(
            query,
            (err, rows) => {

                return err ? reject(err) : resolve(JSON.stringify(rows));
            }
        );
        this.connect().end();
  });
}

exports.executeUpdate = async(query) => {
    return new Promise((resolve, reject) => {
        this.connect().query(
            query,
            (err, result) => {
                return err ? reject(err) : resolve(JSON.stringify(result));
            }
        );
        this.connect().end();
    });
}

