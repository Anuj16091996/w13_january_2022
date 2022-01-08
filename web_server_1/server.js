 'use strict'

// let http=require('http')

// // create a server Object
// http.createServer(function (request, respose){
//     respose.writeHead(200, {'Content-Type':'text-plain'})
//     respose.write('<h1>Hello World</h1>')
//     respose.end()
// } ).listen(8000)


// console.log('Server Listening on port 8000')

let express=require('express')
let app=express()

app.get('/',
function(request, respose){
respose.send('<h1>Hello Worlds</h1>')
})

app.listen(8000, function(){
console.log('Port Started at localhost:8000')
})