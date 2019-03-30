import React, {Component} from 'react';
import './css/landing.css';
import {Link} from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="containe headerImg">
 
    <header className="masthead lanImage">
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <span className="subheading"><h1>A Blog About Personal Development.</h1></span>
          </div>
        </div>
      </div>
    </div>
  </header>



        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">Title of a longer featured blog post</h1>
          <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
          <p className="lead mb-0"><Link to="/profile" className="btn btn-primary linkz user">Continue reading...</Link></p>
                  <hr />
                     <img  src="https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-right flex-auto d-none d-md-block" alt="Card cap"/>
        </div>
    

      <div className="row mb-2">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
                    <h1 className="display-4 font-italic">Title of a longer featured blog post</h1>
              <h3 className="mb-0">
                <Link to="/profile" className="btn btn-primary linkz">Featured Post</Link>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto jaja">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <p className="lead mb-0">  <Link to="/profile" className="btn btn-primary linkz continue">Continue reading...</Link> </p>
              <hr />
            </div>
       <img  src="https://images.pexels.com/photos/2042187/pexels-photo-2042187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-right flex-auto d-none d-md-block sec" alt="Card cap"/>
          </div>
        </div>
         </div>
         <div className="col-md-12 card-second">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-end">
              <h3 className="mb-0">
                <a className="text-dark" href="/">How To Overcome Fear Of Public Speaking</a>
              </h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="card-text mb-auto botto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            
            </div>
    
          </div>
        </div>
         <hr />

        <footer className="blog-footer">
         <p>Blog Self Development built for <a href="/">YOu</a></p>
        <p>
           <a href="/">Back to top</a>
        </p>
    </footer>

      </div>
  

               
    )
  }
}
 
export default Landing;