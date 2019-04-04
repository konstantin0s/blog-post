import axios from 'axios';
import store from 'store';
require("dotenv").config();


export const register = newUser => {
  // return axios.post(`${REACT_APP_URL}/users/register`, {
    return axios.post(`/users/register`, {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    password: newUser.password,
       
  }, {withCredentials: true})
  .then(res => {
    console.log('Registered!, now what? I am from UserFunctions');
  })
  .catch(err => {
    console.log(err)
  })
}

export const login = user => {
  // return axios.post(`${REACT_APP_URL}/users/login`, {
    return axios.post(`/users/login`, {
    email: user.email,
    password: user.password
  },  {withCredentials: true})
  .then(res => {
    // debugger
    localStorage.setItem('usertoken', res.data)
    console.log(res.data);
    // localStorage.setItem('refreshToken', res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const articles = newArticle => {
  // return axios.post(`${REACT_APP_URL}/articles`, {
    return axios.post(`/articles`, {
    title: newArticle.title,
    // author: newArticle.author,
    body: newArticle.body,
    imageUrl: newArticle.imageUrl,
    userId: newArticle.userId
  }, {withCredentials: true})
  .then(res => {
    console.log('Article added!');
  })
}


export const handleUpload = theFile => {

    console.log('file in service: ', theFile)
  // return  axios.post(`${REACT_APP_URL}/upload`, theFile,  {withCredentials: true})
  return  axios.post(`/upload`, theFile,  {withCredentials: true})
      .then(res => res.data)
      .catch(err => {
        console.log(err)
      })
}

export const logOut = () => (e) => {
  e.preventDefault();
  // axios.post(`${REACT_APP_URL}/`,  {withCredentials: true});
  axios.post(`/`,  {withCredentials: true});
  localStorage.removeItem('usertoken');
  store.remove('loggedIn');
  console.log('you have been logged out. boo!');
};
