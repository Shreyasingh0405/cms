const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const commentSchema = new mongoose.Schema({
    comment_body: {
        type: String,
        require: true
    },
    is_approved: {
        type: Boolean,
        default: false
    },
    creatorId: {
        type: ObjectId,
        ref: 'creator'
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'content'
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
},
    ({ timeStamps: true, versionKey: false })
)

module.exports = mongoose.model('comment', commentSchema)