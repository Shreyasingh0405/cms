const commentModel = require("../models/schemas/commentSchema")
const creatorCheck = require("../models/schemas/creatorSchema")
const contentCheck = require("../models/schemas/contentSchema")
const mongoose = require("mongoose")
const createComment = async (req, res) => {
    try {
        const insertComment = req.body
        if (!mongoose.isValidObjectId(insertComment.creator)) {
            return res.send({ status: 0, msg: "invalid creatorId" })
        }
        if (!mongoose.isValidObjectId(insertComment.content)) {
            return res.send({ status: 0, msg: "invalid contentId" })
        }
        const checkingCreatorId = await creatorCheck.findById({ _id: insertComment.creator })
        const checkingContentId = await contentCheck.findById({ _id: insertComment.content })
        //const checkingApproved =await commentModel.find(insertComment.is_approved=={true})
        //if(insertComment.is_approved==true)
        if (checkingCreatorId, checkingContentId)
        // if(insertComment.is_approved==true)
        {
            const checkingComment = await commentModel.create(insertComment)
            {
                return res.send({ status: 1, msg: "comment post successfully", data: checkingComment })
            }
        }
        return res.send({ status: 0, msg: "invalidId" })
    } catch (error) {
        return res.send(error.message)
    }

}
module.exports = { createComment }