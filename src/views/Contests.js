import React, { useEffect, useState } from "react";
import Problem from "./Problem";
import { useParams } from 'react-router-dom';

const Contests = () => {
    const [contest, setContest] = useState(null);

    const [message, setMessage] = useState("");
    const { contestId } = useParams();
    const [problems, setProblem] = useState(null);
    const [number, setNumber] = useState(1);


    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/v1/contest/${contestId}`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((response => response.json()))
                .then((responseJson) => {
                    console.log(responseJson)
                    setContest(responseJson.data);


                })
            fetch(`http://localhost:3000/api/v1/problem/contest/${contestId}`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((response => response.json()))
                .then((responseJson) => {
                    console.log(responseJson)
                    setProblem(responseJson.data);
                    setNumber( number+1 );


                })


        }
        catch (err) {
            console.log(err);
        }
    }, []);







    return (
        <>
            <h2> problems</h2>

            {problems && contest &&
                <>
                    <h3> {contest.contestName} </h3>

                    <table style={{ "border": "5px solid black", textAlign: "left" }}>
                        <tr style={{ "border": "5px solid black", textAlign: "left" }} >
                            <th> # </th>
                            <th> Name </th>
                        </tr>
                        {problems.map((problem, idx ) => {
                            return (
                                

                                <tr key={idx}>
                                    <td>{idx+1 }</td>
                                    <td><a href={"/problem/"+problem._id}>{problem.name}</a></td>
                                </tr>
                            )
                        })}
                    </table> </>}
        </>);






}

export default Contests;