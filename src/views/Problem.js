import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Problem = () => {
    const [problem, setProblem] = useState(null);
    const [samples, setSamples] = useState([]);
    const { problemId } = useParams();


    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/v1/problem/${problemId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((response => response.json()))
                .then((responseJson) => {
                    setProblem(responseJson.data);
                })
            fetch(`http://localhost:3000/api/v1/sample/${problemId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((response => response.json()))
                .then((responseJson) => {
                    setSamples(responseJson.data);
                })
        }
        catch (err) {
            console.log(err);
        }
    }, []);


    return (
        <>
            {problem &&
                <>
                    <center>
                    <h3>{problem.name}</h3>
                    <h5>Time Limit: {problem.timeLimit} seconds</h5>
                    <h5>Memory Limit: {problem.memoryLimit} MB</h5>
                    <a href={`/submit/${problemId}`}>Submit</a>
                    <br></br>
                    <br></br>
                    <br></br>
                    </center>
                    <h2>{problem.statement}</h2>
                    <hr></hr>
                    <div style={{display: "flex",flexDirection:'column', flexWrap:"wrap",justifyContent:"space-between"}}>
                    {samples.map((sample, idx) => {
                        return (
                            <div key={idx} style={{border: "1px solid black", marginBottom:'1em', textAlign:'center'}}>
                                <h4 >
                                    Sample #{idx}
                                </h4>
                                <h4 >
                                    input: {sample.input}
                                </h4>
                                <h4 >
                                    Output: {sample.output}
                                </h4>
                            </div>
                        )
                    })}
                    </div>
                </>

            }
        </>
    );
}

export default Problem;