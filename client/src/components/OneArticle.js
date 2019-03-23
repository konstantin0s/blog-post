import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/OneArticle.css';
// import AuthorizeOnly from '../components/AuthorizeOnly';
// import {login} from './UserFunctions';

class OneArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    oneArticle: {}
    }
  }

  componentDidMount() {
    axios.get('/articles/'+this.props.match.params.id, {withCredentials:true})
      .then(res => {
        this.setState({ oneArticle: res.data.article })
        console.log(this.state.oneArticle);
      });
      // this.state = { loggedInUser: true };
  }

  delete(id){
    console.log(id);
    axios.delete('/articles/'+id, {withCredentials:true})
      .then((result) => {
        this.props.history.push("/profile")
      });
  }

  // loggedInUser =  {
  //   role:'admin' 
  // }

  // ownershipCheck = (article) => {
  //   if(this.props.loggedIn && article.owner == this.props.loggedIn._id){
  //     return (
  //       <div>
  //          <Link to={`/edit/${this.state.oneArticle._id}`} class="btn btn-success">Edit</Link>&nbsp;
  //              <button onClick={this.delete.bind(this, this.state.oneArticle._id)} class="btn btn-danger">Delete</button>
  //       </div>
  //     )
  //   } 
  // }

  render() {
    // const { OneArticle } = this.state;
    return (
      <div className="container">
          <div className="col-md-12 oneArticle">         
             <h1>{this.state.oneArticle.title}</h1>
             <img className="rounded float-left img-responsive" alt="Article" src={this.state.oneArticle.imageUrl} />
             <p>{this.state.oneArticle.body}</p>
             <h4>Written by: <div className="author">{this.state.oneArticle.author}</div></h4>
             <div>

             {/* <AuthorizeOnly allowedRoles={['admin']} user={loggedInUser}>
             <Link to={`/edit/${this.state.oneArticle._id}`} class="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.oneArticle._id)} class="btn btn-danger">Delete</button>
            </AuthorizeOnly> */}
      </div>
            <span className="badge post">Posted {this.state.oneArticle.date}</span>
            <div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
            <span className="label label-danger">Danger</span>
               <div className="edel"> 
               </div>
           <hr/>
            </div>   
            </div>
      </div>
    );
  }
}

export default OneArticle;