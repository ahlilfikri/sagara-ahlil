const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, default: null },
}, { timestamps: true })

const user = mongoose.model('user', userSchema);

module.exports = user;
