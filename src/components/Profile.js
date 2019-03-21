import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
// import Article from './Article';
// import isLoggedIn from '../helpers/is_logged_in';
import jwt_decode from 'jwt-decode';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: ''
    }
  }
 
componentDidMount () {
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
  this.setState({
    first_name: decoded.first_name,
    last_name: decoded.last_name,
    email: decoded.email
  })
 
  // if (!isLoggedIn()) {
  //   return <Redirect to="/login" />
  // }

}

render()
 {
   return (
     <div className="container">
          <div className="jumbotron mt-5">
          <h1 className="text-center">Profile</h1>
       </div>
       <table className="col md-6 mx-auto">
         <tbody>
           <tr>
             <td>First Name</td>
             <td>{this.state.first_name}</td>
           </tr>
           <tr>
             <td>Last Name</td>
             <td>{this.state.last_name}</td>
           </tr>
           <tr>
             <td>Email</td>
             <td>{this.state.email}</td>
           </tr>
         </tbody>
       </table>

     </div>
   )
 }
}


export default Profile;