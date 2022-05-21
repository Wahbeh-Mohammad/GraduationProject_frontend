import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const Navbar = () => {
    const cookie = new Cookies();

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const token = cookie.get("jwt");

    const handleLogout = () =>{
        cookie.set("jwt", "", { maxAge: 1, path:"/" });

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
                    if(responseJson.message === 'Authorized'){
                        setLoggedIn(true)
                        setUser(responseJson.data);
                    }
                    else{
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
                    <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
                        <a href="/home"> Home </a>
                        <a href="/problems"> Problems </a>
                        <a href="/contests"> Contests </a>
                        <a href="/blogs"> Blogs </a>
                        <a href='/submit'>Custom Run</a>
                        <div>
                            Hi {" "}
                            <a href={`/user/${user.id}`}>{user.username} </a>
                        </div>
                        <a onClick={handleLogout} href="#">Logout</a>
                    </div>

                </>
            }
            {!loggedIn && 
                <>
                    <div style={{ 'display': 'flex', justifyContent: 'space-around' }}>
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