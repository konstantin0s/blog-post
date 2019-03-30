import React, {Component} from 'react';
import {register} from './UserFunctions';
import { Link} from 'react-router-dom';
import { Message } from 'semantic-ui-react';

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: ''
}


class Register extends Component {
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
        let isError = false;
        const errors = {};
       let firstnameError = '';
       let  lastnameError = '';
     
        let  emailError =  '';
        let  passwordError = '';

        if (!this.state.first_name) {
            isError = true;
            firstnameError = 'First name cannot be blank';
        }

        if (!this.state.last_name) {
            isError = true;
            lastnameError = 'First name cannot be blank';
        }
 
        if (!this.state.email.includes('@')) {
            isError = true;
            emailError = 'invalid email';
        }
 
        if (!this.state.password) {
            isError = true;
         passwordError = 'password cannot be blank';
     }
          if (isError) {
              this.setState({
                ...this.state,
                ...errors
              });
          }
 
        if (firstnameError || lastnameError || emailError || passwordError) {
            this.setState({firstnameError, lastnameError, emailError, passwordError });
            return false;
        }
        // return isError;
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


        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ error: false });
         
        register(newUser).then(res => {
            if (res) {
                 console.log(newUser);
                this.props.history.push('/login');
            }
        })
        .catch((err)=> {
            this.props.history.push({ pathname: "/register", state: {message: "unauthorized"}})
        })
    }

    render() {
        const { error } = this.state;
        return (

    <div className="center">
                <div className="carding">
                    <div className="col-md-10">
                    <form noValidate onSubmit={this.onSubmit}>
                           <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
                            {error && <Message error={error} 
                             content="That username/password is incorrect. Try again!"  />}
                            <div className="form-group">
                                <label htmlFor="first_name">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}/>
                            </div>
                            <div style={{ fontSize: 12, color: "red"}}>{this.state.firstnameError}</div>
                            <div className="form-group">
                                <label htmlFor="last_name">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}/>
                            </div>
                            <div style={{ fontSize: 12, color: "red"}}>{this.state.lastnameError}</div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                            </div>
                            <div style={{ fontSize: 12, color: "red"}}>{this.state.emailError}</div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                            </div>
                            <div style={{ fontSize: 12, color: "red"}}>{this.state.passwordError}</div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register
                            </button>
                        </form>

                        <p>Already have account? 
                       <Link to={"/login"}> Login</Link>
      </p>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register;