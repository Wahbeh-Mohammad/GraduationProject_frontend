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
            }).then((response)=>{
                const parsedResponse = response.json();
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
<<<<<<< HEAD
        <> </> 
=======
        <> { loggedIn && <>
                <h1>Hello World</h1>
                <a href="/submit"> Submit </a>
                <a href="/admin/problem/create"> Create New Problem </a>
             </>
        } </> 
>>>>>>> 9cf4827d5c3be3019d27b98ba0d74e294ac75a90
    );
}
 
export default Home;