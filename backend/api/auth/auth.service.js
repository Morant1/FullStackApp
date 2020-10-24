const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {


    logger.debug(`auth.service - login with username: ${username}`)
    if (!username || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUsername(username)
    console.log("username",username)
    console.log("password",password)
    console.log("user,login-",user)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    console.log("match",match)
    if (!match) return Promise.reject('Invalid username or password')

    delete user.password;
    return user;
}



async function signup(isGuest, password, username) {
    logger.debug(`auth.service - signup with username: ${username}`)
    if ( !password || !username) return Promise.reject('username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({isGuest, password: hash, username})
}

module.exports = {
    signup,
    login
}