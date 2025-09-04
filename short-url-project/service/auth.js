const jwt = require('jsonwebtoken')
const secret =  'Afeera$123%8@3'

const setUser = (user) =>  {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role
    }, secret)
}

const getUser = (token) => {
    if(!token) return null
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null
    }
}

module.exports = {setUser, getUser}