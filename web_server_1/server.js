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

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form')
        }
    }
)

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

app.get('/byebye/:a',
    function (request, response) {
        console.log(request.params.a)
    })

// Start Server
app.listen(8000, function () {
    console.log('Port Started at localhost:8000')
})
