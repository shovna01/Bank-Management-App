const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({ //userSchema is an instance
    accountnumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    messages: [
        {
            accountnumber: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});



//hashing
userSchema.pre('save', async function(next){
    console.log("Hello from userSchema auth");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//generate jwt
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id}, process.env.SECRET_KEY) //matching ids from register and login
        this.tokens = this.tokens.concat({token : token}); //tokens is the array defined in the schema, the 1st token is the token under the tokens array above, and the 2nd token is the token generated formt he above line of code and this token is to be added to the array of tokens in the mentioned format in token under tokens
        await this.save(); // saving after adding
        return token; //return the token to get it in the auth file in userLogin()
    }catch(err){
        console.log(err);
    }
}

//store the message in db
userSchema.methods.addMessage = async function(name, email, phone, accountnumber, message){
    try {
        this.messages = this.messages.concat({name, email, phone, accountnumber, message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;