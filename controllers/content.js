const contentModel = require("../models/schemas/contentSchema")
const mongoose = require("mongoose")
const contentCreate = async (req, res) => {
    try {
        const createContent = req.body
        const contentCreation = await contentModel.create(createContent)
        if (contentCreation) {
            return res.send({ status: 1, msg: "blogs created successfully", data: contentCreation })
        }
    } catch (error) {
        return res.send(error.message)
    }
}
const getContent = async (req, res) => {
    try {
        const contentDetails = await contentModel.find()
        if (contentDetails) {
            return res.send({ status: 1, msg: "blogs get successfully", data: contentDetails })
        } return res.send({ status: 0, msg: "no data found" })
    } catch (error) {
        return res.send(error.message)
    }
}

const getContentById = async (req, res) => {
    try {
        const contentId = req.body
        const gettingContentUsingId = await contentModel.findById(contentId.id)
        if (gettingContentUsingId) {
            return res.send({ status: 1, msg: "data get succesfully", data: gettingContentUsingId })
        }
        return res.send({ status: 0, msg: "data not found" })
    } catch (error) {
        return res.send(error.message)
    }
}
const updateContent = async (req, res) => {
    try {
        const contentUpdate = req.body
        if (!mongoose.isValidObjectId(contentUpdate.id)) {
            return res.send({ status: 0, msg: "invalid id" })
        }
        const contentUpdateById = await contentModel.findByIdAndUpdate(contentUpdate.id, contentUpdate, { new: true })
        if (contentUpdateById) {
            return res.send({ status: 1, msg: "content updated successfully", data: contentUpdateById })
        }
    } catch (error) {
        return res.send(error.message)
    }
}
const deleteContent = async (req, res) => {
    try {
        const deleteId = req.body
        if (!mongoose.isValidObjectId(deleteId.id)) {
            return res.send({ status: 0, msg: "invalid id" })
        }
        const contentDeleting = await contentModel.findByIdAndDelete(deleteId.id)
        if (contentDeleting) {
            return res.send({ status: 1, msg: "blogs deleted successfully" })
        }
        return res.send({ status: 0, msg: "data already deleted & no such data found" })
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = { contentCreate, getContent, getContentById, updateContent, deleteContent }