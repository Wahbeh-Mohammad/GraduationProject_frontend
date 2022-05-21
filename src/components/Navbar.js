import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import "../styles/navbar.css"
import { GoCode } from 'react-icons/go';
import Avatar from '@mui/material/Avatar';

const Navbar = () => {
    const cookie = new Cookies();

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const token = cookie.get("jwt");

    const handleLogout = () => {
        cookie.set("jwt", "", { maxAge: 1, path: "/" });

        window.location.assign("/");
    }

    useEffect(() => {
        const token = cookie.get("jwt");

        try {
            fetch("http://localhost:3000/api/v1/user/jwt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            }).then((response => response.json()))
                .then((responseJson) => {
                    if (responseJson.message === 'Authorized') {
                        setLoggedIn(true)
                        setUser(responseJson.data);
                    }
                    else {
                        setLoggedIn(false);
                        setUser({});
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
    }, []);


    return (
        <>

            {
                loggedIn &&
                <>
                    <div className="nav" >
                        <div className='brand'>
                            <a style={{ marginRight: "5px", fontSize: "26px" }} href="/home">NAME HERE</a>
                            <GoCode size='1.2em' color='black' />
                        </div>
                        <div className='links'>
                            <a href="/problems">Problems</a>
                            <a href="/contests">Contests</a>
                            <a href="/blogs">Blogs</a>
                            <a href='/submit'>Custom Run</a>
                            <a href="/admin/problem/create">Create New Problem</a>

                        </div>
                        <div className='profile'>
                            <div>

                            <Avatar src="/mock.png" style={{marginRight:"0.7em", width:'42px', height:'42px'}}/>
                            </div>
                            
                            <a className ='logout' onClick={handleLogout} href="#" style={{marginRight:"0.7em"}}>Logout</a>
                        </div>
                    </div>

                </>
            }
            {!loggedIn &&
                <>
                    <div className="nav" >
                        <a href="/home"> Home </a>
                        <a href="/problems"> Problems </a>
                        <a href="/contests"> Contests </a>
                        <a href="/blogs"> Blogs </a>
                        <a href="/login" > Login </a>
                        <a href="/register" > Register </a>
                    </div>
                </>
            }
        </>
    );
}

export default Navbar;