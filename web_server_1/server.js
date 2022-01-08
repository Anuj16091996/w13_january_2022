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

app.get('/test_param/:a/:b',
    function (request, response) {
        console.log(request.params.a)
        console.log(request.params.b)
        response.send('Parameters recived')
    })

app.set('view engine', 'ejs')

app.get('/products', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'Product Catalog-blabla.com'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'
    const products = [
        { id: 1, name: 'white shoes', price: '99.99' },
        { id: 2, name: 'black shoes', price: '69.99' },
        { id: 3, name: 'blue shoes', price: '79.99' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '<td>' + products[i].price + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})

app.get('/seasons', function (req, res) {
    const pageData = {} // initialize empty object
    pageData.title = 'List of All Seasons'
    pageData.description = 'Huge selection of products for all your needs'
    pageData.author = 'The blabla.com team'
    const products = [
        { id: 1, name: 'Winter' },
        { id: 2, name: 'Summer' },
        { id: 3, name: 'Fall' },
        { id: 4, name: 'Spring' }
    ]
    pageData.content = '<table>'
    for (let i = 0; i < products.length; i++) {
        pageData.content += '<tr><td>' + products[i].id + '</td>'
        pageData.content += '<td>' + products[i].name + '</td>'
        pageData.content += '</tr>'
    }
    pageData.content += '</table>'
    res.render('master_template', pageData)
})
// Start Server
app.listen(8000, function () {
    console.log('Port Started at localhost:8000')
})
