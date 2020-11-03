import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadUsers, login, signup } from '../store/actions/userActions';

class _Login extends Component {
    state = {
        isSignup: true,
        loginCred: {
            password: '',
            username: '',
            isGuest: false
        },
        signupCred: {
            password: '',
            username: '',
            isGuest: false
        }
    };

    componentDidMount = () => {
        this.props.loadUsers();
    }

    onSignUp = () => {
        this.setState({ isSignup: !this.state.isSignup });
    }

    loginHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            loginCred: {
                ...prevState.loginCred,
                [name]: value
            }
        }));
    };

    signupHandleChange = ev => {
        let { name, value } = ev.target;
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
    };

    doLogin = async ev => {

        ev.preventDefault();
        const { username, password, isGuest } = this.state.loginCred;


        const userCreds = { username, password, isGuest };
        const user = await this.props.login(userCreds);
        this.setState({ loginCred: { username: '', password: '' } });
        if (user) this.props.history.push('/');
        else {
            alert("Please sign up first")
            this.setState({ isSignup: true })
            this.props.history.push('/login');
        }


    };

    doSignup = async ev => {
        ev.preventDefault();
        const { password, username, isGuest } = this.state.signupCred;
 

        const signupCreds = { password, username, isGuest };
        const user = await this.props.signup(signupCreds);
        this.setState({ signupCred: { password: '', username: '' } });
        if (user) this.props.history.push('/');
    };

    // onLogout = () => {
    //     this.props.logout()
    //         .then(res => this.props.history.push('/'))

    // }

    toggleSignup = (signupValue) => {
        this.setState({ isSignup: signupValue });

    }


    render() {
        const { isSignup } = this.state
        return (
            <section className="login-container" style={{ backgroundImage: `url(${require("../assets/img/background7.jpg")})` }}>
                <div className="form-modal">

                    <div className="form-toggle">
                        <button id="login-toggle" className={!isSignup ? 'blue' : ''} onClick={(ev) => { this.toggleSignup(false) }}>log in</button>
                        <button id="signup-toggle" className={isSignup ? 'blue' : ''} onClick={(ev) => { this.toggleSignup(true) }}>sign up</button>
                    </div>

                    {!isSignup && <div id="login-form">
                        <form onSubmit={this.doLogin}>
                            <input type="text"
                                name="username"
                                autoComplete="off"
                                placeholder="Enter username"
                                value={this.state.loginCred.username}
                                onChange={this.loginHandleChange}
                                required />

                            <input type="password" placeholder="Enter password"
                                name="password"
                                value={this.state.loginCred.password}
                                onChange={this.loginHandleChange}
                                required />
                            <button type="submit" className="btn login">login</button>
                        </form>
                    </div>}

                    {isSignup && <div id="signup-form">
                        <form onSubmit={this.doSignup}>
                            <input type="text" name="username" value={this.state.signupCred.sername}
                                onChange={this.signupHandleChange} autoComplete="off" placeholder="Enter username" required/>

                            <input type="password" name="password" value={this.state.signupCred.password}
                                onChange={this.signupHandleChange} placeholder="Create password" required/>

                            <button type="submit" className="btn signup">create account</button>
                        </form>
                    </div>}
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.userReducer.users,
        loggedInUser: state.userReducer.loggedInUser,
    };
};
const mapDispatchToProps = {
    login,
    // logout,
    signup,
    loadUsers
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)

