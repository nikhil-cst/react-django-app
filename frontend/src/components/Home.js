import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Home = () => {

  let navigate = useNavigate()
  const [note, setData] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
  };
  
  const getData = () => {
    
  axios.get('http://127.0.0.1:8000/api/', config)
    .then((response) => {
      setData(response.data);
    })
  }

  const updateNote = (id) => {
    navigate(`/update-note/${id}`)
  }

  const deleteNote = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://127.0.0.1:8000/api/${id}/`, config)
      .then(() => getData())
    }
  };

  useEffect(() => {
      getData();
    }, []
  );

  if (note.length === 0){ 
    return (
    <>
      <div className='container mt-5'>
        <div className='selectstate'>
          <h4><center>No notes created yet! <br /><Link to="/add-note"><button>Create note &nbsp; &#128203;</button></Link></center></h4>
        </div>
      </div>
    </>
  )}
  
  else
  {
    return (
      <div className='container mt-5'>
        <div className='selectstate'>
          <h4><center>React crud operation with Django rest api. </center></h4>
        </div>
        <div className='notes-form'>
          <h3>Available notes - </h3>
        </div>
        <div className='row'>
          {
            note.map((curNote) => (
              <div className='col-lg-4'>
                <div className='card'>
                  <h5 className='text-muted'>{curNote.title}</h5>
                  <p><b>{curNote.description}</b></p>
                  <div className="row">
                    <div className="col-6">
                      <button className='btn btn-primary w-75' type='button' onClick={() => updateNote(curNote.id)}>Edit</button> 
                    </div>
                    <div className="col-6">
                      <button type='button' className='btn btn-danger w-75' onClick={() => deleteNote(curNote.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              )
            )
          }
        </div>
      </div>
    )
  }
}
