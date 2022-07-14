const {conn} = require('./conn');
const {Color} = require('./color');

const seeder = async() =>{
    await conn.sync({force: true});
    const colors = await Promise.all(
        ['dodgerBlue', 'cornSilk', 'tomato'].map(name => Color.create({name}))
    )
}

module.exports = {seeder};