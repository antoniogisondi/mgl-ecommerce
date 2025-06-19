const ContactRequest = require('../models/ContactRequest')

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
        const { name, email, phone, message, course, courseId } = req.body;

        if ( !name || ! email || !phone || !message ) {
            return res.status(400).json({ error: 'Dati corso mancanti' });
        }

        const newRequest = new ContactRequest({
            name,
            email,
            phone,
            message,
            course,
            courseId,
        });

        await newRequest.save()

        res.status(200).json({message: 'Richiesta inviata con successo'})
    } catch (error) {
        console.error('Errore salvataggio richiesta:', error);
        res.status(500).json({ error: 'Errore durante l’invio della richiesta' });
    }
}

module.exports = {
    sendContactRequest, getAllRequests
}