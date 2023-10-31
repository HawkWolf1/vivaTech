const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const otpTable = sequelize.define('OTP', {
    
    email: {
        type: Sequelize.STRING,
        unique: true

    },
    otp: {
        type: Sequelize.INTEGER,
        
    },
    
        
    
},
{
    timestamps: false
}
)   

module.exports = otpTable