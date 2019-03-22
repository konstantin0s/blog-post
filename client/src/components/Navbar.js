import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../App.css'
import axios from 'axios';
import store from 'store';


class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
  }

    
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
       e.preventDefault();
       axios.post('/logout');
       localStorage.removeItem('usertoken');
       store.remove('loggedIn');
       console.log('you have been logged out. boo!');
       this.props.history.push('/')
       store.set('loggedIn', false);
     }

     render() {
       const loginRegLink = (
        <ul className="navbar-nav mr-auto">
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
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/profile" className="nav-link user">
              {/* Welcome {this.state.first_name} */}Profile
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/article" className="nav-link">
              Blog
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/articles" className="nav-link">
              Show Blogs
            </Link>
            </li>
            <li className="nav-item">
            <a href onClick={this.logOut.bind(this)} className="nav-link logout">
          Logout
          </a> 
        
          </li>
        </ul>
       )
       
       return (

        <nav className="navbar navbar-inverse navbar-fixed-top">
           <div className="container">
           <div className="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
           
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
          <Link to="/" className="nav-link active logo">
               You&#9829;Dev
               </Link>
          </ul>
        </div>
        {localStorage.usertoken ? userLink : loginRegLink}
      </div>
    </nav>
        //  <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <button className="navbar-toggler" type="button" 
        //     data-toggle="collapse" data-target="#navbar1"
        //     aria-controls="navbar1" aria-expanded="false"
        //     aria-label="Toggle navigation">
        //       <span className="navbar-toggler-icon"></span>
        //     </button>

        //     <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
        //     <ul className="navbar-nav">
        //        <li className="nav-item">
        //         <Link to="/" className="nav-link">
        //          You&#9829;Dev
        //        </Link>
        //        </li>
        //  </ul>

        //  {localStorage.usertoken ? userLink : loginRegLink}
        //     </div>

        //  </nav>
       )
     }
}


export default withRouter(Navbar);