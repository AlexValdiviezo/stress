const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: '192.168.10.50',
    port: '3306',
    user: 'appuser',
    password: 'AppUs3r.3135',
    database: 'cmp_prepro'
});

async function getConnection(){
    try{
        const connection = await pool.getConnection()
        return connection
    }catch(error){
        console.log(error)
    }
}

module.exports = {getConnection}