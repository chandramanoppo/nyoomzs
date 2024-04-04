const cors = require('cors')

const express = require('express')

const app = express()

const PORT = 3000

const errorHandler = require('./middlewares/errorhandler')

const routers = require('./router/index')

app.use(cors())

app.use(express.urlencoded({extended : true}))

app.use(express.json())

app.use(routers)

app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`Group Project testing % ${PORT}`);
})

module.exports = app