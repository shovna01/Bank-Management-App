const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
const cookieParser = require('cookie-parser');

require('../db/connection');
const User = require('../model/userSchema');

// router.get('/', (req, res) => {
//     res.send('Hello World from the router');
// });

router.use(cookieParser());


//signup route

router.post('/register', async(req, res) => {
    const {accountnumber, name, email, phone, password, cpassword} = req.body;
    
    if(!accountnumber || !name || !email || !phone || !password || !cpassword){
        return res.status(422).json({error : "Please fill in all the fields" });
    }

    try{
        
        const userExists = await User.findOne({email : email});
        
        if(userExists){
            return res.status(422).json({error : "Email already exists" });
        }else if(password != cpassword){
            return res.status(422).json({error : "Wrong Password" });
        }else{
            const user = new User({accountnumber, name, email, phone, password, cpassword});

            await user.save();
            res.status(201).json({message : "User registered successfully"});
        } 

    }catch(err){
        console.log(err);
    }

});


//login route

router.post('/signin', async(req, res) => {
    //console.log(req.body);

    try{
        let token;

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error : "Please fill in the data"})
        }

        const userLogin = await User.findOne({email : email}); //matching the email

        //console.log(userLogin);

        if(userLogin){
            token = await userLogin.generateAuthToken(); //getting the token saved for the required id in the userSchema generateAuthToken where token is returned
            //console.log(token);

            res.cookie("jwtBankToken", token, {
                expires : new Date(Date.now() + 172800000),
                httpOnly : true //where the app and the token and cookie parts will run
            });
            
            const isMatch = await bcrypt.compare(password, userLogin.password); //pw during login vs pw stored in db for the same email matched as above
            if(!isMatch){
                res.status(400).json({error : "Invalid Credentials"}); //error for unmatched pw
            }else{
                res.json({message : "User signed in successfully"});
            }
        }else{
            res.status(400).json({error: "Invalid Credentials"}); //error for unmatched emails
        }
        

    }catch(err){
        console.log(err);
    }
});

router.get('/about', authenticate, (req, res) => {
    console.log("Hello about page");
    res.send(req.rootUser);
});

//get userData for contact and home page
router.get('/getdata', authenticate, (req, res) => {
    console.log("Hello Contact and home page");
    res.send(req.rootUser);
});

router.post('/contact', authenticate, async(req, res) => {
    try {
        const {name, email, phone, accountnumber, message} = req.body;

        if(!name || !email || !phone || !accountnumber || !message){
            console.log("Error in Contact Form");
            return res.json({error: "Kindly fill the contact form if you wish to send a message"});
        }

        const userContact = await User.findOne({_id:req.userID});

        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, accountnumber, message);

            await userContact.save();

            res.status(201).json({message: "message has been sent to the db successfully"});
        }

    } catch (error) {
        console.log(error);
    }
});

//Logout page
router.get('/logout', (req, res) => {
    console.log("Hello Logout page");
    res.clearCookie('jwtBankToken', {path:'/'});
    res.status(200).send('User Logged out');
});



module.exports = router;