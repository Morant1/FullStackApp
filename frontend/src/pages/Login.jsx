import React, { Component } from 'react';
import { connect } from 'react-redux';



// import { loadUsers, login, logout, signup } from '../store/actions/userActions';

class _Login extends Component {
    state = {
        isSignup:true,
    //     loginCred: {
    //         password: '',
    //         username: ''
    //     },
    //     signupCred: {
    //         password: '',
    //         username: ''
    //     }
    };

    // componentDidMount = () => {
    //     this.props.loadUsers();
    // }

    // onSignUp = () => {
    //     this.setState({isSignup: !this.state.isSignup});
    // }

    // loginHandleChange = ev => {
    //     const { name, value } = ev.target;
    //     this.setState(prevState => ({
    //         loginCred: {
    //             ...prevState.loginCred,
    //             [name]: value
    //         }
    //     }));
    // };

    // signupHandleChange = ev => {
    //     let { name, value } = ev.target;
    //     this.setState(prevState => ({
    //         signupCred: {
    //             ...prevState.signupCred,
    //             [name]: value
    //         }
    //     }));
    // };

    // doLogin = async ev => {

    //     ev.preventDefault();
    //     const { username, password } = this.state.loginCred;
    //     if (!username || !password) {
    //         return this.setState({ msg: 'Please enter username/password' });
    //     }
    //     const userCreds = { username, password };
    //     const user = await this.props.login(userCreds);
    //     this.setState({ loginCred: { username: '', password: '' } });

    //     if (user) this.props.history.push('/');
    //     else  this.props.history.push('/login');


    // };

    // doSignup = async ev => {
    //     ev.preventDefault();
    //     // if (this.props.loggedInUser.isGuest) this.props.logout()
    //     const {password, username } = this.state.signupCred;
    //     if (!password || !username) {
    //         return this.setState({ msg: 'Username & password inputs are required!' });
    //     }
    //     const signupCreds = { password, username , isGuest: false};
    //     const user = await this.props.signup(signupCreds);
    //     if (user) this.props.history.push('/');

    //     this.setState({ signupCred: { password: '', username: '' } });
    // };

    //   onLogout = () => {
    //     this.props.logout()
    //         .then(res => this.props.history.push('/'))

    // }

    toggleSignup = (signupValue) => {
        this.setState({isSignup: signupValue});

    }


    render() {
        const {isSignup} = this.state
        return (
            <section className="login-container" style={{backgroundImage:`url(${require("../assets/img/background7.jpg")})`}}>
                <div className="form-modal">

                    <div className="form-toggle">
                        <button id="login-toggle" className={!isSignup?'blue':''} onClick={(ev)=>{this.toggleSignup(false)}}>log in</button>
                        <button id="signup-toggle"  className={isSignup?'blue':''} onClick={(ev)=>{this.toggleSignup(true)}}>sign up</button>
                    </div>

                    {!isSignup && <div id="login-form">
                        <form>
                            <input type="text" placeholder="Enter username" />
                            <input type="password" placeholder="Enter password" />
                            <button type="button" className="btn login">login</button>
                        </form>
                    </div>}

                    {isSignup && <div id="signup-form">
                        <form>
                            <input type="text" placeholder="Enter username" />
                            <input type="password" placeholder="Create password" />
                            <button type="button" className="btn signup">create account</button>
                        </form>
                    </div>}
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        // users: state.userReducer.users,
        // loggedInUser: state.userReducer.loggedInUser,
    };
};
const mapDispatchToProps = {
    // login,
    // logout,
    // signup,
    // loadUsers
};

export const Login = connect(null, mapDispatchToProps)(_Login)
