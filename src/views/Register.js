import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { Box, Button, TextField, Typography, RadioGroup, Radio, FormControlLabel, Paper } from "@mui/material";

import "../styles/register.css";

const Register = (props) => {
    const cookie = new Cookies();
    const [info, setInfo] = useState("");
    const [registrationData, setRegistrationData] = useState({
        'gender': 'male'
    });

    const handleChange = (e, field) => {
        const value = e.target.value
        setRegistrationData((registrationData) => {
            registrationData[field] = value;
            return registrationData
        })
    }
    
    const handleSubmit = async () => {
        console.log(registrationData)
        const response = await fetch('http://localhost:3000/api/v1/user/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registrationData)
        })
        const jsonResponse = await response.json();
        if(response.status === 200){
            const maxAge = 1*24*60*60;
            cookie.set("jwt", jsonResponse.data.signedToken, { maxAge, path:"/" });
            window.location.assign("/home");
        }
        else setInfo(jsonResponse.message)
    }

    return (
        <Box className="register-wrapper">
            <Box className="register flex-col-gap" component={Paper}>
                <Box className="flex-col-gap align-center"> 
                    <Typography color="primary" variant="h4">Register</Typography>
                </Box>
                <TextField type="text" label="Name" onChange={(e) => handleChange(e, "name")} />
                <Box className="flex-row-gap">
                    <TextField type="text" label="Username" onChange={(e) => handleChange(e, "username")} />
                    <TextField type="password" label="Password" onChange={(e)=> handleChange(e, "password")} />
                </Box>
                <TextField type="email" label="Email" onChange={(e) => handleChange(e, "email")} />
                <Box className="flex-row-gap align-center">
                    <Typography color="primary">Gender</Typography>
                    <RadioGroup 
                        defaultValue="male"
                        onChange={e => handleChange(e, "gender")}>
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    </RadioGroup>            
                </Box>
                <TextField type="text" label="Country" onChange={((e) => handleChange(e, "country"))} />
                <Box className="flex-col-gap align-center"> 
                    <Button onClick={handleSubmit} color="primary" variant="contained"> Register </Button>
                </Box>
                {info && <Typography variant="h6" color="red">{info}</Typography>}
            </Box>
        </Box>
    );
}

export default Register;