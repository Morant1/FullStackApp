import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


import { loadUsers, login, logout, signup } from '../store/actions/userActions';

class _Login extends Component {
    state = {
        isSignup:false,
        loginCred: {
            password: '',
            username: ''
        },
        signupCred: {
            password: '',
            username: ''
        }
    };

    componentDidMount = () => {
        this.props.loadUsers();
    }

    onSignUp = () => {
        this.setState({isSignup: !this.state.isSignup});
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
        const { username, password } = this.state.loginCred;
        if (!username || !password) {
            return this.setState({ msg: 'Please enter username/password' });
        }
        const userCreds = { username, password };
        const user = await this.props.login(userCreds);
        this.setState({ loginCred: { username: '', password: '' } });

        if (user) this.props.history.push('/');
        else  this.props.history.push('/login');
        
  
    };

    doSignup = async ev => {
        ev.preventDefault();
        // if (this.props.loggedInUser.isGuest) this.props.logout()
        const {password, username } = this.state.signupCred;
        if (!password || !username) {
            return this.setState({ msg: 'Username & password inputs are required!' });
        }
        const signupCreds = { password, username , isGuest: false};
        const user = await this.props.signup(signupCreds);
        if (user) this.props.history.push('/');

        this.setState({ signupCred: { password: '', username: '' } });
    };

  //   onLogout = () => {
  //     this.props.logout()
  //         .then(res => this.props.history.push('/'))

  // }


    render() {
        return (
            <React.Fragment>
            <div className="logup-container">
            <img src={require('../assets/img/main7.jpg')}/>
            <div className="logup-form">
            { this.state.isSignup && 
                <form onSubmit={this.doSignup}>
                    <span className="login-title flex">Sign Up</span>
                    <TextField id="standard-basic" label="Username"
                        type="text"
                        name="username"
                        value={this.state.signupCred.username}
                        onChange={this.signupHandleChange}
                        placeholder="Username"
                        autoComplete="off"
                        required
                    />
                    <br />
                    <TextField id="standard-basic" label="Password"
                        name="password"
                        type="password"
                        value={this.state.signupCred.password}
                        onChange={this.signupHandleChange}
                        placeholder="Password"
                        required
                    />
                    <br />

                    <Button type="submit" size="small" variant="contained">Signup</Button>
                </form>}
                { !this.state.isSignup && 
                <form onSubmit={this.doLogin}>
                    <span className="login-title flex">Login</span>
                    <TextField id="standard-basic" label="Username"
                        type="text"
                        name="username"
                        value={this.state.loginCred.username}
                        onChange={this.loginHandleChange}
                        placeholder="Username"
                        autoComplete="off"
                        required
                    />
                    <br />
                    <TextField id="standard-basic" label="Password"
                        type="password"
                        name="password"
                        value={this.state.loginCred.password}
                        onChange={this.loginHandleChange}
                        placeholder="Password"
                        required
                    />
                    <br />
                    <Button type="submit" size="small" variant="contained">Login</Button>
                
                </form>
    }
    <div className="sign-up-log-container flex">
                          <div className="sign-up-log" onClick={this.onSignUp}>{this.state.isSignup? 'Login Here' : 'Sign Up First'}</div>
                <div className="sign-up-log" onClick={(ev)=>{this.props.history.push('/')}}>Continue as a Guest</div>
                </div>
                </div>
            </div>
            </React.Fragment>
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
    logout,
    signup,
    loadUsers
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
