const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String, // breve descrizione aggiuntiva
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: String, // es. "8 ore", "2 giorni"
    modality: {
        type: String,
        enum: ['online', 'in presenza', 'blended'],
        required: true
    },
    location: String, // es. "Sede MGL - Lavello", solo se in presenza
    image: String, // es. "/uploads/nomefile.jpg"
    categories: [String], // es. ["Sicurezza", "Privacy"]
    published: {
        type: Boolean,
        default: true
    },
}, {timestamps: true});

module.exports = mongoose.model('Course', CourseSchema);
