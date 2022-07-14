const express = require('express');
const app = express();
const {seeder} = require('./db/index');
const path = require('path');
const {Color} = require('./db/color')

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/colors', async(req, res, next) =>{
    try {
        res.send(await Color.findAll());
    } catch (ex) {
        next(ex)
    }
})



const init = async() =>{
    try {
        await seeder();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`app listening on ${port}`));
    } catch (ex) {
        console.log(ex)
    }
}

init();