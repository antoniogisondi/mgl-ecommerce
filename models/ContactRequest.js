const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: { type: String, required: true },
    course: String,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfessionalCourse'
    },
}, {timestamps: true});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);

