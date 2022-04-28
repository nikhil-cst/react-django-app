import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from  'axios';

export const Updatenote = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    
    const config = {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
    };

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/api/${id}/`, config)
            .then((response) => {
            setTitle(response.data.title);
            setDescription(response.data.description);
        })
    }

    const updateNotedata = (() => {
        const data = {title, description}
        axios.put(`http://127.0.0.1:8000/api/${id}/`, data, config)
        navigate("/")
    })

    useEffect(() =>{
        getData()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container mt-5'>
            <div className='notes-form'>
                <h4 className='mt-4 mb-4'>Update note -</h4>
                <form onSubmit={updateNotedata}>
                    <div className='form-group mt-3 mb-3'>
                        <label className='form-control-label' htmlFor='title'>Title</label>
                        <input type='text' className='form-control' name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </div>      
                    <div className='form-group mt-3'>
                        <label className='form-control-label' htmlFor='description'>Description</label>
                        <input type='text' className='form-control' name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <button type='submit' className='btn btn-success mt-3'>Update note</button>
                </form>
            </div>
        </div>
    )
}
