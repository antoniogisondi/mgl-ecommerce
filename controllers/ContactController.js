const ContactRequest = require('../models/ContactRequest')
const sendContactEmail = require('../utils/sendMail')

const getAllRequests = async (req,res) => {
    try {
        const requests = await ContactRequest.find().populate('courseId')
        .sort({createdAt: -1})

        res.render('admin/requests/view-requests', {requests})
    } catch (error) {
        console.error('Errore nel recupero delle richieste:', error);
        res.status(500).send('Errore del server');
    }
}

const sendContactRequest = async (req,res) => {
    try {
        const { name, surname, email, phone, message, course, courseId } = req.body;

        if ( !name || !surname || ! email || !phone || !message ) {
            return res.status(400).json({ error: 'Dati corso mancanti' });
        }

        const newRequest = new ContactRequest({
            name,
            surname,
            email,
            phone,
            message,
            course,
            courseId,
        });

        await newRequest.save()

        const populatedRequest = await ContactRequest.findById(newRequest._id).populate('courseId')

        await sendContactEmail({ name, surname, email, phone, message, course, courseId: populatedRequest.courseId })

        res.status(200).json({message: 'Richiesta inviata con successo'})
    } catch (error) {
        console.error('Errore salvataggio richiesta:', error);
        res.status(500).json({ error: 'Errore durante l’invio della richiesta' });
    }
}

module.exports = {
    sendContactRequest, getAllRequests
}