import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Avatar from '@mui/material/Avatar';

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const { userId } = useParams();
    const [userSubmissions, setUserSubmissions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState('');



    useEffect(() => {
        try {
            fetch(`http://localhost:3000/api/v1/user/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((response => response.json()))
                .then((responseJson) => {
                    setProfile(responseJson.data);
                })
            fetch(`http://localhost:3000/api/v1/submission/user/${userId}?limit=10`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((response => response.json()))
                .then((responseJson) => {
                    setUserSubmissions(responseJson.data);
                    console.log(responseJson.data)
                })

        }
        catch (err) {
            console.log(err);
        }
       

    }, []);
    const handleClose = () => {
        setIsOpen(false);
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


    return (
        
        <>
        <Avatar src="/logo.png" style={{marginRight:"0.7em", width:'42px', height:'42px'}}/>
            {profile && userSubmissions.length &&
                <>

                    <h3>name : {profile.name}</h3>
                    <h3> full name : {profile.username}</h3>
                    <h3> country : {profile.country}</h3>
                    <h3> role : {profile.type}</h3>
                    <table style={{ width: "100%", "border": "5px solid black" }} >


                        <tr style={{ "border": "5px solid black", textAlign: "left" }}>
                            <th> code</th>
                            <th>problem ID</th>
                            <th>language</th>
                            <th>verdict</th>
                            <th>Time</th>
                            <th>memory</th>
                            <th> Time</th>
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


                        {userSubmissions.map((item, index) => {
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
                </>
            }

        </>
    );





}

export default Profile;