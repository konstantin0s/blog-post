import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/OneArticle.css';
import jwt_decode from 'jwt-decode';
import Moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub }  from '@fortawesome/free-brands-svg-icons' 
import { faFacebook } from '@fortawesome/free-brands-svg-icons' 
import { faTwitter } from '@fortawesome/free-brands-svg-icons' 

let $this; 
class OneArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    article: [],
    userId:"",
    articleOwnerId:"",
    owner: "",
    id: "",
    first_name: "",
    
    like: false,
    likes: 0
    }
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
        this.setState({ article: res.data, userId:_id, first_name:res.data.owner.first_name, articleOwnerId:res.data.owner._id})
           console.log(res.data.owner.first_name);
           console.log(this.state.article);
      }).catch(err => {
        debugger
        this.setState({errorMessage:err})
        console.log(err)
      })

      axios.get(`/users/one/:id`, {withCredentials:true})  
      .then((response)=> {
        let userToken = localStorage.usertoken;
        // const {first_name} = jwt_decode(userToken);
        this.setState({owner: response.data.id})
          // this.setState({owner: response.data.id, first_name:response.data.owner.first_name})
          console.log(this.state.owner);
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

  saveComments = (e)=> {
    e.preventDefault()
    const message = document.getElementById("comment").value;
    debugger
    axios.post('/articles/savecomment', {id: this.state.article._id, owner: this.state.article.owner, text: message}, {withCredentials:true})
    .then((res) => {
      debugger
      this.setState({ article: res.data})
        document.getElementById("comment").value = "";
    }).catch(err => {
      debugger
    })
  }

  showCommentBox() {
    if (this.state.userId != "") {
      return          <div className="callout secondary">
      <h4 className="leave-comment">Add a Comment:</h4>
      <form className="post-edit" ref="commentForm" onSubmit={e => this.saveComments(e)}>
        <textarea id="comment" className="form-comtrol" placeholder="Share your thoughts" required/> <br />
        <button id="submit" type="submit" className="btn btn-primary btn btn-outline comment-btn action-btn expand-right">Post Comment</button>
      </form>
    </div>
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
                                          <a href="#" className="anchor-username"><h3 className="media-heading">Username: {c.owner.first_name}</h3></a> 
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
       {buttons}  
      </div>    
     
              <img className="rounded float-left img-responsive" alt="Article" src={this.state.article.imageUrl} />
               <div className="bodys">
               <div className="jumbo"> <h1>{this.state.article.title}</h1>
               <div className="ilPost">
              <span className="postz">  On </span>
          <span className="date">  {Moment(this.state.article.date).format('YYYY-MM-DD')}
             </span>
                
              <h4>Posted by: </h4>
              <div className="author">{this.state.article.owner? this.state.article.owner.first_name: ""}</div>
                 </div>
              </div>
              <p className="body-text">{this.state.article.body}</p>
            {this.showCommentBox()}
             <div className="row">
            {this.showComments()}
               </div>
            </div>   
            <footer>
    <div className="container footer">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <ul className="list-inline text-center">
            <li className="list-inline-item">
              <a href="#">
                <span className="fa-stack fa-lg">
              <FontAwesomeIcon className="faTwitter" icon={faTwitter} />
                </span>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                    <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                </span>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <span className="fa-stack fa-lg">
                   <FontAwesomeIcon className="faGithub" icon={faGithub} />
                </span>
              </a>
            </li>
          </ul>
          <p className="copyright text-muted">Copyright &copy; YouHelp 2019</p>
        </div>
      </div>
    </div>
  </footer>

  <div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
                <span className="label label-danger">Danger</span>
           <hr/>
               </div>

           </div> 

    );
  }
}

export default OneArticle;