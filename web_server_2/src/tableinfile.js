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
    }
    return ''
}
function saveTable (fileName, datas) {
    const datatoString = JSON.stringify(datas)
    fs.writeFileSync(fileName, datatoString)
}

function addRec (fileName, data) {
    const tableData = fs.readFileSync(fileName, 'utf8')
    const getTableJSon = JSON.parse(tableData)
    console.log(getTableJSon)
    let check = true
    for (let i = 0; i < getTableJSon.length; i++) {
        if (getTableJSon[i].id === data.id) { check = false }
    }

    if (check === true) {
        getTableJSon.push(data)
        const jsonDataString = JSON.stringify(getTableJSon)
        // console.log(jsonDataString)
        fs.writeFileSync(fileName, jsonDataString)
    } else {
        return 1
    }
}
function updateRec (fileName, newData) {
    let idExists = false
    const data = fs.readFileSync(fileName)
    const jsonDataArray = JSON.parse(data)
    for (let i = 0; i < jsonDataArray.length; i++) {
        const number = Number(newData.id)
        if (number === jsonDataArray[i].id) {
            jsonDataArray[i] = newData
            idExists = true
        }
    }
    if (idExists) {
        const jsonDataString = JSON.stringify(jsonDataArray)
        fs.writeFileSync(fileName, jsonDataString)
    } else {
        return 1
    }
}

function deleteREC (fileName, id) {
    const tableData = fs.readFileSync(fileName, 'utf8')
    const getTableJSon = JSON.parse(tableData)
    let idExists = true
    function checkID (array) {
        if (array.id === id) { idExists = false }
    }
    getTableJSon.filter(checkID)

    if (!idExists) {
        function deletingRecord (array) {
            if (array.id !== id) return { id: array.id, userName: array.name, age: array.age }
        }
        const finalArray = getTableJSon.filter(deletingRecord)
        const jsonDataString = JSON.stringify(finalArray)
        fs.writeFileSync(fileName, jsonDataString)
    } else {
        return 1
    }
}

module.exports = {
    getTable: getTable,
    getRec: getRec,
    saveTable: saveTable,
    addRec: addRec,
    updateRec: updateRec,
    deleteREC: deleteREC
}
