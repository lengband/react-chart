const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')

const User = models.getModel('user')

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})

Router.get('/info', (req, res) => {
  // 用户有没有cookie
  return res.json({
    code: 1
  })
})

function md5Pwd (pwd) {
  const salt = 'react_chat_webAPP_lengband@163.com'
  return utils.md5(utils.md5(pwd + salt))
}

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user }, (err, doc) => {
    if (doc) { // 说明该用户已经注册
      return res.json({ code: 1, msg: '用户名重复' })
    }
    User.create({ user, type, pwd: md5Pwd(pwd) }, (err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '注册失败，后端服务错误' })
      }
      return res.json({ code: 0 })
    })
  })
})
module.exports = Router