import React, { useState } from "react";
import Cookies from "universal-cookie";
import { prepareCode } from "../utils/encodingUtils";

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

const Submit = (props) => {
    const cookie = new Cookies();
    const [code, setCode] = useState(SAMPLE_CPP);
    const [language, setLanguage] = useState(CPP_ID);

    const handleSubmit = async () => {
        const body = { source_code:prepareCode(code), language_id:language, problemId:"625c649fbfb5168e7f5dd371" }; 
        try {
            console.log(body);
            const response = await fetch("http://localhost:3000/api/v1/submission/new", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    "authorization":`bearer ${cookie.get("jwt")}`
                },
                body: JSON.stringify(body)
            });
            const parsedResponse = await response.json();
            console.log(parsedResponse);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div> 
            { cookie.get('jwt') && <>
                    <div>
                        <select value={language} onChange={setLanguage}>
                            <option value={53}> C++ </option>
                            <option value={62}> Java </option>
                            <option value={71}> Python </option>
                        </select>
                    </div>
                    <div>
                        <textarea rows={50} cols={75} value={code} onChange={(e) => setCode(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={ handleSubmit }> Submit </button>
                    </div>
                </>
            }
            {
                !cookie.get('jwt') && <>
                    you need to login.
                </>
            }
        </div>
    );
}
 
export default Submit;