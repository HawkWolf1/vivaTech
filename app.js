const express = require('express')
const app = express() 
const cors = require('cors')
const bodyParser = require('body-parser') 
const sequelize = require('./util/database')
const userRoutes = require('./routes/user')
const userTable = require('./models/userTable')
const otpTable = require('./models/otpTable')

app.use(cors())
app.use(bodyParser.json({extended: false})) 

app.use(userRoutes) 




sequelize.sync().then(() => {
    app.listen(4000)
    console.log('server running: 4000')
})
.catch((err) => console.log(err))