import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const Home = (props) => {
    const cookie = new Cookies();

    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const token = cookie.get("jwt");
        if(!token) {
            window.location.assign("/login");
        }
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
                } else {
                    cookie.set("jwt", "", { maxAge: 1, path:"/" });
                    window.location.assign("/login");
                }
            })
        } catch (err) {
            console.log(err);
        }
    }, []);


    return ( 
        <> { loggedIn && <>
                <h1>Hello World</h1>
                <a href="/submit"> Submit </a>
             </>
        } </> 
    );
}
 
export default Home;