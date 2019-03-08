const goods = require('./mock/index.json')
const status = require('./mock/login.json')

module.exports = {
  devServer: {
    before: (app) => {
      app.post('/api/userStatus', function (req, res, next) {
        console.log(goods)
        res.json(goods)
      })
    }
  }
}

module.exports = {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
}

module.exports = {
  runtimeCompiler: true
}


module.exports = {
  devServer: {
    before: (app) => {
      app.post('/api/login', function (req, res, next) {
        res.json(status)
      })
    }
  }
}