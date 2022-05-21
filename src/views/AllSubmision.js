import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const AllSubmision = () => {
    const [submisions, setSubmisions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState('');
    const [pageNumber , setPageNumber ]=useState(1);
    const [ message , setMessage ] = useState("");



    useEffect(() =>  {
        try {
            fetch("http://localhost:3000/api/v1/submission?page=" +pageNumber, {

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
    }, [pageNumber ]);
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleNextPage =()=> {
        if (message ==="true")
            setPageNumber (pageNumber+1)


    };
    const handleBackPage =()=> {
        if (pageNumber >1 )
            setPageNumber (pageNumber-1)
    };




    return (
        <>
        {submisions && <table style={{width:"100%" , "border": "5px solid black"}} >
            <button onClick={handleNextPage}> Next</button>
            <button onClick ={handleBackPage}> Back </button>

            <tr style={{"border": "5px solid black" , textAlign : "left"}}>
                <th> code</th>
                <th>user ID</th>
                <th>problem ID</th>
                <th>language</th>
                <th>verdict</th>
                <th>Time</th>
                <th>memory</th>
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
            

            {submisions.map((submision, idx) => {
                return (
                    
                    <tr key={idx}>
                        <td onClick={() => { setIsOpen(true); setCode(submision.code) }} style={{cursor : "pointer"}}>{submision._id }</td>
                        
                        <td>{submision.userId}</td>
                        <td>{submision.problemId}</td>
                        <td>{submision.language}</td>
                        <td>{submision.verdict}</td>
                        <td>{submision.executionTime}</td>
                        <td>{submision.memoryUsage}</td>
                        

                    </tr>
                )
            })}

        </table>}</>

    );

}
export default AllSubmision;