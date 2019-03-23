import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ShowArticles.css';



class ShowArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get('/articles', {withCredentials:true})
      .then(res => {
        this.setState({ articles: res.data });
        console.log(this.state.articles);
      });
  }

  render() {
    return (
  <div className="container showArticles">

{this.state.articles.map(article =>      
<div className="col-md-12">                     
    <h1 className="blTitle">{article.title}</h1>
    <p>You ought to be ashamed of yourself for asking such a simple question,' added the Gryphon; and then they both sat silent and looked at poor Alice, who felt ready to sink into the earth. At last the Gryphon said to the Mock Turtle, 'Drive on, old fellow! Don't be all day about it!' and he went on in these words:
    'Yes, we went to school in the sea, though you mayn't believe it—'
    'I never said I didn't!' interrupted Alice.
    'You did,' said the Mock Turtle.</p>
  <p><Link className="linkz" to={`/show/${article._id}`}>Read MORE...</Link></p>   <hr/>
<span className="badge">Posted {article.date}</span><div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
<span className="label label-danger">Danger</span>
</div>   
</div>
)}  
   </div>

    );
  }
}

export default ShowArticles;