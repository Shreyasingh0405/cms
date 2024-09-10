const mongoose = require("mongoose")
const creatorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowerCase: true
    },
    password: {
        type: String,
        require: true
    },
    contact: {
        type: Number,
        require: true
    }
},
    ({ timestamps: true, versionKey: false })
)
module.exports = mongoose.model("creator", creatorSchema)
