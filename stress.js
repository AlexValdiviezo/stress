const { exec } = require('child_process')
const { program } = require('commander');

program
    .name('API CLI - DataBase Stresser')
    .description('CLI to stress database')
    .version('1.0.0')
    .option('-c, --cores <number>', 'number of processor cores')
    .option('-r, --records <number>', 'number of records to enter in the database')
    .option('-n, --number <number>', 'number to start records')
    .action(({cores = 1, records, number})=>{
        cores = Number(cores)
        records = Number(records)
        number = Number(number)
        for(let i = 0; i<cores; i++){
            exec(`node app -r ${records/cores} -n ${number+(records*i)}`, (error, stdout, stderr) => {
                if(error) {
                    console.error(`error: ${error.message}`)
                    return
                }
                if(stderr){
                    console.error(`stderr: ${stderr}`)
                    return
                }
                console.log(`stdout:\n${stdout}`)
            })
        }
    })

program.parse(process.argv)

