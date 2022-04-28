import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

export const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/login/', {
      email,
      password
    })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
          navigate('/')
        }
        return response.data;
      });
  }

  return (
    <div className='position-absolute top-50 start-50 translate-middle auth-form'>
      <form onSubmit={login}>
        <center><h4>Login</h4></center>
        <div className="form-group">
          <label className="form-corntol-label mb-2" htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group mt-3">
          <label className="form-corntol-label mb-2" htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-success mt-3 w-100'>Login</button>
      </form>
    </div>
  )
}
