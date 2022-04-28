import axios from 'axios';
import React, { useState  } from 'react'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {

  const navigate = useNavigate();

    const [first_name, setFname] = useState("")
    const [last_name, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")


    const submitForm = ( (e) => {
        let data = {first_name, last_name, email, password, password2}
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/signup/', data)
        navigate('/login')
    })

  return (
    <div className='position-absolute top-50 start-50 translate-middle auth-form'>
      <form onSubmit={submitForm}>
        <center><h4>Signup</h4></center>
        <div className="form-group">
          <label className="form-corntol-label mb-2" htmlFor="first_name">First name</label>
          <input type="text" className="form-control" id="first_name" name="first_name" value={first_name} onChange={(e) => setFname(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-corntol-label mb-2" htmlFor="last_name">Last name</label>
          <input type="text" className="form-control" id="last_name" name="last_name" value={last_name} onChange={(e) => setLname(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-corntol-label mb-2" htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group mt-3">
          <label className="form-corntol-label mb-2" htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group mt-3">
          <label className="form-corntol-label mb-2" htmlFor="password2">Confirm Password</label>
          <input type="password" className="form-control" id="password2" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-success mt-3 w-100'>Signup</button>
      </form>
    </div>
  )
}
