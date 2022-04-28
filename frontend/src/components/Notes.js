import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from  'axios';

export const Notes = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const submitNote = ((e) => {
        e.preventDefault();

        const data = {title, description}
        const config = {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        };
        console.log(config.headers.Authorization)
        axios.post('http://127.0.0.1:8000/api/create/', data, config)
        navigate("/")
    })

    return (
        <div className='container mt-5'>
            <div className='notes-form'>
                <h4 className='mt-4 mb-4'>Add new note -</h4>
                <form onSubmit={submitNote} action='/'>
                    <div className='form-group mt-3 mb-3'>
                        <label className='form-control-label' htmlFor='title'>Title</label>
                        <input type='text' className='form-control' name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </div>      
                    <div className='form-group mt-3'>
                        <label className='form-control-label' htmlFor='description'>Description</label>
                        <input type='text' className='form-control' name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <button type='submit' className='btn btn-success mt-3'>Add note</button>
                </form>
            </div>
        </div>
    )
}
