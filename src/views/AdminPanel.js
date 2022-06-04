import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const AdminPanel = (props) => {
    return (
        <Box className="flex-col-gap" sx={{padding:5}}>
            <Link to="/admin/problem/create"> Create a new Problem </Link>
            <Link to="/admin/contest/create"> Create a new Contest </Link>
            <Link to="/admin/blog/create"> Create a new Blog </Link>
        </Box>
    );
}
 
export default AdminPanel;