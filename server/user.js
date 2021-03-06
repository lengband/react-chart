const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')

const _filter = { 'pwd': 0, '__v': 0 }

function md5Pwd (pwd) {
  const salt = 'react_chat_webAPP_lengband@163.com'
  return utils.md5(utils.md5(pwd + salt))
}

Router.get('/list', (req, res) => {
  const { type } = req.query
  // User.remove({}, (err, doc) => {}) // 删除 all
  if (!type) {
    User.find({}, (err, doc) => {
      return res.json({code: 0, data: doc})
    })
  } else {
    User.find({type}, (err, doc) => {
      return res.json({code: 0, data: doc})
    })
  }
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
    // User.create({ user, type, pwd: md5Pwd(pwd) }, (err, doc) => { // 能弄到_id为啥用save方法 create 和 save 的区别
    //   console.log(doc)
    //   if (err) {
    //     return res.json({ code: 1, msg: '注册失败，后端服务错误' })
    //   }
    //   return res.json({ code: 0 })
    // })
  })
})

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid
  User.find({}, (err, userdoc) => {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    Chat.find({'$or': [{from: user}, {to: user}]}, (err, doc) => { // ??? 为什么 from to 是一个人
      if (!err) {
        return res.json({ code: 0, msg: doc, users: users })
      }
    })
  })
})

Router.post('/readmsg', (req, res) => {
  const userid = req.cookies.userid // 当前登录人
  const { from } = req.body // 接收到消息的那个人
  Chat.update({
    from, to: userid},
    {'$set': {read: true}},
    {'multi': true},
    (err, doc) => {
      // console.log(doc) // -> { n: 1, nModified: 1, ok: 1 } {共查询多少条，修改了多少条，ok=1表示成功}
      if (!err) {
        return res.json({code: 0, num: doc.nModified})
      }
      return res.json({code: 1, msg: '修改失败'})
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