require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const MongoClient = require('mongodb').MongoClient;
const myurl = 'mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/users?retryWrites=true&w=majority'
let db = null 

const PORT = process.env.PORT || 5000

MongoClient.connect(myurl, { useUnifiedTopology: true }, (err,client) => {
    if (err) return console.log(err)
    db = client.db('test')
    console.log('connected to mongo DB')
})

try {
    mongoose.connect('mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
} catch (error) {
    console.log(' The mongoose clients has not connected and threw this error: ', error)
}

const ItemSchema = new mongoose.Schema({
    image: { data: Buffer, contentType: String }
});

app.use(bodyParser({limit: '100mb'}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

const getAllItems = async () => {
    return await db.collection('Items').find().toArray()
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/index.html'));
})

app.get('/items', (req,res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/listOfItems.html'));
})

app.get('/itemdesc', (req,res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/itemdesc.html'));
})

app.get('/itemlist', async (req,res) => {
    let items =  await getAllItems()
    res.json(items)
    res.end()
})

app.post('/', upload.single('MyImage'), async (req, res) => {
    if(fs.readFileSync(req.file.path) != undefined) {
        let img = fs.readFileSync(req.file.path);
        let name = req.body.name;
        let desc = req.body.decs;
        let price = req.body.price;
        let encode_image = img.toString('base64');
        /*const finalImg = {
            contentType: req.file.mimetype,
            image: new Buffer.from(encode_image,'base64')
        };*/
        let fullitem = {
            name:name,
            desc:desc,
            price:price,
            img: encode_image
        }
        db.collection('Items').insertOne(fullitem, (err, result) => {
    
            if(err) return console.log(err)
    
            console.log('saved to database')
            res.redirect('/items')
        })
    }
})

app.use(express.static(path.join(__dirname, 'Public/')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))