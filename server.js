const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
  client: 'pg', //This is postgres as said on Knex website
  connection: {
    host : '127.0.0.1', //This means localhost 
    user : 'amr', //Here you need to enter the name of user in Database
    password : 'CITad3llePOSTGRES', //This is the password to my Database
    database : 'smart-brain' //Here the name of the database
  }
});

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!


app.get('/', (req, res)=> { res.send('It is working') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) //Here we seperated it in a different file so that we clean the code and seperate the logic
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) }) //Here we add the Clarifai/Api we used to the back end so that it's more secure, and the Api Key is protected

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})
