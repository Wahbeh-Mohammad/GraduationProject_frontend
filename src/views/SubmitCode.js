import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { prepareCode } from "../utils/encodingUtils";
import Editor from "@monaco-editor/react"
import { useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

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
const SubmitCode = () => {
    const cookie = new Cookies();
    const [code, setCode] = useState(SAMPLE_CPP);
    const [languageID, setLanguageID] = useState(53);
    const [languageName, setLanguageName] = useState("cpp");
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { problemId } = useParams();

    const hanldeLanguageChange = (e) => {
        const name = e.target.value;
        const id = languages[name];
        console.log(name, id)
        setLanguageName(name);
        setLanguageID(id);
    }

    const handleSubmit = async () => {
        setSubmitted(true)
        const body = { source_code: prepareCode(code), language_id: languageID, problemId };
        try {
            console.log(body);
            const response = await fetch("http://localhost:3000/api/v1/submission/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `bearer ${cookie.get("jwt")}`
                },
                body: JSON.stringify(body)
            });
            const parsedResponse = await response.json();
            window.location.assign(`/recent/${user.id}`)
            console.log(parsedResponse);
        } catch (err) {
            console.log(err);
            setSubmitted(false)

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
            }).then(async (response) => {
                const parsedResponse = await response.json();
                console.log(parsedResponse);
                if (response.status === 200) {
                    setLoggedIn(true);
                    setUser(parsedResponse.data)
                    console.log(parsedResponse.data)
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
        <> {loggedIn === true && <div>
            <div>
                <select value={languageName} onChange={hanldeLanguageChange} >
                    <option value="cpp"> C++ </option>
                    <option value="java"> Java </option>
                    <option value="python"> Python </option>
                </select>
            </div>
            <Editor
                    height="50vh"
                    width="50vw"
                    language={languageName}
                    onChange={(e) => setCode(e)}
                    className="editor"
                />
            <div>
                <button onClick={handleSubmit}> Submit </button>
            </div>
            {submitted &&
                <div style={{ "display": "flex", "position": "fixed", "bottom": "30px", "left": "245px" }}>
                    <Snackbar
                        style={{ "zIndex": "-1" }}
                        open={submitted}
                        autoHideDuration={6000000}
                        message="Code Submitted Succesfully"
                    />
                    <CircularProgress style={{ "zIndex": "1" }}
                    />
                </div>
            }
        </div>} </>
    );
}

export default SubmitCode;