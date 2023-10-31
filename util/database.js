const Sequelize = require('sequelize')


const sequelize = new Sequelize('vivatech', 'root', 'Bucketone23@', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize