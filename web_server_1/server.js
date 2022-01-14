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
const cors = require('cors')
/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())
app.use(cors())
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

const DB = require('./src/dao')

app.get('/orders',
    function (request, response) {
        DB.connect()
        DB.query('Select * from orders',
            function (results) {
                const pageData = {} // initialize empty object
                pageData.title = 'List Of orders'
                pageData.description = 'Huge selection of products for all your needs'
                pageData.author = 'Anuj Narang'
                pageData.content = '<table>'
                for (let i = 0; i < results.rows.length; i++) {
                    pageData.content += '<tr>'
                    pageData.content += '<td>' + results.rows[i].ordernumber + '</td>'
                    pageData.content += '<td>' + results.rows[i].orderdate + '</td>'
                    pageData.content += '<td>' + results.rows[i].requireddate + '</td>'
                    pageData.content += '<td>' + results.rows[i].shippeddate + '</td>'
                    pageData.content += '<td>' + results.rows[i].status + '</td>'
                    pageData.content += '<td>' + results.rows[i].comments + '</td>'
                    pageData.content += '<td>' + results.rows[i].customernumber + '</td>'
                    pageData.content += '</tr>'
                }
                pageData.content += '</table>'
                response.render('master_template', pageData)
                DB.disconnect()
            })
    })

app.post('/customer_validate',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const customerID = request.body.customer
        // process form, validate data …
        if (customerID === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            DB.connect()
            DB.queryParams('select * from customers where customernumber=$1', [customerID],
                function (results) {
                    if (results.rowCount === 0) {
                        response.writeHead(400, { 'Content-Type': 'text/html' })
                        response.end('Customer not found')
                        DB.disconnect()
                    } else {
                        const pageData = {} // initialize empty object
                        pageData.title = 'List Of orders'
                        pageData.description = 'Huge selection of products for all your needs'
                        pageData.author = 'Anuj Narang'
                        pageData.content = '<table>'
                        for (let i = 0; i < results.rows.length; i++) {
                            pageData.content += '<tr>'
                            pageData.content += '<td>' + results.rows[i].customernumber + '</td>'
                            pageData.content += '<td>' + results.rows[i].customername + '</td>'
                            pageData.content += '<td>' + results.rows[i].contactlastname + '</td>'
                            pageData.content += '<td>' + results.rows[i].contactfirstname + '</td>'
                            pageData.content += '<td>' + results.rows[i].phone + '</td>'
                            pageData.content += '<td>' + results.rows[i].addressline1 + '</td>'
                            pageData.content += '<td>' + results.rows[i].addressline2 + '</td>'
                            pageData.content += '</tr>'
                        }
                        pageData.content += '</table>'
                        response.render('master_template', pageData)
                        DB.disconnect()
                    }
                })
        }
    }
)

// for AJAX tests, returns the list of customers in a JSON string
app.get('/customers', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers', function (customers) {
        const customersJSON = { customers: customers.rows }
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(customersJSONString)
    })
})

app.get('/employees', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from employees', function (employee) {
        const employeeJSON = { employee: employee.rows }
        const employeeJSONString = JSON.stringify(employeeJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(employeeJSONString)
    })
})

// delete one customer
// note you cannot delete customers with orders
// to know customers that don't have an order run this query
// SELECT * from customers
// LEFT JOIN orders on customers.customernumber = orders.customernumber
// WHERE ordernumber IS NULL
// ORDER BY customers.customernumber ASC
// result: you can delete customernumber 477,480,481 and others
app.delete('/customers/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('DELETE from customers WHERE customernumber=$1', [id], function (customers) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        // send out a string
        response.end('OK customer deleted')
    })
})

// Start Server
app.listen(8000, function () {
    console.log('Port Started at localhost:8000')
})
