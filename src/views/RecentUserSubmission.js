import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const RecentUserSubmission = () => {
    const { userId } = useParams();
    const [userSubmission, setUserSubmission] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState('');
    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/v1/submission/user/${userId}?limit=10`)
                .then(async (response) => {
                    const parsedResponse = await response.json();
                    console.log(parsedResponse);
                    if (response.status === 200) {
                        setUserSubmission(parsedResponse.data);
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }, [])
    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset - 3);

        return newDate;
    }
    const handleClose = () => {
        setIsOpen(false);
    };
   
    const colorVerdict = (verdict) =>{
        switch(verdict){
            case "Accepted":
                return "#0a0"
            default:
                return "#ff0000"
        }
    }
    return (
        <>
            {userSubmission &&
                <table style={{ width: "100%", height: "100%", "border": "1px solid black", "padding": "1em" }} >
                    <tr style={{ textAlign: "left", "border": "1px solid black", padding: '2em' }}>
                        <th >Code</th>
                        <th >ProblemId</th>
                        <th >Language</th>
                        <th >Verdict</th>
                        <th >Time</th>
                        <th >Memory</th>
                        <th >Time</th>
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

                        <DialogContent style={{width:"300px",height:"300px"}}>
                            <SyntaxHighlighter language="cpp" style={atomOneLight}>
                                {code}
                            </SyntaxHighlighter>
                        </DialogContent>

                    </Dialog>
                    {userSubmission.map((item, index) => {
                        var time = convertUTCDateToLocalDate(new Date(item.createdAt)).toLocaleString();
                        return (
                            <tr key={index}>
                                <td style={{ paddingBlock: "1em", cursor: 'pointer',color:"#0000ff" }} onClick={() => { setIsOpen(true); setCode(item.code) }}>
                                    {item._id}
                                </td>
                                <td style={{ paddingBlock: "1em" }}>
                                    <a href = {`/problem/${item.problemId._id}`}>
                                        {item.problemId.name}
                                    </a>
                                </td>
                                <td style={{ paddingBlock: "1em" }}>
                                    {item.language}
                                </td>
                                <td style={{ marginBlock: "1em",color:colorVerdict(item.verdict) }} >
                                    {item.verdict}
                                </td>
                                <td style={{ paddingBlock: "1em" }} >
                                    {item.executionTime}
                                </td>
                                <td style={{ paddingBlock: "1em" }} >
                                    {item.memoryUsage}
                                </td>
                                <td style={{ paddingBlock: "1em" }}>
                                    {time}
                                </td>

                            </tr>

                        )
                    })}
                </table>
            }
        </>
    );
}

export default RecentUserSubmission;