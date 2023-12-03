const mongoose = require("mongoose");
const bcrypt = require("bcrypt") // bcrypt şifreyi şifreliyo

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    role:{
        type:String,
        default:"user"
    }
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return user;
        } else {
            throw new Error("Incorrect password");
        }
    } else {
        throw new Error("User not found");
    }
};


userSchema.pre('save', async function(next){ // async await öncelikli kod bloğu
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()

})
                             

const User = new mongoose.model('user',userSchema)

module.exports = User;