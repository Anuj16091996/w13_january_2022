'use strict'

const fs = require('fs')

function getTable (fileName) {
    const tableData = fs.readFileSync(fileName, 'utf8')

    const getTableJSon = JSON.parse(tableData)

    return getTableJSon
}

function getRec (fileName, id) {
    const tableData = fs.readFileSync(fileName, 'utf8')
    const getTableJSon = JSON.parse(tableData)
    for (let i = 0; i < getTableJSon.length; i++) {
        if (getTableJSon[i].id === id) { return getTableJSon[i] }
        if (i === getTableJSon.length - 1) { throw new Error('id not found') }
    }
}
function saveTable (fileName, datas) {
    const datatoString = JSON.stringify(datas)
    fs.writeFile(fileName, datatoString)
}

function addRec (fileName, data) {
    const tableData = fs.readFileSync(fileName, 'utf8')
    const getTableJSon = JSON.parse(tableData)

    for (let i = 0; i < getTableJSon.length; i++) {
        if (getTableJSon[i].id === data.id) { throw new Error('id already exists') }
        if (i === getTableJSon.length - 1) {
            getTableJSon.push(data)
            const jsonDataString = JSON.stringify(getTableJSon)
            // console.log(jsonDataString)
            fs.writeFileSync(fileName, jsonDataString)
        }
    }
}
function updateRec (fileName, data) {
    let idExists = false
    const data = fs.readFileSync(fileName)
    const jsonDataArray = JSON.parse(data)
    for (let i = 0; i < jsonDataArray.length; i++) {
    if (newData.id === jsonDataArray[i].id) {
            jsonDataArray[i] = newData
            idExists = true
        }
    }
    if (idExists) {
        const jsonDataString = JSON.stringify(jsonDataArray)
        fs.writeFileSync(fileName, jsonDataString)
    } else {        throw 'id not found'}
}

module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec
}
