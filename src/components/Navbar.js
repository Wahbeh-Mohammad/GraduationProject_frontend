import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import "../styles/navbar.css"
import { GoCode } from 'react-icons/go';
import { Avatar, Menu, MenuItem } from '@mui/material';


const Navbar = () => {
    const cookie = new Cookies();
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const token = cookie.get("jwt");

    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = (to) => {
        setOpen(false);
        setAnchorEl(null);
        if(to === "admin")
            window.location.assign("/admin");
        else if(to === "profile")
            window.location.assign(`/user/${user.id}`);
    } 

    const handleLogout = () => {
        cookie.set("jwt", "", { maxAge: 1, path: "/" });

        window.location.assign("/home");
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
                        setLoggedIn(true);
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
                            <GoCode size='1.2em' color='orange' />
                        </div>
                        <div className='links'>
                            <a href="/problems">Problems</a>
                            <a href="/contests">Contests</a>
                            <a href="/allsubmision">Submissions</a>
                            <a href="/users">Users</a>
                        </div>
                        <div className='profile'>
                            <div>
                                <Avatar 
                                    onClick={ handleOpen }
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    src="/mock.png" style={{marginRight:"0.7em", width:'42px', height:'42px'}}/>
                                <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                                    <MenuItem onClick={ (e) => handleClose("profile") }> Profile </MenuItem>
                                    { user.type === "Admin" &&
                                        <MenuItem onClick={ (e) => handleClose("admin") }> Admin Panel </MenuItem>
                                    }
                                </Menu>
                            </div>
                            <a className ='logout' onClick={handleLogout} href="#" style={{marginRight:"0.7em"}}>Logout</a>
                        </div>
                    </div>

                </>
            }
            {!loggedIn &&
                <>
                    <div className="nav" >
                        <div className='brand'>
                            <a style={{ marginRight: "5px", fontSize: "26px" }} href="/home">NAME HERE</a>
                            <GoCode size='1.2em' color='orange' />
                        </div>
                        <div className='links'>
                            <a href="/problems">Problems</a>
                            <a href="/contests">Contests</a>
                            <a href="/allsubmision">Submissions</a>
                            <a href="/users">Users</a>
                        </div>
                        <div className='profile links'>
                            <a href = "/login" style={{marginRight:'1em'}}>Login</a>
                            <a className ='logout'  href="/register" style={{marginRight:"0.7em"}}>Register</a>
                        </div>
                    </div>
                </>
            } 
        </> 
    );
}

export default Navbar;