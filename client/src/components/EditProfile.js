import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {handleUpload} from './UserFunctions';

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get('/users/'+this.props.match.params.id)
      .then(res => {
        this.setState({ user: res.data.user });
        console.log(this.state.user);
      });
  }

  onChange = (e) => {
    const state = this.state.user
    state[e.target.name] = e.target.value;
    this.setState({user:state});
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}

  onSubmit = (e) => {
    e.preventDefault();

    const { first_name, last_name, email, password } = this.state.user;

    axios.put('/users/'+this.props.match.params.id, { first_name, last_name, email, password })
      .then((result) => {
        this.props.history.push("/profile/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container editArticle">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT PROFILE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/profile/${this.state.user._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Your Profile</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">First Name:</label>
                <input type="text" class="form-control" name="first_name" value={this.state.user.first_name} onChange={this.onChange} placeholder="First Name" />
              </div>
              <div class="form-group">
                <label for="author">Last Name:</label>
                <input type="text" class="form-control" name="last_name" value={this.state.user.last_name} onChange={this.onChange} placeholder="Last Name" />
              </div>
              <div class="form-group">
                <label for="description">Email:</label>
                <input type="text" class="form-control" name="email" value={this.state.user.email} onChange={this.onChange} placeholder="Email" />
              </div>

              {/* <input type="file" onChange={(e) => this.handleFileUpload(e)} />  */}
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                              Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;