import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Box,Link, Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from "@mui/material";

import "../styles/AllProblems.css";

const AllProblems = (props) => {

    const [allProblems, setAllProblems] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);


    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/v1/problem/all?page=${page}`, {
                method:"GET"
            })
            .then((response) => response.json())
            .then(({ message, data }) => { setMore(message); setAllProblems(data); });
        } catch (err) {
            console.log(err);
        }
    }, [page]);

    return (
        <Box className="all-problems-wrapper">
            <Box className="all-problems">
                <Box component={Paper} className="flex-row-gap pagination-controls">
                    <Button variant="contained" onClick={ ()=>{setPage(page-1);} }> Previous </Button>
                    <Button variant="contained" onClick={ ()=>{setPage(page+1);} }> Next </Button>
                </Box>
                <TableContainer component={Paper}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                Problem Name
                            </TableCell>
                            <TableCell align="center">
                                Contest ID
                            </TableCell>
                            <TableCell align="center">
                                Memory Limit
                            </TableCell>
                            <TableCell align="center">
                                Time Limit
                            </TableCell>
                            <TableCell align="center">
                                Tags
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { allProblems && allProblems.map((problem) => {
                                return (
                                    <TableRow>
                                        <TableCell align="center">
                                            <Link color="primary" target="_blank" href={`/problem/${problem._id}`}> { problem.name } </Link>    
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link color="primary" target="_blank" href={`/contest/${problem.contestId}`}> { problem.contestId } </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            { problem.memoryLimit }
                                        </TableCell>
                                        <TableCell align="center">
                                            { problem.timeLimit }
                                        </TableCell>
                                        <TableCell align="center">
                                            { problem.tags }
                                        </TableCell>
                                    </TableRow>
                                )
                            })  
                        }
                    </TableBody>
                </TableContainer>
            </Box>
        </Box>
    );
}
 
export default AllProblems;