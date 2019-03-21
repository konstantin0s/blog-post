import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Profile from './components/Profile';
import Article from './components/Article';
import OneArticle from './components/OneArticle';
import ShowArticles from './components/ShowArticles';
import EditArticle from './components/EditArticle';
// import {Whoops404} from './components/Whoops404';
// import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = { loggedInUser: null };
    //   }
    
    //   getTheUser= (userObj) => {
    //     this.setState({
    //       loggedInUser: userObj
    //     })
    //   }
    

    render() {
        return (

            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <div className="container">
                    <Switch>
                        <Route exact path="/register" component={Register}/>
                        {/* <Route exact path='/register' render={() => <Register getUser={this.getTheUser}/>}/> */}
                        <Route path="/login" component={Login}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/article" component={Article}/>   {/*Add articles form */}
                        <Route path="/articles" component={ShowArticles}/>
                        <Route path='/show/:id' component={OneArticle} />  {/*Show a single article */}
                        <Route path='/edit/:id' component={EditArticle} />
                        {/* <Route component={Whoops404} /> */}
                        {/* Maybe you need to check if user is logged in before using Redict router */}
                        {/* <Redirect from='/profile' to='/login'/>
                        <Redirect from='/article' to='/login'/>
                        <Redirect from='/articles' to='/login'/> */}
                        
                    </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
