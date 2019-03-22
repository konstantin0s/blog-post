import axios from 'axios';
import store from 'store';

export const register = newUser => {
  return axios.post('users/register', {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    password: newUser.password,
       
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
    // localStorage.setItem('refreshToken', refreshToken)
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
    body: newArticle.body,
    imageUrl: newArticle.imageUrl,
  })
  .then(res => {
    console.log('Article added!');
  })
}


export const handleUpload = theFile => {

    console.log('file in service: ', theFile)
  return  axios.post('/upload', theFile)
      .then(res => res.data)
      .catch(err => {
        console.log(err)
      })
}

export const logOut = () => (e) => {
  e.preventDefault();
  axios.post('/logout');
  localStorage.removeItem('usertoken');
  store.remove('loggedIn');
  console.log('you have been logged out. boo!');
};