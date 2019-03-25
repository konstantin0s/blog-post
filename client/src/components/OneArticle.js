import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/OneArticle.css';
import AuthorizeOnly from '../components/AuthorizeOnly';
// import {login} from './UserFunctions';
import jwt_decode from 'jwt-decode';


class OneArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    article: [],
    userId:"",
    articleOwnerId:""
    }
    
  }


  componentWillMount() {
  
  }


  componentDidMount() {
    const { params } = this.props.match;
    debugger
    axios.get(`/articles/one/${params.id}`, {withCredentials:true})
      .then(res => {
        debugger
        let userToken = localStorage.usertoken
        const {_id} = jwt_decode(userToken)
        debugger;
        this.setState({ article: res.data, userId:_id, articleOwnerId:res.data.owner._id })
        console.log("id:", _id);
        console.log("res data:", res.data);
      
      }).catch(err => {
        debugger
        this.setState({errorMessage:err})
        console.log(err)
      })
      // this.state = { loggedInUser: true };

  }

  delete(id){
    console.log(id);
    axios.delete('/articles/'+id, {withCredentials:true})
      .then((result) => {
        this.props.history.push("/profile")
      });
  }

  loggedInUser =  {
    role:'admin' 
  }

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
    console.log(this.state)

    let buttons = (this.state.userId && this.state.userId === this.state.articleOwnerId) ? <button><div>
            <Link to={`/edit/${this.state.article._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.article._id)} class="btn btn-danger">Delete</button>
        </div></button> 
    :
     null
     
    debugger
    return (
      <div className="container">

      {buttons}
          <div className="col-md-12 oneArticle">         
             <h1>{this.state.article.title}</h1>
             <img className="rounded float-left img-responsive" alt="Article" src={this.state.article.imageUrl} />
             <p>{this.state.article.body}</p>
             <h4>Written by: <div className="author">{this.state.article.author}</div></h4>
             <div>

            
               {/* <div>
            
               <Link to={`/edit/${this.state.article._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.article._id)} class="btn btn-danger">Delete</button>
               </div> */}
    
             {/* <AuthorizeOnly allowedRoles={['admin']} user={this.loggedInUser}> */}


             {/* <Link to={`/edit/${this.state.article._id}`} className="btn btn-success">Edit</Link>&nbsp;
              <button onClick={this.delete.bind(this, this.state.article._id)} className="btn btn-danger">Delete</button> */}
            {/* </AuthorizeOnly> */}
      </div>
            <span className="badge post">Posted {this.state.article.date}</span>
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