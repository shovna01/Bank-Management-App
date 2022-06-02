const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
require('./db/connection');
// const User = require('./model/userSchema');

app.use(express.json());
app.use(require('./router/auth'));

const PORT = process.env.PORT || 3000;


//Middlewares

// const middleware = (req, res, next) => {
//     console.log("Hello middleware");
//     next();
// }



// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.get('/about', middleware, (req, res) => {
//     res.send('Hello World! This is the about page');
// });

// app.get('/contact', (req, res) => {
//     //res.cookie("Test", "test_cookie")
//     res.send('Hello World! This is the contact page');
// });

app.get('/signin', (req, res) => {
    res.send('Hello World! This is the signin page');
});

app.get('/signup', (req, res) => {
    res.send('Hello World! This is the registration/signup page');
});

if (process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//mongodb+srv://shovna:<password>@cluster0.ll2kj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority