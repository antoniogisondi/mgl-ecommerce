module.exports = ({name, surname, email, phone, message, course, courseId}) => {
    return `
        <h2>Richiesta informazioni</h2>
        <p>Ciao sono <strong>${name} ${surname}</strong>, <br/>
            ${message} <br/>
            <strong>Nome del corso:</strong> ${courseId?.title ? courseId.title : course}
        </p>

        <h3>Dettagli della richiesta</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefono:</strong> ${phone || '-'}</p>

    `
}