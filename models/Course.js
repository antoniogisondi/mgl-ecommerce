const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    duration: String,
    modality: String,
    location: String,
    category: {
        type: String,
        enum: [
            'Formazione generale e specifica lavoratori',
            'Antincendio',
            'Primo soccorso',
            'HACCP e igiene alimentare',
            'Attrezzature da lavoro (Accordo Stato-Regioni 2012)',
            'Lavori in quota e DPI',
            'Aggiornamento obbligatorio'
        ],
        required: true
    },
    subCategory: [String], // es: "rischio medio", "carrelli", "DPI III cat"
    image: String,
}, {timestamps: true});

module.exports = mongoose.model('Course', CourseSchema);