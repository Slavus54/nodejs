require('dotenv').config()
const app = require('express')()
const http = require('http')
const cors = require('cors')
const fs = require('fs')
const {Client} = require('pg')

const file = '/api/plain-text.txt'
const data = require('./api/data.json')
const towns = require('./api/towns.json')

app.use(cors())

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

// API&SSE

const sse = (req, res) => {
    res.setHeader('Content-Type', "text/html")
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    let id = 0
    let town = ''

    setInterval(() => {
        town = towns[parseInt(towns.length * Math.random())].title

        res.write(`data: some data ${town} \n`)
        res.write(`id: ${++id} \n`)
        res.write("\n")
    }, 1000)
}

http.createServer((req, res) => {
    sse(req, res)
}).listen(process.env.PORT)

app.get('/towns', async (req, res) => {
    res.send(towns)
})

app.listen(process.env.NODE_PORT, () => console.log(`Node Server started on ${process.env.NODE_PORT} port`))
