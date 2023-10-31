const jwt = require('jsonwebtoken')
const User = require('../models/userTable')

const authenticate = async (req,res,next) => {

    try {
        const token = req.header('Authorization')
        console.log(token)
        const user = jwt.verify(token, 'Rockettt')
        console.log(user.userId)
        const newUser = await User.findByPk(user.userId)
            console.log(JSON.stringify(newUser))

            req.user = newUser 
            next()  
        }catch(err) {
        console.log(err)
        return res.status(401).json({success:false})
    }
}

module.exports = {
    authenticate
}