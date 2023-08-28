const creator = require("../models/schemas/creatorSchema")
const content = require("../models/schemas/contentSchema")
const comment = require('../models/schemas/commentSchema');

const gettingData = async (req, res) => {
    // const creatorData = await creator.find()
    // const contentData = await content.find()
    // const commentData = await comment.find()
    // return res.send({
    //     creator: creatorData,
    //     content: contentData,
    //     comment: commentData
    // });
    // }
const creatordata = await creator.aggregate([
        {
          $lookup: {
            from: 'contents',
            localField: '_id',
            foreignField: 'creatorId',
            as: 'userContents',
          },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'creatorId',
            as: 'userComments',
          },
        },
        
      ]);
      return res.send({status:1,data:creatordata})
    }



const gettingDataById = async (req, res) => {
    const dataFetch = req.body
    const creatorDataById = await creator.findById(dataFetch)
    const contentDataById = await content.find({ creatorId: dataFetch })
    const commentDataById = await comment.find({ content: contentDataById })
    const data = {
        creator: creatorDataById,
        content: contentDataById,
        comment: commentDataById,
    }
    return res.send({
        status: 1, data: data
    })
}
module.exports = { gettingData, gettingDataById }
