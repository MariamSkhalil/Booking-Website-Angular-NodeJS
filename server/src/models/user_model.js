const mongoose= require('mongoose');
const bcrypt= require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:["user", "admin"], //Allowed roles are either USER or ADMIN
        default: "user" //The default role is User
    }
})

//Hash the user's password before saving it to the database
userSchema.pre("save", async function (next) { 
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 10)
    }
    next()
})

//Check that the 'Confirm Password' equals the 'Password' field
userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}

const User= mongoose.model('User', userSchema)
module.exports= {User}