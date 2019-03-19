import React, {Component} from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

class Navbar extends Component {
//     constructor() {
//     super()
//     this.state = {
//       first_name: '',
//       last_name: '',
//         email: ''
// }
//   }

//   componentDidMount () {
//     const token = localStorage.usertoken
//     const decoded = jwt_decode(token)
//     this.setState({
//       first_name: decoded.first_name,
//       last_name: decoded.last_name,
//       email: decoded.email
//     })
  
//   }
     logOut(e) {
       e.preventDefault()
       localStorage.removeItem('usertoken')
       this.props.history.push('/')
     }

     render() {
       const loginRegLink = (
        <ul className="navbar-nav">
           <li className="nav-item">
             <Link to="/login" className="nav-link">
               Login
             </Link>
             </li>
             <li className="nav-item">
             <Link to="/register" className="nav-link">
               Register
             </Link>
           </li>
         </ul>

       )

       const userLink = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/profile" className="nav-link user">
              {/* Welcome {this.state.first_name} */}Profile
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/article" className="nav-link">
              Add Article
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/articles" className="nav-link">
              Show Articles
            </Link>
            </li>
            <li className="nav-item">
          <a href onClick={this.logOut.bind(this)} className="nav-link">
          Logout
          </a>
          </li>
        </ul>
       )
       return (
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            <button className="navbar-toggler" type="button" 
            data-toggle="collapse" data-target="#navbar1"
            aria-controls="navbar1" aria-expanded="false"
            aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
            <ul className="navbar-nav">
               <li className="nav-item">
                <Link to="/" className="nav-link">
                 I&#9829; Vlog
               </Link>
               </li>
         </ul>

         {localStorage.usertoken ? userLink : loginRegLink}
            </div>
         </nav>
       )
     }
}


export default withRouter(Navbar);