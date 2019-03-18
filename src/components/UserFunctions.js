import axios from 'axios';

export const register = newUser => {
  return axios.post('users/register', {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    password: newUser.password
  })
  .then(res => {
    console.log('Registered!, now what? I am from UserFunctions');
  })
}

export const login = user => {
  return axios.post('users/login', {
    email: user.email,
    password: user.password
  })
  .then(res => {
    localStorage.setItem('usertoken', res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const articles = newArticle => {
  return axios.post('/articles', {
    title: newArticle.title,
    author: newArticle.author,
    body: newArticle.body
  })
  .then(res => {
    console.log('Article added!');
  })
}