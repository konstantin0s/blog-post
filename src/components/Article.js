import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import {articles} from './UserFunctions';

class Article extends Component {
  constructor() {
      super()
      this.state = {
          title: '',
          author: '',
          body: ''
      }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  onSubmit(e) {
      e.preventDefault()

      const article = {
        title: this.state.title,
        author: this.state.author,
         body: this.state.body
      
      }

      articles(article).then(res => {
           this.props.history.push('/articles')
      })
  }

  render() {
      return (
          <div className="d-flex justify-content-center">
             <div className="d-flex justify-content-center">
                  <div className="col-md-6 mt-5">
                      <form noValidate onSubmit={this.onSubmit}>
                          <h1 className="h3 mb-3 font-weight-normal">Add Article</h1>
                          <div className="form-group">
                              <label htmlFor="title">
                                  Title:
                              </label>
                              <input
                                  type="text"
                                  className="form-control"
                                  name="title"
                                  placeholder="Title"
                                  value={this.state.title}
                                  onChange={this.onChange}/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="author">
                                  Author:
                              </label>
                              <input
                                  type="text"
                                  className="form-control"
                                  name="author"
                                  placeholder="Author"
                                  value={this.state.author}
                                  onChange={this.onChange}/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="body">
                                  Body
                              </label>
                              <textarea
                                  type="text"
                                  className="form-control"
                                  name="body"
                                  placeholder="Enter Post"
                                  value={this.state.body}
                                  onChange={this.onChange}/>
                          </div>
                          <button type="submit" className="btn btn-lg btn-primary btn-block">
                              Post
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      )
  }
}

export default Article;