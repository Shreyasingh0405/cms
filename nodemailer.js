const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'angeline.parisian92@ethereal.email',
        pass: 'cT1yEX1Pkyff6tPAyU'
    }
});
const registerData = await createrModel.create(register);

if (registerData) {
    // Send registration email
    const mailOptions = {
        from: 'angeline.parisian92@ethereal.email',
        to: "shreyasingh0405.52@gmail.com",
        subject: 'Registration Confirmation',
        text: 'Thank you for registering!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    return res.send({ status: 1, msg: 'Registered successfully', data: registerData });
}
