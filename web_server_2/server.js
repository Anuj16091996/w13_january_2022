'use strict'

const tableData = require('./src/tableinfile')
console.log('Debug')

console.log(tableData.getTable('users.json'))
console.log(tableData.getRec('users.json', 101))
// const saveTable = {
//     title: 'Meeting',
//     description: 'Meeting John Doe at 10:30 am'
// }
// tableData.saveTable('users.json', saveTable)
// const NewEntry =
//     {
//         id: 104,
//         userName: 'mvachon',
//         age: 12
//     }

// tableData.addRec('users.json', NewEntry)
