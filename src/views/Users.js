import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/InputLabel';


import '../styles/users.css'
const Users = () => {
    const [page, setPage] = useState(1);
    const [username, setUsername] = useState("");
    const [country, setCountry] = useState("");
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        console.log(country)
        fetch(`http://localhost:3000/api/v1/user?page=${page}&name=${username}&country=${country}`)
            .then(async (response) => {
                const parsedResponse = await response.json();
                if (response.status === 200) {
                    setUsers(parsedResponse.data);
                    setMessage(parsedResponse.message)
                }
            })
    }, [page, username, country]);

    const rowColor = (i) => {
        return i % 2 == 1 ? '#343a40' : '#fafafa'
    }
    const fontColor = (i) => {
        return i % 2 == 1 ? '#fff' : 'black'
    }

    const resetInputs = () => {
        setUsername("");
        setCountry("");
    }

    const handleNext = () => {
        if (message === 'more')
            setPage(page + 1);
    }

    const handlePrevious = () => {
        if (page > 1)
            setPage(page - 1);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBlock: '100px' }}>
            <div style={{ width: '60%', backgroundColor: "rgb(250, 250, 250)", height: 'auto', boxShadow: "0px 1px 8px #888888", borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                <table className='table'>
                    <tr className='header' >
                        <th style={{ textAlign: 'center', fontSize: "23px" }}>Username</th>
                        <th style={{ textAlign: 'center', padding: '1em', fontSize: "23px" }}>Country</th>
                        <th style={{ textAlign: 'center', fontSize: "23px" }}>Rating</th>
                    </tr>

                    {users &&
                        users.map((user, index) => {
                            return (
                                user.username && <tr style={{ marginInline: '1em', backgroundColor: rowColor(index) }}>
                                    <td style={{ fontWeight: "700", textAlign: 'center', color: fontColor(index) }} >
                                        <a href={"user/" + user._id}>{user.username}</a>
                                    </td>
                                    <td style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', padding: '1em', gap: "12px" }}>
                                        <img src={"https://countryflagsapi.com/svg/" + user.country} alt="Egypt flag" style={{ width: '35px', height: '22px' }} title={user.country} />
                                    </td>
                                    <td style={{ fontWeight: "700", textAlign: 'center', color: fontColor(index) }}>1243</td>
                                </tr>
                            )
                        })
                    }

                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
                    <Button color='secondary' variant='contained' style={{ marginRight: '2em', width: '130px' }} onClick={handlePrevious} disabled ={page === 1}>Previous</Button>
                    <Button color='secondary' variant='contained' style={{ width: '130px' }} onClick={handleNext} disabled = {message === 'nomore'}>Next</Button>
                </div>
            </div>
            <div className='filter'>
                <div style={{ textAlign: 'center', padding: '.5em', fontSize: '2rem' }}>Filter</div>
                <hr />
                <InputLabel id="demo-simple-select-label" style={{ marginLeft: '1em' }}>Username</InputLabel>
                <TextField Label="Username" color="secondary" value={username} type="text" id="fname" name="fname" style={{ marginBottom:'1em',marginLeft: '1em', width: '75%' }} onChange={(e) => setUsername(e.target.value)} />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{ marginLeft: '1em' }}>Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={country}
                        style={{ width: '75%', marginLeft: '1em' }}
                        color='secondary'
                        onChange={(e) => { setPage(1); setCountry(e.target.value) }}
                    >
                        <MenuItem value=''>Any</MenuItem>
                        <MenuItem value='JO'>Jordan</MenuItem>
                        <MenuItem value='EG'>Egypt</MenuItem>
                        <MenuItem value='SY'>Syria</MenuItem>
                        <MenuItem value='PS'>Palestine</MenuItem>
                        <MenuItem value='US'>United States</MenuItem>
                        <MenuItem value='ENGLAND'>England</MenuItem>
                        <MenuItem value='RU'>Russia</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1em', width: "100%" }}><Button onClick={resetInputs} variant='contained' color='secondary' style={{ width: '75%' }}>Reset</Button></div>
            </div>
        </div>
    );
}

export default Users;