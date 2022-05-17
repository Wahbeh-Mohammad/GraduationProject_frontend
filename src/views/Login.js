import React, { useState } from "react";
import Cookies from 'universal-cookie';

const Login = (props) => {
    const cookie = new Cookies();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        const body = { username, password };
        try {
            const response = await fetch("http://localhost:3002/api/v1/user/login", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(body)
            });
            const parsedResponse = await response.json();
            console.log(parsedResponse);
            if(response.status === 200) {
                const maxAge = 1*24*60*60;
                cookie.set("jwt", parsedResponse.data, { maxAge, path:"/" });
                window.location.assign("/home");
            } else {
                setError(parsedResponse.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form style={{padding:15}}>
            <input value={username} type="text" placeholder="Username" onChange = { (e) => setUsername(e.target.value) } required />
            <input value={password} type="password" placeholder="Password"  onChange = { (e) => setPassword(e.target.value) } required />
            <button onClick={ e=>{e.preventDefault(); handleSubmit()} }>Submit</button>
            { error && <h4> {error} </h4> }
        </form>
    );
}

export default Login;