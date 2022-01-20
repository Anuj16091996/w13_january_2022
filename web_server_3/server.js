'use strict'
const express = require('express')
const app = express()

const cors = require('cors')
/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())
app.use(cors())
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.static('public_html'))

app.get('/offices', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from offices order by officecode ASC', function (offices) {
        const officeJSON = { offices: offices.rows }
        const officeJSONString = JSON.stringify(officeJSON, null, 4)

        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(officeJSONString)
        DB.disconnect()
    })
})

app.get('/offices/:id', function (request, response) {
    const userID = request.params.id

    const numberUserID = Number(userID)

    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('SELECT * from offices where officecode=$1', [numberUserID], function (offices) {
        const officeJSON = { offices: offices.rows }
        const officeJSONString = JSON.stringify(officeJSON)

        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(officeJSONString)
        DB.disconnect()
    })
})

app.post('/offices', function (request, response) {
    const userDetail = request.body
    userDetail.officecode = Number(userDetail.officecode)
    userDetail.phone = Number(userDetail.phone)
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('Insert into offices(officecode, city, phone, addressline1 , addressline2, state, country, postalcode,territory) values($1,$2,$3,$4,$5,$6,$7,$8,$9)', [userDetail.officecode, userDetail.city, userDetail.phone, userDetail.addressline1, userDetail.addressline2, userDetail.state, userDetail.country, userDetail.postalcode, userDetail.territory],
        function (resp) {
            if (resp === 1) {
                // set content type
                response.writeHead(403, { 'Content-Type': 'application/json' })
                // send out a string
                response.end('Data Already exists')
                DB.disconnect()
            } else {
                response.writeHead(200, { 'Content-Type': 'application/json' })
                // send out a string
                response.end('Data Added')
                DB.disconnect()
            }
        })
})

app.put('/offices/:id', function (request, response) {
    const userID = request.params.id
    const numberUserID = Number(userID)

    const userDetail = request.body
    console.log(userDetail)
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('SELECT * from offices where officecode=$1', [numberUserID], function (offices) {
        const officeJSON = offices.rowCount
        if (officeJSON === 0) {
            response.writeHead(403, { 'Content-Type': 'application/json' })
            // send out a string
            response.end('Data did not exists')
            DB.disconnect()
        } else {
            DB.queryParams('update offices set city=$2, phone=$3, addressline1=$4, addressline2=$5, state=$6 ,country=$7, postalcode=$8, territory=$9 where officecode=$1', [numberUserID, userDetail.city, userDetail.phone, userDetail.addressline1, userDetail.addressline2, userDetail.state, userDetail.country, userDetail.postalcode, userDetail.territory],
                function (resp) {
                    response.writeHead(200, { 'Content-Type': 'application/json' })
                    // send out a string
                    response.end('Data Updated')
                    DB.disconnect()
                })
        }
    })
})

app.delete('/offices/:id', function (request, response) {
    const userID = request.params.id

    const numberUserID = Number(userID)
    const DB = require('./src/dao')
    DB.connect()
    DB.queryParams('SELECT * from offices where officecode=$1', [numberUserID],
        function (offices) {
            const officeJSON = offices.rowCount
            if (officeJSON === 0) {
                response.writeHead(403, { 'Content-Type': 'application/json' })
                // send out a string
                response.end('Data did not exists')
                DB.disconnect()
            } else {
                DB.queryParams('delete  from offices where officecode=$1', [numberUserID],
                    function (resp) {
                        if (resp === 1) {
                            // set content type
                            response.writeHead(400, { 'Content-Type': 'application/json' })
                            // send out a string
                            response.end('Error in the database')
                        } else {
                            response.writeHead(200, { 'Content-Type': 'application/json' })
                            // send out a string
                            response.end('Data deleted')
                            DB.disconnect()
                        }
                    })
            }
        })
})

// Start Server
app.listen(8000, function () {
    console.log('Port Started at localhost:8000')
})
