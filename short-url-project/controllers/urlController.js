const shortid = require('shortid');
const Url = require('../models/Url')

const handleCreateNewURL = async (req, res) => {
    const shortID = shortid()
    const {redirectUrl} = req.body
    if(!redirectUrl) {
        return res.status(400).json({error: `URL is required!`})
    }
    await Url.create({
        shortID,
        redirectUrl,
        visitHistory: []
    })
    return res.json({id: shortID})
}

const handleGetURLclicks = async (req, res) => {
    const shortID = req.params.shortID
    const result = await Url.findOne({shortID})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

module.exports = {handleCreateNewURL, handleGetURLclicks}