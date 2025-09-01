const mongoose = require('mongoose')

const connectToDB = async (url) => {
    mongoose.connect(url)
}

module.exports = {connectToDB}