const { exec } = require('child_process')
const { program } = require('commander')

program
    .name('API CLI - DataBase Stresser')
    .description('CLI to stress database')
    .version('1.0.0')
    .option('-c, --cores <number>', 'number of processor cores')
    .option('-r, --records-quantity <number>', 'number of records to enter in the database')
    .option('-s, --start-number <number>', 'number to start records')
    .action(({cores = 1, recordsQuantity, startNumber})=>{
        cores = Number(cores)
        recordsQuantity = Number(recordsQuantity)
        startNumber = Number(startNumber)
        for(let i = 0; i<cores; i++){
            exec(`node app -r ${recordsQuantity/cores} -s ${startNumber+(recordsQuantity*i)}`, (error, stdout, stderr) => {
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

