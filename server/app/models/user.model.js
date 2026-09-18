import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },
    role: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    }
})


const User = mongoose.model('user', userSchema);
export default User;

