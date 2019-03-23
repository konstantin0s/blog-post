// auth/auth-service.js

import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:3001',
      withCredentials: true
    });
    this.service = service;
  }

  // signup = (first_name, last_name, email, password) => {
  //   return this.service.post('users/register', {first_name, last_name, email, password})
  //   .then(response => response.data)
  // }
  

  loggedin = () => {
    return this.service.get('users/login')
    .then(response => response.data)
  }





}

export default AuthService;