const createrModel= require("../models/schemas/creatorSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const creatorRegistration = async (req, res) => {
    try {
        const register = req.body
        const checkingmail = await createrModel.findOne({ email: register.email })
        if (checkingmail) {
            return res.send({ status: 0, msg: "email already exist" })
        }
        const checkingphone = await createrModel.findOne({ contact: register.contact })
        if (checkingphone) {
            return res.send({ status: 0, msg: "contact already exist" })
        }
        if (register.password) {
            register.password = bcrypt.hashSync(register.password, 10)
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'noble.walsh@ethereal.email',
                pass: '7rjUfsg5wG3cjYBDHS'
            }
        });
        const registerData = await createrModel.create(register)
        if (registerData) {
            const mailOptions = {
                from: "noble.walsh@ethereal.email",
                to: register.email,
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
            return res.send({ status: 1, msg: "registered successfully", data: registerData })
        }
    } catch (error) {
        return res.send(error.message)
    }
}
const loginCreator = async (req, res) => {
    try {
        const { email, password } = req.body
        const checkEmail = await createrModel.findOne({ email: email })
        if (!checkEmail) {
            return res.send({ status: 0, msg: "you are not registered" })
        }
        bcrypt.compare(password, checkEmail.password, function (err, result) {
            if (result == true) {
                let token = jwt.sign({
                    userId: checkEmail._id,
                    email: checkEmail.email,
                    type: 1
                }, 'secreatkey')
                if (token) {
                    return res.send({ status: 1, msg: "login succesfully", data: token })
                }
            } else if (err) {
                return res.send({ status: 0, msg: "invalid credentials" })
            }
            return res.send({ status: 0, msg: "invalid credentials" })
        })
    } catch (error) {
        return res.send(error.message)
    }
}
module.exports = { creatorRegistration, loginCreator }