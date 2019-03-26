import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/OneArticle.css';
import jwt_decode from 'jwt-decode';
import Moment from 'moment';


class OneArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    article: [],
    userId:"",
    articleOwnerId:"",
    owner:""
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

  saveComments() {
    const message = document.getElementById("comment").value;
    axios.post('savecomment', {owner: this.state.owner, text: message})
    .then((res) => {
        document.getElementById("comment").value = "";
    });
  }

  showCommentBox() {
    if (this.state.userId != "") {
      return <div className="">
       <textarea id="comment" placeholder="Add comment" className="form-comtrol"></textarea>
       <button onClick={this.saveComments} className="btn">Save</button>
       </div>
    }
  }

   showComments() {
     if (this.state.article.comments instanceof Array) {
       return  <div className="col-md-12">
           <br />
           <h5>co</h5>
           <p>...</p>
           </div>
     }

   }
  
  render() {
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
    
           {buttons}  {/* Show edit & delete buttons */}
          <div className="col-md-12 oneArticle">         
             <h1>{this.state.article.title}</h1>
             <img className="rounded float-left img-responsive" alt="Article" src={this.state.article.imageUrl} />
             <p>{this.state.article.body}</p>
             <h4>Written by: <div className="author">{this.state.article.author}</div></h4>
                 
            {this.showCommentBox()}
             <div className="row">
            {this.showComments()}
              </div>

            <span className="badge post">Posted 
            {Moment(this.state.article.date).format('YYYY-MM-DD')}
            </span>
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