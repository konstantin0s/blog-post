import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
// import isLoggedIn from '../helpers/is_logged_in';

class EditArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentDidMount() {
    axios.get('/articles/'+this.props.match.params.id)
      .then(res => {
        this.setState({ article: res.data.article });
        console.log(this.state.article);
      });
      // if (!isLoggedIn()) {
      //   return <Redirect to="/login" />;
      // }
  }

  onChange = (e) => {
    const state = this.state.article
    state[e.target.name] = e.target.value;
    this.setState({article:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, body, author } = this.state.article;

    axios.put('/articles/'+this.props.match.params.id, { title, body, author })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BLOG
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.article._id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Blog List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
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