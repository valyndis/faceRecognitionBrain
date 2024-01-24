import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='pa4 br3 shadow-5 form center' style={{display: 'flex', width:'50%', flexDirection: 'column'}}>
            <p className='f3 tc'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
                <input className='f4 pa2 w-70 center' type='text' onChange = {onInputChange}/>
                <button className='w4 grow f4 link ph3 pv2 dib white mt3 bg-blue center' onClick = {onButtonSubmit}>Detect</button>
        </div>
    );
}

export default ImageLinkForm