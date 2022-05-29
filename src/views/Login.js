import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import Cookies from 'universal-cookie';

import "../styles/login.css";

const Login = (props) => {
    const cookie = new Cookies();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        if(!username || username === "") {
            setError("Username cannot be empty.");
            return;
        }
        if(!password || password === ""){
            setError("Password cannot be empty.");
            return;
        }
            
        const body = { username, password };
        try {
            const response = await fetch("http://localhost:3000/api/v1/user/login", {
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
        <Box className="login-wrapper">
            <Box className="login" component={Paper}>
                <Typography color="primary" variant="h4"> Login </Typography>
                <TextField color = "secondary" label="Username" variant="standard" type="text" onChange={(e) => {setUsername(e.target.value)}} />
                <TextField color = "secondary" label="Password" variant="standard" type="password" onChange={(e) => {setPassword(e.target.value)}} />
                <Button variant="contained" onClick={handleSubmit}> Submit </Button>
                { error && <Typography color="red" variant="h6"> {error} </Typography> }
            </Box>
        </Box>
    );
}

export default Login;