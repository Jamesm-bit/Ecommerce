require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const fs = require('fs')
const sharp = require('sharp')
const ejs = require('ejs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb')
const myurl = 'mongodb+srv://JamesMorris:Password123@practicecluster.yr6ww.mongodb.net/users?retryWrites=true&w=majority'
let db = null

require('./passport-setup.js')

app.use(bodyParser({ limit: '100mb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.set('veiw engine', 'ejs')
const PORT = process.env.PORT || 5000

MongoClient.connect(myurl, { useUnifiedTopology: true }, (err, client) => {
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

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const User = mongoose.model('User', userSchema)

const getAllItems = async () => {
    return await db.collection('Items').find().toArray()
}

const getOneItem = async (inID) => {
    let o_id = new mongo.ObjectID(inID)
    return await db.collection('Items').find({ '_id': o_id }).toArray()
}

// used to get all users in the database
async function getAllUsers() {
    return await User.find()
}

//used to sheck if an inputted user is in the database and if it is send an access token to the html
async function checkforuser(userName, userPassword, userEmail) {
    let usersList = await getAllUsers()
    let user = {
        userName,
        userEmail
    }
    let checkForUser = await User.findOne({ username: userName })
    if (checkForUser != null) {
        return new Promise((resolve, reject) => {

            bcrypt.compare(userPassword, checkForUser.password, function (err, result) {
                if (result) {
                    try {
                        const token = jwt.sign({ user }, 'secretkey')
                        resolve(token)
                    } catch {
                        reject('An error occured getting the token')
                    }
                } else {
                    resolve('unable to get the user')
                }
            })
        })
    } else {
        return ('the user was not found')
    }
}

//adds the user to the database
async function addUser(userName, userPassword, userEmail) {
    const user = new User({
        username: userName,
        password: userPassword,
        email: userEmail
    })
    try {
        const result = await user.save()
    } catch (err) {
        console.log('There was an error when adding the name to the data base and it threw this error: ', err)
    }
}

//looks for the requested user in the data base and if the function cant find it then the function adds the user to the database
async function findUser(res, userName, userPassword, userEmail) {
    console.log(userName)
    const userNameFind = await User.find({ user: userName })
    const userEmailFind = await User.find({ email: userEmail })
    if (userNameFind.length == 0 && userEmailFind.length == 0) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(userPassword, salt, function (err, hash) {
                addUser(userName, hash, userEmail)
            })
        })
    } else {
        res.end()
    }
    res.redirect('http://localhost:5000/')
}

//sends the html for the home screen to the browser
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/index.html'));
})

//when signing in it checks if the provided username is inputted
app.post('/', async (req, res) => {
    let returnedtoken = await checkforuser(req.body.username, req.body.password, req.body.email)
    res.json(returnedtoken)
})

//sends the list of all the users in the database to the browser
app.get('/users', async (req, res) => {
    const allUsers = await getAllUsers()
    res.json(allUsers)
})

//sends the html for the sign up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/signup.html'));
})

//when a user signs up it takes the inputted username, password and email
app.post('/signup', (req, res) => {
    findUser(res, req.body.username, req.body.password, req.body.email)
})

//used for the google authentication
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

//used for the facebook authentication
app.get('/facebook', passport.authenticate('facebook'))

//used for the github authentication
app.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

//used to tell the user they are signed in
app.get('/signedin', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/external.html'))
})

//verifys the token sent and if it is good it redirects to the signed in screen
app.get('/homesignin', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/dashboard.html'));
})

app.get('/additems', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/additem.html'));
})

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/cartCheckout.html'));
})

app.get('/items', async (req, res) => {
    let items = await getAllItems()
    res.render(path.join(__dirname, './Public/HTML/listofEJSitem.ejs'), { initems: items });
})

app.get('/itemdesc', (req, res) => {
    res.sendFile(path.join(__dirname, './Public/HTML/itemdesc.html'));
})

app.get('/itemlist', async (req, res) => {
    let items = await getAllItems()
    res.json(items)
    res.end()
})

app.get('/items/:id', async (req, res) => {
    let idnum = req.params.id.split(' ')
    let foundItem = await getOneItem(idnum[0])
    res.render(path.join(__dirname, './Public/HTML/itemdescEJS.ejs'), { initems: foundItem });
})

app.post('/delete', async (req, res) => {
    console.log(req.body.id)
    let d_id = new mongo.ObjectID(req.body.id)
    let DelID = { '_id': d_id }
    db.collection('Items').deleteOne(DelID, (err, resolve) => {
        console.log('deleted')
    })
    res.redirect('/items')
})

app.post('/update', upload.single('MyImage'), async (req, res) => {
    console.log(req.body)
    if (fs.readFileSync(req.file.path) != undefined) {
        let img = fs.readFileSync(req.file.path);
        img = await sharp(img).resize(200, 100, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        }).png().toBuffer()
        let encode_image = img.toString('base64');
        let u_id = new mongo.ObjectID(req.body.id)
        let updateID = { '_id': u_id }
        let updateValues = { 'name': req.body.name, 'desc': req.body.desc, 'price': req.body.price, 'img': encode_image }
        let newValues = {
            $set: updateValues
        }
        db.collection('Items').updateOne(updateID, newValues, (err, resolve) => {
            console.log('updated')
        })
        res.redirect('/items')
    }

})

app.post('/additem', upload.single('MyImage'), async (req, res) => {
    if (fs.readFileSync(req.file.path) != undefined) {
        let img = fs.readFileSync(req.file.path);
        img = await sharp(img).resize(200, 100, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        }).png().toBuffer()
        let name = req.body.name;
        name = name.trim()
        let desc = req.body.decs;
        desc = desc.trim()
        let price = req.body.price;
        price = price.trim()
        let encode_image = img.toString('base64');
        let fullitem = {
            name: name,
            desc: desc,
            price: price,
            img: encode_image
        }

        db.collection('Items').insertOne(fullitem, (err, result) => {

            if (err) return res.json(err)

            console.log('saved to database')
            res.redirect('/items')
        })
    }
})

app.use(express.static(path.join(__dirname, 'Public/')))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))