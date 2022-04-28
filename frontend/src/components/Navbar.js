import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    // const [token, settoken] = useState()
    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.reload(false);
    }

    // useEffect(() => {

    //     settoken(window.localStorage.getItem("accessToken"));
    //     console.log("got it");
    // }, [window.localStorage.getItem("accessToken")])
    
    // console.log("accessToken",window.localStorage.getItem("accessToken"));


    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><b>React notes app</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto pe-5">
                            {localStorage.getItem("accessToken") ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-note">Add Note</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
                                </li>
                            </>
                            : <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/sign-up">Sign up</Link>
                                </li>
                            </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
