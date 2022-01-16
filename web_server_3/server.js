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

// Start Server
app.listen(8000, function () {
    console.log('Port Started at localhost:8000')
})
