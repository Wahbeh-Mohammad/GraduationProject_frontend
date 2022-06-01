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
    const rowColor = (i) => {
        return i % 2 != 1 ? '#343a40' : '#fafafa'
    }
    const fontColor = (i) => {
        return i % 2 != 1 ? '#fff' : 'black'
    }
    return (
        <Box className="all-problems-wrapper">
            <Box className="all-problems">
                <Box component={Paper} className="flex-row-gap pagination-controls">
                    <Button variant="contained" color="secondary" onClick={ ()=>{setPage(page-1);} }> Previous </Button>
                    <Button variant="contained" color="secondary" onClick={ ()=>{setPage(page+1);} }> Next </Button>
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
                        { allProblems && allProblems.map((problem, index) => {
                                return (
                                    <TableRow style = {{backgroundColor:rowColor(index)}}>
                                        <TableCell align="center">
                                            <Link color="primary" target="_blank" href={`/problem/${problem._id}`} style = {{color:fontColor(index)}}> { problem.name } </Link>    
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link color="primary" target="_blank" href={`/contest/${problem.contestId}`} style = {{color:fontColor(index)}}> { problem.contestId } </Link>
                                        </TableCell>
                                        <TableCell align="center" style = {{color:fontColor(index)}}>
                                            { problem.memoryLimit }
                                        </TableCell>
                                        <TableCell align="center" style = {{color:fontColor(index)}}>
                                            { problem.timeLimit }
                                        </TableCell>
                                        <TableCell align="center" style = {{color:fontColor(index)}}>
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