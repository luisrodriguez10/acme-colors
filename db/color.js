const {conn} = require('./conn');
const { STRING } = conn.Sequelize;


const Color = conn.define('color', {
    name:{
        type: STRING,
        unique:true,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = {Color};