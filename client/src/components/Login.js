import React, {Component} from 'react';
import {login} from './UserFunctions';
import '../components/css/login.css';
import { Message } from 'semantic-ui-react';

const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    error: false,
}

class Login extends Component {
    constructor() {
        super()
        this.state = initialState;

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate = () => {
       let  emailError =  '';
       let  passwordError = '';

       if (!this.state.email.includes('@')) {
           emailError = 'invalid email';
       }

       if (!this.state.password) {
        passwordError = 'password cannot be blank';
    }


       if (emailError || passwordError) {
           this.setState({ emailError, passwordError });
           return false;
       }
       return true;
    }

    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state); 
            this.props.history.push('/');
            //clear form
           this.setState({initialState});
        }


        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ error: false });
         
        login(user).then(res => {
            if (res) {
                // this.props.loggedIn({loggedIn: true});
                this.props.history.push('/profile');
            }
        })
        .catch((err)=> {
            this.props.history.push({ pathname: "/login", state: {message: "unauthorized"}})
        })
    }

    render() {
        const { error } = this.state;
        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-center">
                    <div className="col-md-6 mt-5">
                        <form noValidate error={error} onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            {error && <Message error={error} 
                             content="That username/password is incorrect. Try again!"  />}
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                            </div>
                            <div style={{ fontSize: 12, color: "red"}}>{this.state.emailError}</div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                            </div>
                            <div style={{ fontSize: 12, color: "red"}}>{this.state.passwordError}</div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;