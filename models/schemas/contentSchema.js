const mongoose = require("mongoose")
const contentSchema = new mongoose.Schema({
    
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "creator",
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tags:
        [{ type: String }],
    category: {
        type: String,
        require: true
    },
    
},
    ({ timestamps: true, versionKey: false })
)
module.exports = mongoose.model("content", contentSchema)
