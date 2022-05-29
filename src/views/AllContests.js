import React, { useState, useEffect } from 'react';
import ContestsTable from '../components/ContestsTable';
import '../styles/AllContests.css'

const AllContests = () => {
    useEffect(() => {
        
    }, []);
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', paddingBlock: '100px' }}>
            <ContestsTable contestsNumber={10} />
            <div>

            </div>
        </div>
    );
}

export default AllContests;