import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const Home = (props) => {
    const cookie = new Cookies();

    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const token = cookie.get("jwt");
        try {
            fetch("http://localhost:3000/api/v1/user/jwt", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ token })
            }).then(async(response)=>{
                const parsedResponse = await response.json();
                console.log(parsedResponse);
                if(response.status === 200) {
                    setLoggedIn(true);
                }
            })
        } catch (err) {
            console.log(err);
        }
    }, []);


    return ( 
        <>
        <a href="/login" > Login </a>
        <a href="/register" > Register </a>
        <a href='/contests/:id'> contests</a> </> 
    );
}
 
export default Home;
