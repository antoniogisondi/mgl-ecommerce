const mongoose = require('mongoose');

const professionalCourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: String,
    description: String,
    price: Number,             // 0 se gratuito
    duration: String,
    modality: String,
    location: String,
    trainingType: {
        type: String,
        enum: ['gol', 'pagamento'],
        required: true
    },
    courseCategory: String,    // es. 'Competenze Digitali', 'OSS', 'Grafica'
    image: String,
}, {timestamps: true});

module.exports = mongoose.model('ProfessionalCourse', professionalCourseSchema);
