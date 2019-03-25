import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {handleUpload} from './UserFunctions';

class EditArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentDidMount() {
    axios.get('/articles/one/'+this.props.match.params.id, {withCredentials:true})
      .then(res => {
        this.setState({ article: res.data.article });
        console.log(this.state.article);
      });
  }

  onChange = (e) => {
    const state = this.state.article
    state[e.target.name] = e.target.value;
    this.setState({article:state});
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

    const { title, body, author, imageUrl } = this.state.article;

    axios.put('/articles/'+this.props.match.params.id, { title, body, author, imageUrl })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container editArticle">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BLOG
            </h3>
          </div>
          <div class="panel-body">
            {/* <h4><Link to={`/show/${this.state.article._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Your Blog</Link></h4> */}
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.article.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.article.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textarea type="text" class="form-control" name="body" value={this.state.article.body} onChange={this.onChange} placeholder="Description" />
              </div>

              <input type="file" onChange={(e) => this.handleFileUpload(e)} /> 
              <button type="submit" className="btn btn-lg btn-primary btn-block">
                              Post
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditArticle;