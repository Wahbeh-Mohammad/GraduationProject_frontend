import React, { useEffect, useState } from "react";
import Markdown from "../components/Markdown";
import Editor from "@monaco-editor/react";
import "../styles/CreateProblem.css";
import 'katex/dist/katex.min.css';
import Cookies from "universal-cookie";

const statementSample = `## Problem Statement
Given numbers $$(A, B, C)$$:

- Calculate $$Z$$ where $$Z = \\frac{A + B + C}{3}$$

## Input

- First line $$A: (1 \\le A \\le 1000)$$
- Second line $$B: (1 \\le B \\le 1000)$$
- Third line $$C: (1 \\le C \\le 1000)$$

## Output

Output the result of the calculation
`

// more information about math markdown
// https://levelup.gitconnected.com/adding-katex-and-markdown-in-react-7b70694004ef
// full cheat sheet https://users.dickinson.edu/~richesod/latex/latexcheatsheet.pdf

const CreateProblem = (props) => {
    const cookie = new Cookies();
    const [name, setName] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [contestId, setContestId] = useState(null);
    const [timeLimit, setTimeLimit] = useState(null);
    const [memoryLimit, setMemoryLimit] = useState(null);
    const [statement, setStatement] = useState(statementSample);
    const [tags, setTags] = useState([]);
    const [info, setInfo] = useState("");

    const handleSubmit = async () => {
        setInfo("");
        if(!name) { setInfo("Invalid Problem Name"); return; }
        if(!contestId) { setInfo("Invalid contest id"); return; }
        if(!timeLimit) { setInfo("Invalid Time Limit"); return; }
        if(!memoryLimit) { setInfo("Invalid Memory Limit"); return; }
        if(!tags) { setInfo("Invalid Problem tags"); return; }

        const body = { name, statement, contestId, timeLimit, memoryLimit, tags: tags.split(" ") };
        
        const response = await fetch("http://localhost:3000/api/v1/problem/new", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization": `bearer ${cookie.get("jwt")}`
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);
    }


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
        <div className="wrap">
            { loggedIn && <>
                <div className="section form">
                    <input className="input" placeholder="problem name" type="text" onChange={e => setName(e.target.value)} />
                    <input className="input" placeholder="contest id" type="text" onChange={e => setContestId(e.target.value)} />
                    <input className="input" placeholder="time limit" type="number" onChange={e => setTimeLimit(e.target.value)} />
                    <input className="input" placeholder="memory limit" type="number" onChange={e => setMemoryLimit(e.target.value)} />
                    <input className="input" placeholder="tags {space separated}" type="text" onChange={e => setTags(e.target.value)} />
                </div>
                <div className="section">
                    <h1> Problem Statement, input and output </h1>
                    <div className="editor-box">
                        <div className="editor-wrapper">
                            <Editor
                                height="50vh"
                                width="50vw"
                                language={"markdown"}
                                value={statement}
                                onChange={(e) => setStatement(e)}
                                className="editor"
                                />
                        </div>
                        <div className="preview-wrapper">
                            <Markdown statement={statement} />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <button onClick={handleSubmit}> Create Problem </button>
                    { info && <h4> { info } </h4>}
                </div>
            </> }
        </div>
    );
}
 
export default CreateProblem;
