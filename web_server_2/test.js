'use strict'

const tableData = require('./src/tableinfile')
console.log('Debug')
// const fs = require('fs')
// // const assert = require('assert')
// // const JsonData = fs.readFileSync('users.json', 'utf8')

// // const FinalData = [
// //     {
// //         id: 100,
// //         userName: 'mvachon',
// //         age: 12
// //     },
// //     {
// //         id: 101,
// //         userName: 'jcote',
// //         age: 66
// //     },
// //     {
// //         id: 102,
// //         userName: 'pmartineau',
// //         age: 99
// //     },
// //     {
// //         id: 103,
// //         userName: 'mvachon',
// //         age: 12
// //     }
// // ]
// assert.deepStrictEqual(JsonData, FinalData)

console.log(tableData.getTable('users.json'))
console.log(tableData.getRec('users.json', 101))
// const saveTable = {
//     title: 'Meeting',
//     description: 'Meeting John Doe at 10:30 am'
// }
//
const NewEntry =
    {
        id: 104,
        userName: 'Anuj',
        age: 25
    }

// tableData.addRec('users.json', NewEntry)
tableData.saveTable('users.json', NewEntry)
tableData.updateRec('users.json', NewEntry)
