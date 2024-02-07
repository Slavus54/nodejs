const app = require('express')()
const fs = require('fs')
const {Client} = require('pg')

const file = '/src/plain-text.txt'
const data = require('./src/data.json')

const PORT = process.env.PORT || 4000

const client = new Client({
    database: 'node-test',
    user: 'postgres',
    password: 'Slavus54',
    host: 'localhost',
    port: 5432
})

client.connect()

client.query('Select * from student', (err, res) => {
    let students = res.rows

    // some operations with table data
})

// filesystem

let path = __dirname + file

let file_buffer = fs.readFileSync(path, 'utf-8')
let str = file_buffer.toString()

console.log('Length of file: ', str.length)

let lines = str.split('\n').filter(line => !!line)

// delete next line HTML tag

lines = lines.map(el => el.split('<br />')[0])

fs.writeFileSync(path, lines.join('\n'))

let result = data.filter(el => el.rating > 80)

// university structures with high rating

console.log(result)

app.listen(PORT, () => console.log(`Node Server started on ${PORT} port`))