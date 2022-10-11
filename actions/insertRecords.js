const pool = require('../settings/database')

let recordPromises = [];
let cantRecordPromises = 0;

const insertRecords = async ({records, number}) => {
    try {
        if(records === undefined || number === undefined){
            throw Error("Records y number son obligatorios")
        }
    } catch (error) {
        console.log(error)
        return 
    }
    records = Number(records)
    number = Number(number)
    console.time('t')
    console.log(records, number)
    const celco = ['personal, movistar, claro']
    const conn = await pool.getConnection()
    while(records > 0){
        recordPromises = [];
        if(records < 500){
            cantRecordPromises ++
            try{
                for(let i = 1 ; i<records ; i ++){
                    const query = `INSERT INTO portabilidad (sourceAddress, lastCommit, celco) 
                    VALUES 
                    ('${number}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${celco[Math.random() * 3]}}');`
                    conn.query(query)
                    number++
                }
                const query = `INSERT INTO portabilidad (sourceAddress, lastCommit, celco) 
                    VALUES 
                    ('${number}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${celco[Math.random() * 3]}}');`
                    await conn.query(query)
                    number++
            }catch(error){
                console.log(error)
            }
            records -= records
        }else{
            cantRecordPromises ++
            try{
                for(let i = 1 ; i<500 ; i ++){
                    const query = `INSERT INTO portabilidad (sourceAddress, lastCommit, celco) 
                    VALUES 
                    ('${number}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${celco[Math.random() * 3]}}');`
                    conn.query(query)
                    number++
                }
                const query = `INSERT INTO portabilidad (sourceAddress, lastCommit, celco) 
                    VALUES 
                    ('${number}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${celco[Math.random() * 3]}}');`
                    await conn.query(query)
                    number++
            }catch(error){
                console.log(error)
            }
            records -= 500
        }
    }
    console.timeEnd('t')
    process.exit(0)
}

module.exports = {insertRecords}