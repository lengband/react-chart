package.json


1、"babel-plugin-import"  antd-mobile按需加载插件(需要在package.json中的babel 下面配置如下代码)
"plugins": [
  [
    "import",
    {
      "libraryName": "antd-mobile",
      "style": "css"
    }
  ]
]
2、utility MD5加密库



小坑
1、在当前页面聊天是清空未读消息要在退出时发请求