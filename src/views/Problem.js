import { Button, TableCell, TableContainer, TableHead, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from "../components/Markdown";
import '../styles/problem.css'
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
                    <div className='problem-wrapper'>
                        <div className='problem-header'>
                            <div className='constraints'>
                                <Typography color='secondary' style={{ fontSize: '.82rem' }}>Time Limit: {problem.timeLimit} seconds</Typography>
                                <Typography color='secondary' style={{ fontSize: '.82rem' }}>Memory Limit: {problem.memoryLimit} MB</Typography>
                            </div>
                            <div className='proble-name'>
                                <Typography color='white' style={{ fontSize: '1.75rem' }}>{problem.name} </Typography>

                            </div>
                            <div className='options'>
                                <Button variant="outlined" color='secondary' style={{ marginRight: '1em' }} href="/submit">Custom Run</Button>
                                <Button variant="contained" color='secondary' href={"/submit/" + problemId}>Submit</Button>
                            </div>
                        </div>
                        <div className='statment'>
                            <Markdown statement={problem.statement} />
                            <Typography color='black' style={{ fontSize: '1.8rem' }}>Samples</Typography>
                            <div >
                                <table style={{ width: "100%" }}>
                                    <tr style={{ padding: '2em', backgroundColor: '#dee2e6', border: '1px solid #ddd' }}>
                                        <th style={{ padding: '1.6em', fontSize: '20px' }}>Input</th>
                                        <th style={{ padding: '1.6em', fontSize: '20px' }}>Output</th>
                                    </tr>
                                    {samples && samples.map((sample, index) => {
                                        return (
                                            <>
                                                <tr key={index} style={{ padding: '2em', borderBottom: '1px solid black' }}>
                                                    <td style={{ padding: '1.3em', fontSize: '18px' }}>
                                                        <TextField value={sample.input} disabled={true} multiline />
                                                    </td>
                                                    <td style={{ padding: '1.3em', fontSize: '18px' }}>
                                                        <TextField value={sample.output} disabled={true} multiline />

                                                    </td>
                                                </tr>
                                                <tr key={index} >
                                                    <td ><hr /></td>
                                                    <td ><hr /></td>
                                                </tr>
                                            </>
                                        )
                                    })}
                                </table>
                            </div>
                        </div>

                    </div>
                </>

            }
        </>
    );
}

export default Problem;