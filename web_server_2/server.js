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

const tableInFile = require('./src/tableinfile')
const fileName = 'users.json'

app.get('/users', function (req, response) {
    const userData = tableInFile.getTable(fileName)
    if (Object.keys(userData).length !== 0) {
        const userString = JSON.stringify(userData)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(userString)
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end('File Missing')
    }
})

app.get('/users/:id',
    function (request, response) {
        const userID = request.params.id
        const numberUserID = Number(userID)
        const userData = tableInFile.getRec(fileName, numberUserID)
        if (Object.keys(userData).length === 0) {
            response.writeHead(404, { 'Content-Type': 'text/html' })
            response.end('ID Not Found')
        } else {
            const userString = JSON.stringify(userData)
            // set content type
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a string
            response.end(userString)
        }
    })

app.post('/users', function (request, response) {
    const userDetail = request.body
    console.log(userDetail)
    const addRecordUser = tableInFile.addRec(fileName, userDetail)
    if (addRecordUser === 1) {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end('ID Already Exits')
    } else {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end('User Added')
    }
})

app.put('/users/:id', function (request, response) {
    const userID = request.params.id
    const userDetail = request.body

    const numberUserID = Number(userID)

    const updatedUser = { id: numberUserID, ...userDetail }

    const updateUser = tableInFile.updateRec(fileName, updatedUser)
    if (updateUser === 1) {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end('ID does not exists ')
    } else {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end('User Added')
    }
})

app.delete('/users', function (request, response) {
    const userDetail = Number(request.body.id)
    console.log(typeof userDetail)
    const addRecordUser = tableInFile.deleteREC(fileName, userDetail)
    if (addRecordUser === 1) {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end('ID Already Exits')
    } else {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end('User Added')
    }
    response.end('Deleted')
})

app.listen(8000, function () {
    console.log('Port Started at localhost:8000')
})
