import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/OneArticle.css';
import jwt_decode from 'jwt-decode';
import Moment from 'moment';

let $this; 
class OneArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    article: [],
    userId:"",
    articleOwnerId:"",
    owner: "",
    id: ""
    }
    $this = this;
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
          //  console.log(article);
           console.log(this.state.article);
      }).catch(err => {
        debugger
        this.setState({errorMessage:err})
        console.log(err)
      })

      axios.get(`/users/one/:id`, {withCredentials:true})
      .then((response)=> {
          this.setState({owner: response.data.id})
          debugger
          console.log(response.data.id)
          debugger
      })
      .catch((error)=> {
          this.setState({error})
      })
  }

  delete(id){
    console.log(id);
    axios.delete('/articles/'+id, {withCredentials:true})
      .then((result) => {
        this.props.history.push("/profile")
      });
  }

  saveComments = ()=> {
    const message = document.getElementById("comment").value;
    debugger
    axios.post('/articles/savecomment', {id: this.state.article._id, owner: this.state.article.owner, text: message}, {withCredentials:true})
    .then((res) => {
      debugger
        document.getElementById("comment").value = "";
    }).catch(err => {
      debugger
    })
  }

  showCommentBox() {
    if (this.state.userId != "") {
      return          <div className="callout secondary">
      <h4 className="leave-comment">Add a Comment</h4>
      <form className="post-edit" ref="commentForm" onSubmit={this.saveComments}>
        <textarea id="comment" className="form-comtrol" placeholder="Share your thoughts" required/> <br />
        <button id="submit" type="submit" className="btn btn-primary btn btn-outline comment-btn action-btn expand-right">Post Comment</button>
      </form>
    </div>
      //     <div className="callout secondary">
      // <h4 className="leave-comment">Add a Comment</h4>
      //  <textarea id="comment" placeholder="Add comment" className="form-comtrol"></textarea>
      //  <button onClick={() => this.saveComments(id)} className="btn">Save</button>
      //  </div>
    }
  }

  showComments(){
    if(this.state.article.comments instanceof Array){
        const comments = this.state.article.comments.reverse();
        return comments.map(function(c, i){
          debugger
          return    <div className="container showComm">
            <div className="col-md-8">
                  <div className="panel panel-default">
                      <div className="panel-body">
                         <section className="post-heading">
                              <div className="row">
                                  <div className="col-md-11">
                                      <div className="media">
                                        <div className="media-body">
                                          <a href="#" className="anchor-username"><h4 className="media-heading">Bayu Darmantra</h4></a> 
                                          <a href="#" className="anchor-time">51 mins</a>
                                        </div>
                                      </div>
                                  </div>
                                   <div className="col-md-1">
                                       <a href="#"><i className="glyphicon glyphicon-chevron-down"></i></a>
                                   </div>
                              </div>             
                         </section>
                         <section className="post-body">
                             <p> {c.text} </p>
                         </section>
                         <section className="post-footer">
                             <hr />
                             <div className="post-footer-option container">
                                  <ul className="list-unstyled">
                                      <li><a href="#"><i className="glyphicon glyphicon-thumbs-up"></i> Like</a></li>
                                      <li><a href="#"><i className="glyphicon glyphicon-comment"></i> Comment</a></li>
                                      <li><a href="#"><i className="glyphicon glyphicon-share-alt"></i> Share</a></li>
                                  </ul>
                             </div>
                             <div className="post-footer-comment-wrapper">
                                 <div className="comment-form">
                                     
                                 </div>
                                 <div className="comment">
                                      <div className="media">
                                        <div className="media-left">
                                          <a href="#">
                                            <img className="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="32" height="32" alt="..." />
                                          </a>
                                        </div>
                                        <div className="media-body">
                                          <a href="#" className="anchor-username"><h4 className="media-heading">Media heading</h4></a> 
                                          <a href="#" className="anchor-time">51 mins</a>
                                        </div>
                                      </div>
                                 </div>
                             </div>
                         </section>
                      </div>
                  </div>   
            </div>
          </div>
   
            {/* // return  <div classNameName="col-md-12" key={i}>
            //             <br/>
            //             {/* <h5>User: {c.article.owner.first_name}</h5> */}
            {/* //             <p>{c.text}</p>
            //         </div> */}
          {/* //   return <div className="comment-user-text" key={i}>
          //   <a href="#0" data-username="cathbailh" className="comment-username">
          //       <span className="username">
          //         {c.first_name}
          //       </span>
          //   </a>
          //   <span className="on"> on </span>
          //   <a href="#0">
          //     <time className="block-comment-time">
          //       {c.text}
          //     </time>
          //   </a>
          // </div> */} 
        })
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
               
      <div className="jumbotron">
      <div className="oneArticle">
      
      </div>
      <h1>{this.state.article.title}</h1>
              <img className="rounded float-left img-responsive" alt="Article" src={this.state.article.imageUrl} />
               <div className="bodys">
              <p className="body-text">{this.state.article.body}</p>
              <span className="badge post">Posted 
           {Moment(this.state.article.date).format('YYYY-MM-DD')}
             </span>

              <h4>Written by: <div className="author">{this.state.article.author}</div></h4>
              </div>
            {this.showCommentBox()}
             <div className="row">
            {this.showComments()}
               </div>

           <div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
             <span className="label label-danger">Danger</span>
               <div className="edel"> 
              </div>
           <hr/>
            </div>   
           </div>


      // <div className="container">
    
      //      {buttons}  {/* Show edit & delete buttons */}
      //     <div className="col-md-12 oneArticle">         
      //        <h1>{this.state.article.title}</h1>
      //        <img className="rounded float-left img-responsive" alt="Article" src={this.state.article.imageUrl} />
      //        <p>{this.state.article.body}</p>
      //        <span className="badge post">Posted 
      //       {Moment(this.state.article.date).format('YYYY-MM-DD')}
      //       </span>

      //        <h4>Written by: <div className="author">{this.state.article.author}</div></h4>
                 
      //       {this.showCommentBox()}
      //        <div className="row">
      //       {this.showComments()}
      //         </div>

      //       <div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
      //       <span className="label label-danger">Danger</span>
      //          <div className="edel"> 
      //          </div>
      //      <hr/>
      //       </div>   
      //       </div>
      // </div>
    );
  }
}

export default OneArticle;