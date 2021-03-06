import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ShowArticles.css';
import Moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
require("dotenv").config();


function searchingFor(term) {
  return function(x) {
    return x.title.includes(term) || !term;
  }
}

class ShowArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
    this.searchHandler = this.searchHandler.bind(this);
  }


  searchHandler(event) {
    this.setState({term: event.target.value})
  }

  componentDidMount() {
    // axios.get(`${REACT_APP_URL}/articles`, {withCredentials:true})
    axios.get(`/articles`, {withCredentials:true})
      .then(res => {
        this.setState({ filtered: res.data });
        console.log(this.state.filtered);
      });
  }




  render() {
    return ( 
  <div className="container showArticles">
       <form className="active-pink active-pink-2">
  <FontAwesomeIcon className="faSearch" icon={faSearch} />
  <input onChange={this.searchHandler} className="form-item" type="text" placeholder="Search" aria-label="Search" />
</form>
				
{this.state.filtered.filter(searchingFor(this.state.term)).map((article) =>    

 

<div className="card text-center">
  <div className="card-body">
    <div className="titleOf"><h2 className="card-title">{article.title}</h2></div>
    <p className="card-text">You ought to be ashamed of yourself for asking such a simple question,' added the Gryphon; and then they both sat silent and looked at poor Alice, who felt ready to sink into the earth. At last the Gryphon said to the Mock Turtle, 'Drive on, old fellow! Don't be all day about it!' and he went on in these words:
    'Yes, we went to school in the sea, though you mayn't believe it—'
     'I never said I didn't!' interrupted Alice.
     'You did,' said the Mock Turtle.</p>

  </div>
   <span className="artLink">  <Link className="btn btn-primary linkz" to={`/show/${article._id}`}>Read MORE...</Link></span>
  <div className="card-footer text-muted">
   <p> Posted: {Moment(article.date.dateFrom).format('YYYY-MM-DD')}</p>
  </div>
  <div className="badges">
  <span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
   <span className="label label-danger">Danger</span>
  </div><hr />
</div>

)}  

</div>


    );
  }
}

export default ShowArticles;