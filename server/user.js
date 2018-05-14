const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')

const User = models.getModel('user')
const _filter = { 'pwd': 0, '__v': 0 }

Router.get('/list', (req, res) => {
  const { type } = req.query
  // User.remove({}, (err, doc) => {}) // 删除 all
  User.find({type}, (err, doc) => {
    return res.json({code: 0, data: doc})
  })
})

Router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端(/info接口)出错了'})
    }
    return res.json({code: 0, data: doc})
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
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    userModel.save((err, doc) => {
      if (err) {
        return res.json({code: 1, msg: '后端出错'})
      }
      const { user, type, _id } = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data: { user, type, _id }})
    })
    // User.create({ user, type, pwd: md5Pwd(pwd) }, (err, doc) => { // 能弄到_id为啥用save方法
    //   console.log(doc)
    //   if (err) {
    //     return res.json({ code: 1, msg: '注册失败，后端服务错误' })
    //   }
    //   return res.json({ code: 0 })
    // })
  })
})

Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    if (err) {
      return { code: 0, msg: '后端服务错误' }
    }
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})

Router.post('/login', (req, res) => {
  const { user, pwd, type } = req.body  // bodyParser(npm包) 使 express 能解析 post 参数
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) { // 说明该用户已经注册
      return res.json({ code: 1, msg: '用户名不存在或者密码错误' })
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})

module.exports = Router