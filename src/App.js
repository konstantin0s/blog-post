import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Profile from './components/Profile';
import Article from './components/Article';
import OneArticle from './components/OneArticle'
import ShowArticles from './components/ShowArticles';
import EditArticle from './components/EditArticle';
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
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/article" component={Article}/>   {/*Add articles form */}
                        <Route exact path="/articles" component={ShowArticles}/>
                        <Route path='/show/:id' component={OneArticle} />  {/*Show a single article */}
                        <Route path='/edit/:id' component={EditArticle} />
                    </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
