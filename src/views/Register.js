import React, { useState } from "react";
import Cookies from 'universal-cookie';

const Register = (props) => {
    const cookie = new Cookies();
    const [info, setInfo] = useState("");
    const [registrationData, setRegistrationData] = useState({
        'gender': 'male'
    })
    const handleChange = (e, field) => {
        const value = e.target.value
        setRegistrationData((registrationData) => {
            registrationData[field] = value;
            return registrationData
        })
    }
    const handleSubmit = async () => {
        console.log(registrationData)
        const response = await fetch('http://localhost:3002/api/v1/user/signup', {
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
        <>
            {info && <h1>{info}</h1>}
            <form style={{ padding: 15, display: "block" }}>
                <input name="name" type='text' onChange={(e) => { handleChange(e, "name") }} placeholder="Name" required /><br /><br />
                <input name="username" type='text' onChange={(e) => { handleChange(e, "username") }} placeholder="username" required /><br /><br />
                <input name="email" type='text' onChange={(e) => { handleChange(e, "email") }} placeholder="abc@gamil.com" required /><br /><br />
                <div onChange={(e) => { handleChange(e, "gender") }}><br /><br />
                    <input type="radio" value="Male" name="gender" />Male
                    <input type="radio" value="Female" name="gender" />Female
                </div>
                <input name="country" type='text' onChange={(e) => { handleChange(e, "country") }} placeholder="Country" required /><br /><br />
                <input name="password" type='password' onChange={(e) => { handleChange(e, "password") }} placeholder="Password" required /><br /><br />
                <button onClick={e => { e.preventDefault(); handleSubmit() }}>Submit</button>
            </form>
        </>
    );
}

export default Register;