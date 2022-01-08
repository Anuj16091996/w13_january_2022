 'use strict'

let http=require('http')

// create a server Object
http.createServer(function (request, respose){
    respose.writeHead(200, {'Content-Type':'text-plain'})
    respose.write('<h1>Hello World</h1>')
    respose.end()
} ).listen(8000)

console.log('Server Listening on port 8000')