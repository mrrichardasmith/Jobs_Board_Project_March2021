import React, { useState } from 'react';


export function FormPets(props) {
    const [pet, setPet] = useState('');
    const [slider, setSlider] = useState(5)

    const handleTextChange = (e) => {
        setPet(e.target.value);
    }

    const handleSliderChange = (e) =>   {
        setSlider(e.target.value);
    }

    return(

        <div>
            <div>what type of pet do you have</div>
            <input type="text" value={pet} onChange={handleTextChange} />
            <p>What you type here above will appear below</p>
            <p>Pet Type: {pet}</p>
            <p>How many of that type of pet do you have?</p>
            <input type="range" min="0" max="10" value={slider} onChange={handleSliderChange}></input>
            <p>The Slider value is: {slider}</p>
        </div>
    );
}
