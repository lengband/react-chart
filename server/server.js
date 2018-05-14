const express = require('express')
const utils = require('utility')
const bodyParser = require('body-parser') // 使 express 能解析 post 参数
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter) // 中间件, 如果是路由配置第一个参数写url

app.listen(9093, function () {
  console.log('app start at 9093')
})