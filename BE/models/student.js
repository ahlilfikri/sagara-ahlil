const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    instance: { type: String, required: true },
    status: { type: Boolean, required: true, default: false},
    group: { type: String, required: true },
}, { timestamps: true })

const student = mongoose.model('student', studentSchema);

module.exports = student;
