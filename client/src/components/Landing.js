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


  <div className="row mb-2 zeroCard">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">How to Stop Being Shy: 9 Guaranteed Ways To Overcome Shyness</h1>
          <p className="lead my-3 bText">Do you struggle with shyness in social situations?

For a shy person, small talk can be agonizing. You become racked with fear thinking of possible ways to answer a simple question about the weather. Some shy folks would rather have a root canal than speak in front of a large crowd or approach a stranger for networking.

Your default move is to keep your distance from others, which people misinterpret as being snobbish. They won’t see the fear you have of not knowing what to say if they start a conversation with you.

If your shyness gets in the way of how you interact with others so that you avoid social situations, it may be that you have a condition called social anxiety. The infographic below shows some facts about social anxiety disorder.</p>
          <p className="lead mb-0"><Link to="/profile" className="btn btn-primary linkz user">Continue reading...</Link></p>
                  <hr />
                     <img  src="https://www.developgoodhabits.com/wp-content/uploads/2019/01/stop-being-shy.jpg" className="card-img-right flex-auto d-none d-md-block" alt="Card cap"/>
        </div>
     </div>

      <div className="row mb-2 firstCard">
        <div className="col-md-6">
          <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
                    <h1 className="display-4 font-italic">9 Ways to Stop Obsessing Over Someone—Even That “Dream” Guy or Girl</h1>
              <h3 className="mb-0">
                <Link to="/login" className="btn btn-primary linkz">Featured Post</Link>
              </h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto jaja">“The greatest power we have is the power to create reality.” – Deepak Chopra Click to Tweet Have you heard of the term “obsessive love disorder?” When we are attracted to a guy or girl, it is normal to have persistent thoughts about the one we are attracted to. It’s not surprising that we’d want to […]</p>
  
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
        <p className="copyright text-muted">Copyright &copy; YouHelp 2019</p>
    </footer>

      </div>
  

               
    )
  }
}
 
export default Landing;