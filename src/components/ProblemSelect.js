import React, { useState, useEffect } from 'react';

const ProblemSelect = ({ problems,selectedProblems, setSelectedProblems,id }) => {
    const handleChange = (e)=>{
        console.log(e.target.value)
    }

    console.log(id);
    return (
        problems.length !==0 && <div style={{display:'flex', marginBlock:'.5em',marginLeft:'1em'}}>
            <span style={{marginRight:'.5em'}}>Select problem</span>
            <select name="problem" onChange={handleChange}>
                {problems.map((problem, idx) => {
                    return (
                        <option key={idx} value={problem._id}>{problem.name}</option>
                    )
                })}
            </select>
        </div>
    );
}

export default ProblemSelect;
