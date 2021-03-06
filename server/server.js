const express = require('express')
const utils = require('utility')
const bodyParser = require('body-parser') // 使 express 能解析 post 参数
const cookieParser = require('cookie-parser')
const models = require('./model')
const Chat = models.getModel('chat')
const app = express()
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
// Chat.remove({}, () => {})
io.on('connection', socket => {
  socket.on('sendmsg', data => {
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, create_time: +new Date(), content: msg}, (err, doc) => {
      if (!err) {
        io.emit('recvmsg', Object.assign({}, doc._doc))
      }
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter) // 中间件, 如果是路由配置第一个参数写url

server.listen(9093, function () {
  console.log('app start at 9093')
})
