const mongoose = require('mongoose')

// 连接 mongo, 并且使用 imooc 集合
const DB_URL = 'mongodb://localhost:27017/react-chat'
mongoose.connect(DB_URL)

const models = {
  user: { // 字段
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    'avatar': { type: String }, // 头像
    'desc': { type: String }, // 个人简介或者职位简介
    'title': { type: String }, // 职位名
    // 如果你是 boss 还有两个字段
    'company': { type: String },
    'money': {type: String}
  },
  chat: {
  }
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel (name) { // 类似于 mysql 的表, mongo 里有集合的概念
    return mongoose.model(name)
  }
}
