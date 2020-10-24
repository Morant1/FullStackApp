import httpService from './httpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    update
}

function getUsers() {
    return httpService.get('user')
}

async function login(userCred) {
    console.log("login info",userCred)
    try {
        const user = await httpService.post('auth/login', userCred)
        return _handleLogin(user)
    } catch {
        alert("Please sign up first")
    }
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}
function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}


async function update(user) {
        const editedUser  = await httpService.put(`user/${user._id}`, user);
        return editedUser
}

