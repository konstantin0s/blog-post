import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';


class ShowArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
        email: ''
}
  }

  componentDidMount() {
    axios.get('/article'+this.props.match.params.id)
      .then(res => {
        this.setState({ article: res.data });
        console.log(this.state.article);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/article/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }


render()
 {
   return (
     <div className="container">
          <div className="jumbotron mt-5">
          <h1 className="text-center">Articles</h1>
       </div>
       <table className="col md-6 mx-auto">
         <tbody>
           <tr>
             <td>Title</td>
             <td>{this.state.article.title}</td>
           </tr>
           <tr>
             <td></td>
             <td>{this.state.article.body}</td>
           </tr>
           <tr>
             <td>Author</td>
             <td>{this.state.article.author}</td>
           </tr>
         </tbody>
       </table>
       <button onClick={this.delete.bind(this, this.state.article._id)} class="btn btn-danger">Delete</button>
     </div>
   )
 }
}


export default ShowArticles;