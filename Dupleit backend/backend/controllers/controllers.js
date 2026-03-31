import { Poll } from "../model/model.js"

export const createPoll = async (req, res) => {
  try {

    const { question, options, expiresAt } = req.body

    if (!question || !options) {
      return res.status(400).json({
        message: "all fields are required"
      })
    }

    const formattedOptions = options.map(opt => ({
      text: opt,
      votes: 0
    }))

    const poll = new Poll({
      question,
      options: formattedOptions,
      expiresAt
    })

    await poll.save()

    return res.status(200).json({
      message: "poll created successfully"
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getAllPolls = async (req, res) => {
  try {

    const polls = await Poll.find()

    return res.status(200).json({
        polls,
        message:"polls fetched sucessfully"
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}




export const votePoll = async (req, res) => {
  try {

    const { id } = req.params
    const { optionIndex } = req.body

    const poll = await Poll.findById(id)

    if (!poll) {
      return res.status(404).json({
        message: "Poll not found"
      })
    }

    if (new Date() > poll.expiresAt) {
  return res.status(400).json({
    message: "Poll has expired"
  });
}

    poll.options[optionIndex].votes += 1

    await poll.save()

    return res.status(200).json({
      message: "Vote added successfully",
      poll
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const getActivepolls=async(req,res)=>{

    try {
        const polls=await Poll.find({
            expiresAt:{$gt:new Date()}
        })
   return res.status(200).json({
      polls,
      message: "active polls fetched"
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


export const getExpiredPolls = async (req, res) => {
  try {

    const polls = await Poll.find({
      expiresAt: { $lt: new Date() }
    })

    return res.status(200).json({
      polls,
      message: "expired polls fetched"
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}