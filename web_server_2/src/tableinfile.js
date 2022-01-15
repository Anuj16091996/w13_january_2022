'use strict'

const fs = require('fs')

function getTable (fileName) {
    const tableData = fs.readFileSync(fileName, 'utf8')

    const getTableJSon = JSON.parse(tableData)

    return getTableJSon
}

function getRec (fileName, id) {

}

function saveTable (fileName, datas) {

}

function addRec (fileName, data) {

}

function updateRec (fileName, data) {

}

module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec
}
