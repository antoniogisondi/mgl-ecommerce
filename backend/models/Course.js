const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: {type: String},
    price: { type: Number, required: true },
    image: {type: String, default: ''},
    date: {type: String}, // o Date
    mode: { type: String, enum: ['online', 'in presenza', 'blended'] },
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);