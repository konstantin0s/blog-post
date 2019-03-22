import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import './css/Profile.css';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      date: ''
    }
  }
 
componentDidMount () {
  const token = localStorage.usertoken
  const decoded = jwt_decode(token)
  this.setState({
    first_name: decoded.first_name,
    last_name: decoded.last_name,
    email: decoded.email,
    date: decoded.date
  })
}

render()
 {
   return (
    <div className="container profilePage">
    <div className="row profile">
		<div className="col-md-3">
			<div className="profile-sidebar">
		
				<div className="profile-userpic">
					{/* <img src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg" className="img-responsive" alt=""> */}
				</div>
		
				<div className="profile-usertitle">
					<div className="profile-usertitle-name">
          {this.state.first_name} {this.state.last_name}
					</div>
					<div className="profile-usertitle-job">
						Joined at: {this.state.date}
					</div>
				</div>
		
				<div className="profile-userbuttons">
					<button type="button" className="btn btn-success btn-sm">Follow</button>
					<button type="button" className="btn btn-danger btn-sm">Message</button>
				</div>
		
				<div className="profile-usermenu">
					<ul className="nav">
						<li className="active">
							<a href="#">
							<i className="glyphicon glyphicon-home"></i>
							Overview </a>
						</li>
						<li>
							<a href="#">
							<i className="glyphicon glyphicon-user"></i>
							Account Settings </a>
						</li>
						<li>
							<a href="#" target="_blank">
							<i className="glyphicon glyphicon-ok"></i>
							{this.state.email} </a>
						</li>
						<li>
							<a href="/editProfile">
							<i className="glyphicon glyphicon-flag"></i>
							Edit </a>
						</li>
					</ul>
				</div>
			
			</div>
		</div>
		<div className="col-md-9">
            <div className="profile-content">
			   Some user related content goes here...
            </div>
		</div>
	</div>
</div>

   )
 }
}


export default Profile;