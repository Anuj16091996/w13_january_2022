'use strict'

console.log('NodeJs Interpreter starts executing Javascript code')
const filesystem = require('fs')
const myModule = require('./src/myfirstmodule/index.js')
console.log(myModule.myBye)

function logMsgSync (msg) {
    if (!filesystem.existsSync('log')) {
        filesystem.mkdirSync('log')
        console.log('Directory Created ')
    }
    filesystem.appendFileSync('./log/server_log.log', msg + '\n')
}

logMsgSync('Create a new File and add this data in that file through syncronize way')

function LogMsg (msg) {
    filesystem.access('logs', (err) => {
        if (err == null) {
            console.log('Log Exits')
        } else if (err.code === 'ENOENT') {
            filesystem.mkdir('logs', (err) => {
                if (err) throw err
            })
        }
        filesystem.appendFile('./logs/server_log.log', msg + '\n', (err) => {
            if (err) throw err
        })
    })
}

LogMsg('Hello World Through ASync New Message')
