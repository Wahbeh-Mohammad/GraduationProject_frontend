import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from "@mui/material";

const AllSubmision = () => {
    const [submisions, setSubmisions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [message, setMessage] = useState("");



    useEffect(() => {
        try {
            fetch("http://localhost:3000/api/v1/submission?page=" + pageNumber, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then((response => response.json()))
                .then((responseJson) => {
                    console.log(responseJson)
                    setSubmisions(responseJson.data);
                    setMessage(responseJson.message);

                })
        }
        catch (err) {
            console.log(err);
        }
    }, [pageNumber]);
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleNextPage = () => {
        if (message === "true")
            setPageNumber(pageNumber + 1)


    };
    const handleBackPage = () => {
        if (pageNumber > 1)
            setPageNumber(pageNumber - 1)
    };
    const colorVerdict = (verdict) => {
        switch (verdict) {
            case "Accepted":
                return "#0a0"
            default:
                return "#ff0000"
        }
    }
    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset - 3);

        return newDate;
    }


    const rowColor = (i) => {
        return i % 2 != 1 ? '#343a40' : '#fafafa'
    }
    const fontColor = (i) => {
        return i % 2 != 1 ? '#fff' : 'black'
    }

    return (
        <center style={{ padding: '2em' }}>
            {submisions && <table className='table' style={{ width: "90%", boxShadow: "0px 1px 12px #888888" }}>
                <tr className='header' style={{ margin: '1em' }}>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>Code</th>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>Problem</th>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>User</th>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>Language</th>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>Verdict</th>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>Time</th>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>Memory</th>
                    <th style={{ fontWeight: "bolder", fontSize: '1.2rem' }}>Issued at</th>
                </tr>
                <Dialog
                    open={isOpen}
                    onClose={handleClose}
                    BackdropProps={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        overflow: "hidden",
                        opacity: "50%    "
                    }
                    }
                >

                    <DialogContent style={{ width: "300px", height: "300px" }}>
                        <SyntaxHighlighter language="cpp" style={atomOneLight}>
                            {code}
                        </SyntaxHighlighter>
                    </DialogContent>

                </Dialog>
                {submisions.map((item, index) => {
                    var time = convertUTCDateToLocalDate(new Date(item.createdAt)).toLocaleString();
                    return (
                        <tr style={{ marginInline: '1em', backgroundColor: rowColor(index) }}>
                            <td style={{ fontWeight: "700", textAlign: 'center', cursor: 'pointer', color: fontColor(index) }} onClick={() => { setIsOpen(true); setCode(item.code) }}>
                                {item._id}
                            </td>
                            <td style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', padding: '1em', gap: "12px", color: fontColor(index) }}>
                                <a href={`/problem/${item.problemId._id}`}>
                                    {item.problemId.name}
                                </a>
                            </td>
                            <td style={{ textAlign: 'center', justifyContent: 'center', padding: '1em', gap: "12px", color: fontColor(index) }}>
                                <a href={`/user/${item.userId._id}`}>
                                    {item.userId.username}
                                </a>
                            </td>
                            <td style={{ textAlign: 'center', padding: '1em', gap: "12px", color: fontColor(index) }}>
                                {item.language}
                            </td>
                            <td style={{ fontWeight: "700", color: colorVerdict(item.verdict), textAlign: 'center', color: fontColor(index) }}>
                                {item.verdict}
                            </td>
                            <td style={{ textAlign: 'center', padding: '1em', gap: "12px", color: fontColor(index) }}>
                                {item.executionTime}
                            </td>
                            <td style={{ textAlign: 'center', padding: '1em', gap: "12px", color: fontColor(index) }}>
                                {item.memoryUsage}
                            </td>
                            <td style={{ textAlign: 'center', padding: '1em', gap: "12px", color: fontColor(index) }}>
                                {time}
                            </td>

                        </tr>

                    )
                })}
            </table>}
            <div style={{display:'flex', justifyContent:'flex-end', gap:'20px',  width:'90%'}}>
                <Button color="secondary" onClick={handleBackPage} variant="contained" disabled={pageNumber === 1}> Previous </Button>
                <Button color="secondary" onClick={handleNextPage} variant="contained" disabled={message === "false"}> Next </Button>
            </div>
        </center>

    );

}
export default AllSubmision;