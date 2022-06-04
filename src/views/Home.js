import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Typography } from "@mui/material";
import { MdEmojiEvents } from 'react-icons/md';
import { HiPuzzle } from 'react-icons/hi';
import { RiArticleLine } from 'react-icons/ri';
import ContestsTable from '../components/ContestsTable';
import '../styles/Home.css'
const Home = (props) => {
    const cookie = new Cookies();

    const [loggedIn, setLoggedIn] = useState(false);
    const [problems, setProblems] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const token = cookie.get("jwt");
        try {
            fetch("http://localhost:3000/api/v1/user/jwt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            }).then(async (response) => {
                const parsedResponse = await response.json();
                console.log(parsedResponse);
                if (response.status === 200) {
                    setLoggedIn(true);
                }
            })
            fetch(`http://localhost:3000/api/v1/problem/all?page=1`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then(({ message, data }) => { setProblems(data); });
            fetch('http://localhost:3000/api/v1/blog')
                .then((response) => response.json())
                .then(({ message, data }) => { setBlogs(data); });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const rowColor = (i) => {
        return i % 2 != 1 ? '#f2f2f2' : '#fafafa'
    }
    return (
        <div className='home-wrapper'>
            <div className='column-one'>
                <div align='left' style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid', width: 'fit-content' }}>
                    <Typography align='left' style={{ fontSize: "2em", marginRight: '.3em' }}>Recent Contests</Typography>
                    <MdEmojiEvents color='#f6a600' size='2em' />
                </div>
                <ContestsTable contestsNumber={5} />
                <div align='left' style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid', width: 'fit-content' }}>
                    <Typography align='left' style={{ fontSize: "2em", marginRight: '.3em' }}>Recent Problems</Typography>
                    <HiPuzzle color='#f6a600' size='2em' />
                </div>
                <div className='problemset-wrapper'>
                    <table className='table' style={{ width: "70%", boxShadow: "0px 1px 12px #888888", backgroundColor: '' }}>
                        <tr className='header' style={{ backgroundColor: '#343a40' }}>
                            <th style={{ textAlign: 'center', fontSize: "15px", color: '#fafafa' }}>Problem</th>
                            <th style={{ textAlign: 'center', fontSize: "15px", color: '#fafafa' }}>Tags</th>
                            <th style={{ textAlign: 'center', padding: '1em', fontSize: "15px", color: '#fafafa' }}># Of Solvers</th>
                        </tr>

                        {problems &&
                            problems.slice(0, 7).map((problem, index) => {
                                return (
                                    <tr style={{ marginInline: '1em', backgroundColor: rowColor(index) }}>
                                        <td style={{ textAlign: 'center' }} >
                                            <a className='links-home' href={"problem/" + problem._id}  target='_blank'>{problem.name}</a>
                                        </td>
                                        <td style={{ textAlign: 'center', padding: '1em', gap: "12px" }}>
                                            <div>{problem.tags}</div>
                                        </td>
                                        <td style={{ textAlign: 'center', gap: "12px" }}>
                                            <div>50</div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>
            </div>
            <div className='column-two'>
                <div>
                    <div align='center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding:'1em',backgroundColor: '#343a40', borderRadius: '8px 8px 0 0 ' }}>
                        <Typography align='center' style={{ fontSize: "1.3em", marginRight: '.3em', color: '#fafafa' }}>Recent Blogs</Typography>
                        <RiArticleLine color='#f6a600' size='2em' />
                    </div>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        {blogs && blogs.map((blog, index) => {
                            return (
                                <a className='links-home' href={"blog/" + blog._id} style={{  padding:'1em', fontSize:'larger' }} target='_blank'>
                                    {blog.blogTitle}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
