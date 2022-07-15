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

app.post('/api/colors', async(req, res, next) =>{
    try {
        res.status(201).send(await Color.create(req.body));
    } catch (ex) {
        next(ex)
    }
})

app.put(`/api/colors/:id`, async(req, res, next) =>{
    try {
        const color = await Color.findByPk(req.params.id);
        await color.update(req.body)
        res.send(color)
    } catch (ex) {
        next(ex)
    }
})

app.delete(`/api/colors/:id`, async(req, res, next) =>{
    try {
        const color = await Color.findByPk(req.params.id);
        await color.destroy()
        res.sendStatus(204)
    } catch (ex) {
        next(ex)
    }
})

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500).send(err);
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