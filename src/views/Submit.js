import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { prepareCode } from "../utils/encodingUtils";
import Editor from "@monaco-editor/react"
import { TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const SAMPLE_CPP = `
#include <bits/stdc++.h>
using namespace std;

int main() {
    string name;
    cin>>name;
    cout << "Hello " + name;
    return 0;
}`

const CPP_ID = 53;
const languages = {
    cpp: 53,
    java: 62,
    python: 71
}
const Submit = (props) => {
    const cookie = new Cookies();
    const [code, setCode] = useState(SAMPLE_CPP);
    const [languageID, setLanguageID] = useState(53);
    const [languageName, setLanguageName] = useState("cpp");
    const [stdin, setStdin] = useState("");
    const [stdout, setStdout] = useState("");
    const [time, setTime] = useState(null);
    const [memory, setMemory] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const hanldeLanguageChange = (e) => {
        const name = e.target.value;
        const id = languages[name];
        console.log(name, id)
        setLanguageName(name);
        setLanguageID(id);
    }
    const handleStdin = (e) => {
        setStdin(e.target.value)
    }
    const handleSubmit = async () => {
        setIsPending(true)
        const body = { stdin, source_code: prepareCode(code), language_id: languageID };
        try {
            console.log(body);
            const response = await fetch("http://localhost:3000/api/v1/submission/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${cookie.get("jwt")}`
                },
                body: JSON.stringify(body)
            });
            const parsedResponse = await response.json();
            console.log(parsedResponse);
            if (parsedResponse.data === 'Compilation Error') {
                setStdout(parsedResponse.data)
                setIsPending(false)
                return
            }
            if (parsedResponse.data.stderr) {
                setStdout(parsedResponse.data.stderr)
            }
            else setStdout(parsedResponse.data.stdout)
            setIsPending(false)
            setTime(parsedResponse.data.time)
            setMemory(parsedResponse.data.memory)
        } catch (err) {
            setIsPending(false)
            setStdout("ERROR")
            console.log(err);
        }
    }

    useEffect(() => {
        const token = cookie.get("jwt");
        if (!token) {
            window.location.assign("/login");
        }
        try {
            fetch("http://localhost:3000/api/v1/user/jwt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            }).then((response) => {
                const parsedResponse = response.json();
                console.log(parsedResponse);
                if (response.status === 200) {
                    setLoggedIn(true);
                } else {
                    cookie.set("jwt", "", { maxAge: 1, path: "/" });
                    window.location.assign("/login");
                }
            })
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div style={{ marginTop: "50px", display: 'flex' }}> {loggedIn && <>

            <Editor
                height="70vh"
                width="70vw"
                language={languageName}
                onChange={(e) => setCode(e)}
                className="editor"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{ marginLeft: '2em' }}>Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label = ""
                        style={{ width: '75%', marginLeft: '2em', backgroundColor: 'white' }}
                        color='secondary'
                        value={languageName}
                        onChange={hanldeLanguageChange}
                    >
                        <MenuItem value="cpp"> C++ </MenuItem>
                        <MenuItem value="java"> Java</MenuItem>
                        <MenuItem value="python"> Python</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="filled-multiline-flexible"
                    label="Input"
                    rows={10}
                    style={{ backgroundColor: 'white', marginLeft: '2em', marginBlock: '2em' }}
                    multiline
                    maxRows={4}
                    value={stdin}
                    onChange={handleStdin}
                    variant="outlined"
                />
                <TextField
                    id="filled-multiline-flexible"
                    label="Output"
                    rows={10}
                    style={{ backgroundColor: 'white', marginLeft: '2em' }}
                    multiline
                    maxRows={4}
                    value={stdout}
                    variant="outlined"
                />
                <br />

                <div style={{marginLeft:'2em'}}>
                    {!isPending && <Button variant = "contained" color = "secondary" fullWidth onClick={handleSubmit}> Run </Button>}               
                    {isPending &&  <LoadingButton variant = "contained" color = "secondary" fullWidth loading > Submit </LoadingButton>}               
                </div>
                {memory && time && (<><span style={{marginLeft:'2em', marginTop:'1em'}}>Execution time: {time} s</span><br />
                    <span style={{marginLeft:'2em'}}>Memory Usage: {memory} KB</span><br /></>)}
            </div>

        </>} </div>
    );
}

export default Submit;
/*                <div>
                    <select value={languageName} onChange={hanldeLanguageChange} >
                        <option value="cpp"> C++ </option>
                        <option value="java"> Java </option>
                        <option value="python"> Python </option>
                    </select>
                </div> */