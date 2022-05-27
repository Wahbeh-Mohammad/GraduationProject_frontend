import { max } from 'lodash';
import React, { useState, useEffect } from 'react';
import "../styles/CreateContest.css";
import Button from '@mui/material/Button';
import { useForkRef } from '@mui/material';

const ContestBox = () => {
    const [numOfProblems, setNumOfProblems] = useState(1);
    const [inputs, setInputs] = useState([]);
    const [problems, setproblems] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState({})
    const [contestData, setContestData] = useState({})
    const [error, setError] = useState("")
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/problem")
            .then(async (response) => {
                const parsedResponse = await response.json();
                if (response.status === 200) {
                    setproblems(parsedResponse.data);
                }
            })
    }, []);

    const handleChange = (e, field) => {
        const value = e.target.value
        setSelectedProblems((selectedProblems) => {
            selectedProblems[field] = value;
            return selectedProblems
        })
    }

    const handleContestChange = (e, field) => {
        const value = e.target.value
        setContestData((contestData) => {
            contestData[field] = value;
            return contestData
        })
    }

    const handleCreate = async () =>{
        let problems = []
        let keys = Object.keys(selectedProblems) 
        for(let i = 0 ; i<keys.length ; i++){
            console.log(keys[i])
            if(selectedProblems[keys[i]] === 'None')
                continue;
            if(problems.includes(selectedProblems[keys[i]])){
                setError("Problem is already choosen");
                return ;
            }
            problems.push(selectedProblems[keys[i]]);
        }
        contestData['numberOfProblems'] = problems.length;
        const response = await fetch('http://localhost:3000/api/v1/contest/new', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contestData)
        })

    }

    return (
        <div className='container'>
            {error && <h4 style={{color:'red'}}>{error}</h4>}
            <div style={{ padding: "2em", fontSize: '30px', textAlign: 'center' }}>Create Contest</div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%', marginLeft: '15px' }}>
                    <div style={{ display: 'flex', marginTop: "10px", alignItems: 'center' }}>
                        <div style={{ fontSize: "20px", width: '30%' }}>Contest Name</div>
                        <input type="text" id="fname" name="fname" style={{ width: '45%' }} placeholder="Best contest ever" onChange = {(e) => { handleContestChange(e, "contestName") }}/>
                    </div>
                    <div style={{ display: 'flex', marginTop: "10px", alignItems: 'center' }}>
                        <div style={{ fontSize: "20px", width: '30%' }}>Starting Time</div>
                        <input type="datetime-local" min='1' style={{ width: '30%' }} onChange = {(e) => { handleContestChange(e, "startTime") }}/>
                    </div>
                    <div style={{ display: 'flex', marginTop: "10px", alignItems: 'center' }}>
                        <div style={{ fontSize: "20px", width: '30%' }}>Duration<sub style={{ fontSize: "15px" }}>(in minutes)</sub></div>
                        <input type="number" min='1' style={{ width: '20%' }} onChange = {(e) => { handleContestChange(e, "duration") }}/>
                    </div>
                </div>


                <div className='vertical' />
                <div style={{ display: 'flex', flexDirection: 'column', width: '40%', justifyContent: 'space-around' }}>
                    {problems &&
                        <>
                            <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem1") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem2") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem3") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem4") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem5") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem6") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: "space-evenly" }}>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem7") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <div>Select Problem</div>
                                    <select name="problem" onChange={(e) => { handleChange(e, "problem8") }} >
                                        <option value='none'>None</option>
                                        {problems.map((problem, idx) => {
                                            return (
                                                <option key={idx} value={problem._id}>{problem.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>



                        </>
                    }
                </div>
            </div>
            <div style={{paddingBlock:'2em'}}>
            <Button variant="contained" style={{width:'70%'}} onClick = {handleCreate}>Create</Button>

            </div>
        </div>
    );
}

export default ContestBox;