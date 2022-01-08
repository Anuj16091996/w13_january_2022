'use strict'

// Without Express

// let http=require('http')

// // create a server Object
// http.createServer(function (request, respose){
//     respose.writeHead(200, {'Content-Type':'text-plain'})
//     respose.write('<h1>Hello World</h1>')
//     respose.end()
// } ).listen(8000)

// console.log('Server Listening on port 8000')

// With Express
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public_html'))
app.get('/',
    function (request, respose) {
        respose.writeHead(200, { 'Content-type': 'text/html' })
        respose.end('<h1>Hello Worlds</h1>')
    })
app.get('/byebye',
    function (request, respose) {
        respose.sendFile(path.join(__dirname, 'public_html', 'tables.html'))
    })
app.listen(8000, function () {
    console.log('Port Started at localhost:8000')
})
