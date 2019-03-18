import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Profile from './components/Profile';
import Article from './components/Article';
import ShowArticles from './components/ShowArticles';
// import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (

            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/" component={Landing}/>
                    <div className="container">
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/article" component={Article}/>
                        <Route exact path="/articles" component={ShowArticles}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
