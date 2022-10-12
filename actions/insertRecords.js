const pool = require('../settings/database')

let recordPromises = [];

const getRandomCelco = () => {       
    const celcos = ['personal', 'movistar', 'claro']  
    return celcos[Math.floor(Math.random() * 3)]  
}      
const getQuery = (number) => {         
    return `INSERT INTO portabilidad (sourceAddress, celco) VALUES ('${number}', '${getRandomCelco()}')`;     
}

const createPromiseArray = (conn, number) => {
    recordPromises.push(conn.query(getQuery(number)))
}


const insertRecords = async ({records, number}) => {

    console.time('t')

        if(records === undefined || number === undefined){
            console.log("Records y number son obligatorios")
            process.exit(0)
            return 
        }


    records = Number(records)
    number = Number(number)

    const conn = await pool.getConnection()

    while(records > 0){

        let rounds = records < 500 ? records : 500

        recordPromises = [];

        try{
            for(let i = 0 ; i<rounds ; i ++){
                createPromiseArray(conn, number)
                number++
            }
            await Promise.all(recordPromises)
            recordPromises = []
        }catch(error){
            console.log(error)
        }

        records -= rounds
    }

    console.timeEnd('t')

    process.exit(0)

}

module.exports = {insertRecords}