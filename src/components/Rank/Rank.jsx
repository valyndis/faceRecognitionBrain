import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div className='center' style={{flexDirection: 'column'}}>
            <p className='f3 center ma1'>{`${name}, your current entry count is...`}</p>
            <p className='f1 center ma1'>{entries}</p>
        </div>
    );
}

export default Rank