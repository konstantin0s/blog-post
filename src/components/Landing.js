import React, {Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

class Landing extends Component {
  render() {
    return (
      <div className="container">
 
    <header className="masthead lanImage">
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <h1>Guru Blog</h1>
            <span className="subheading">A Blog ....</span>
          </div>
        </div>
      </div>
    </div>
  </header>


  <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">Title of a longer featured blog post</h1>
          <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
          <p className="lead mb-0"><a href="#" className="text-white font-weight-bold">Continue reading...</a></p>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
              <strong className="d-inline-block mb-2 text-primary">World</strong>
              <h3 className="mb-0">
                <a className="text-dark" href="#">Featured post</a>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
       <img className="card-img-right flex-auto d-none d-md-block" alt="Card image cap"/>
          </div>
        </div>
         </div>
         <div class="col-md-6 card-second">
          <div class="card flex-md-row mb-4 box-shadow h-md-250">
            <div class="card-body d-flex flex-column align-items-end">
              <strong class="d-inline-block mb-2 text-success">Design</strong>
              <h3 class="mb-0">
                <a class="text-dark" href="#">Post title</a>
              </h3>
              <div class="mb-1 text-muted">Nov 11</div>
              <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <a href="#">Continue reading</a>
            </div>
            <img className="card-img-right flex-auto d-none d-md-block" alt="Card image cap"/>
          </div>
        </div>
        <hr></hr>
        <footer class="blog-footer">
      <p>Blog Self Development built for <a href="#">YOu</a></p>
      <p>
        <a href="#">Back to top</a>
      </p>
    </footer>

      </div>
  

               
    )
  }
}
 
export default Landing;