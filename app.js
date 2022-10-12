const { program } = require('commander');
const {insertRecords} = require('./actions/insertRecords')

program
    .name('API CLI - DataBase Stresser')
    .description('CLI to stress database')
    .version('1.0.0')
    .option('-r, --records <number>', 'number of records to enter in the database')
    .option('-n, --number <number>', 'number to start records')
    .option('-p, --parallel <number>', 'number of parallel promises')
    .action(insertRecords)

program.parse(process.argv)