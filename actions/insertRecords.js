const pool = require('../settings/database');
const { getLoading } = require('./helpers/getLoading');

//let por10, por20, por30, por40, por50, por60, por70, por80, por90
let recordPromises = [];

const getRandomCelco = () => {       
    const celcos = ['personal', 'movistar', 'claro']  
    return celcos[Math.floor(Math.random() * 3)]  
}      
const buildInsertQueryPortabilidad = (number) => {         
    return `INSERT INTO portabilidad (sourceAddress, celco) VALUES ('${number}', '${getRandomCelco()}')`;     
}

const createPromiseArray = (conn, number) => {
    recordPromises.push(conn.query(buildInsertQueryPortabilidad(number)))
}

const insertRecords = async ({recordsQuantity, startNumber}) => {
    console.log('records: ', recordsQuantity)
    console.log('startNumber:', startNumber)
    console.time('t')

        if(recordsQuantity === undefined || startNumber === undefined){
            console.log("Records y startNumber son obligatorios")
            process.exit(0)
            return 
        }


    recordsQuantity = Number(recordsQuantity)
    let number = Number(startNumber)
    //const total = recordsQuantity

    const conn = await pool.getConnection()

    while(recordsQuantity > 0){

        //getLoading(total, recordsQuantity)

        let rounds = recordsQuantity < 100 ? recordsQuantity : 100

        //let rounds = 1

        recordPromises = [];

        try{
            for(let i = 0 ; i<rounds ; i ++){
                createPromiseArray(conn, number)
                number++
            }
            await Promise.all(recordPromises)
        }catch(error){
            console.log(error)
        }

        recordsQuantity -= rounds
    }

    console.log('100%')

    console.timeEnd('t')

    process.exit(0)

}

module.exports = {insertRecords}