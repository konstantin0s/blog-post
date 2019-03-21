import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
// import Image from './Image';
// import isLoggedIn from '../helpers/is_logged_in';

class OneArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    oneArticle: {}

    }
  }

  componentDidMount() {
    axios.get('/articles/'+this.props.match.params.id)
      .then(res => {
        this.setState({ oneArticle: res.data.article })
        // withCredentials: true
        console.log(this.state.oneArticle);
      });

      // if (!isLoggedIn()) {
      //   return <Redirect to="/login" />
      // }
  }

  delete(id){
    console.log(id);
    axios.delete('/articles/'+id)
      .then((result) => {
        this.props.history.push("/profile")
      });
  }

  render() {
    // const { OneArticle } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          {/* <div className="panel-heading">
          </div> */}
          <div className="panel-body">
            <dl>
              <dt>Title:</dt>
              <dd>{this.state.oneArticle.title}</dd>
              <dt>Author:</dt>
              <dd>{this.state.oneArticle.author}</dd>
              <dt>Description:</dt>
              <dd>{this.state.oneArticle.body}</dd>
              <dt>Publish Date:</dt>
              <dd>{this.state.oneArticle.date}</dd> 
              <img className="rounded float-left img-responsive" src={this.state.oneArticle.imageUrl} />
             </dl>
            <Link to={`/edit/${this.state.oneArticle._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.oneArticle._id)} class="btn btn-danger">Delete</button>
          </div> 
        </div>
        <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Blog List</Link></h4>
      </div>
    );
  }
}

export default OneArticle;