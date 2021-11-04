const express = require('express')
const app = express()
//const cors = cors()
const path = require('path')

const {Server : IOServer} = require('socket.io')
const {Server : HttpServer} = require('http')
const {v4 : uuid} = require('uuid')

const products = []
const messages = []

const server = new HttpServer(app)
const io = new IOServer(server)


io.on('connection', (socket)=>{
    socket.emit('server:loadnotes', products)
    socket.on('client:newnote', (data) =>{
        const product = {
            title: data.title,
            price: data.price,
            id: uuid()
        }
        products.push(product)
        io.sockets.emit('server:newnote', product)
    })

    socket.emit('server:loadmessages', messages)
    socket.on('client:newmessage', data => {
        const message = {
            email: data.email,
            message: data.message,
            date: new Date().toLocaleString()
        }

        messages.push(message)
        io.sockets.emit('server:newmessage', message)
    })
})



const PORT = 3000

//app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", express.static(path.join(__dirname + '/public')))


app.get('/', (req, res) => {
    console.log('entra en get')
    res.render('index')
})
app.set('view engine', 'ejs')
app.set('views', './public')


server.listen(PORT, ()=> {
    console.log(`Estas conectado a http://localhost:${PORT}`)
})

