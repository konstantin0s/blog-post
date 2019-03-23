import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class ShowArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get('/articles')
      .then(res => {
        this.setState({ articles: res.data });
        console.log(this.state.articles);
      });
  }

  render() {
    return (
      <div class="container">
        <div className="jumbotron mt-5">
        <h1 className="text-center">Articles: </h1>
          <div class="panel-body">
            <table className="col md-6 mx-auto">
              <thead>
                <tr>
                  <th>Title</th>
                  {/* <th>Description</th> */}
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.articles.map(article =>
                  <tr>
                    <td><Link to={`/show/${article._id}`}>{article.title}</Link></td>
                    <td>{article.author}</td>
                  </tr>
                )}
              </tbody>
              <h4><Link to="/article"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Blog</Link></h4>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

//   constructor(props) {
//     super(props);
//     this.state = {
//       article: {}
//       // title: '',
//       // author: '',
//       //   body: ''
//    }
//   }

//   componentDidMount() {
//     axios.get('/article'+this.props.match.params.id)
//       .then(res => {
//         this.setState({ article: res.data });
//         console.log(this.state.article);
//       });
//   }

//   delete(id){
//     console.log(id);
//     axios.delete('/article/'+id)
//       .then((result) => {
//         this.props.history.push("/")
//       });
//   }


// render()
//  {
//    return (
//      <div className="container">
//           <div className="jumbotron mt-5">
//           <h1 className="text-center">Articles</h1>
//        </div>
//        <table className="col md-6 mx-auto">
//          <tbody>
//            <tr>
//              <td>Title</td>
//              <td>{this.state.article.title}</td>
//            </tr>
//            <tr>
//              <td></td>
//              <td>{this.state.article.body}</td>
//            </tr>
//            <tr>
//              <td>Author</td>
//              <td>{this.state.article.author}</td>
//            </tr>
//          </tbody>
//        </table>
//        {/* <button onClick={this.delete.bind(this, this.state.article._id)} class="btn btn-danger">Delete</button> */}
//      </div>
//    )
//  }
// }


export default ShowArticles;