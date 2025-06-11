const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: { type: String, required: true },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'courseModel'
    },
    courseModel: {
        type: String,
        required: true,
        enum: ['Course', 'ProfessionalCourse']
    },
}, {timestamps: true});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);

