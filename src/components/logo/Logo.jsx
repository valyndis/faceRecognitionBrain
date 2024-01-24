import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt' tiltMaxAngleX={20} tiltMaxAngleY={20}>
                <div>
                    <img src={brain} alt='logo' />
                </div>
            </Tilt>
        </div>
        
    )
}

export default Logo