const User = require("../models/User")
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../service/auth')

const handleSignupUser = async (req, res) => {
    const {name, email, password} = req.body
    await User.create({
        name, email, password
    })
    return res.redirect('/')
}

const handleLoginUser = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email, password})
    if(!user) return res.render('login', {error: 'User is not found!'})
    
    const token = setUser(user)
    res.cookie('uid', token)
    return res.redirect('/')
}


module.exports = {handleSignupUser, handleLoginUser}