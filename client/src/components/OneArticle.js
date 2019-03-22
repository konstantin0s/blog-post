import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
          <div className="col-md-12 oneArticle">         
             <h1>{this.state.oneArticle.title}</h1>
             <img className="rounded float-left img-responsive" alt="Article" src={this.state.oneArticle.imageUrl} />
             <p>{this.state.oneArticle.body}</p>
               
            <span className="badge">Posted {this.state.oneArticle.date}</span><div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
            <span className="label label-danger">Danger</span>
               <div className="edel"> 
               <Link to={`/edit/${this.state.oneArticle._id}`} class="btn btn-success">Edit</Link>&nbsp;
               <button onClick={this.delete.bind(this, this.state.oneArticle._id)} class="btn btn-danger">Delete</button>
               </div>
           <hr/>
            </div>   
            </div>
      </div>
    );
  }
}

export default OneArticle;