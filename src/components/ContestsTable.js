import React, { useState, useEffect } from 'react';
import '../styles/users.css'

const ContestsTable = ({ contestsNumber }) => {
    const [contests, setContests] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/contest?limit=${contestsNumber}`)
            .then(async (response) => {
                const parsedResponse = await response.json();
                if (response.status === 200) {
                    setContests(parsedResponse.data);
                }
            })
    }, []);
    const rowColor = (i) => {
        return i % 2 != 1 ? '#f2f2f2' : '#fafafa'
    }
    const fontColor = (i) => {
        return i % 2 != 1 ? 'black' : 'black'
    }
    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset - 3);

        return newDate;
    }

    return (
        <table className='table' style={{ width: "70%", boxShadow: "0px 1px 12px #888888" }}>
            <tr className='header' style ={{backgroundColor:'#343a40'}}>
                <th style={{ textAlign: 'center', fontSize: "15px",color:'#fafafa' }}>Contest Name</th>
                <th style={{ textAlign: 'center', padding: '1em', fontSize: "15px",color:'#fafafa' }}>Duration</th>
                <th style={{ textAlign: 'center', fontSize: "15px",color:'#fafafa' }}>Starting Time</th>
            </tr>

            {contests &&
                contests.map((contest, index) => {
                    return (
                        <tr style={{ marginInline: '1em', backgroundColor: rowColor(index) }}>
                            <td style={{ textAlign: 'center', color: fontColor(index) }} >
                                <a href={"contests/" + contest._id} style={{color:'#007bff'}}>{contest.contestName}</a>
                            </td>
                            <td style={{ textAlign: 'center', padding: '1em', gap: "12px", color: fontColor(index) }}>
                                <div>{contest.duration} Minutes</div>
                            </td>
                            <td style={{ textAlign: 'center', color: fontColor(index) }}>
                                {convertUTCDateToLocalDate(new Date(contest.startTime)).toLocaleString()}
                            </td>
                        </tr>
                    )
                })
            }

        </table>
    );
}

export default ContestsTable;