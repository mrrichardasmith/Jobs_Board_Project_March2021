import React from 'react';
import './card.css';

export function Card(props) {
    const { company, position, postedAt, contract, featured, location, logo, role, level } = props.job;
    const languages = props.job.languages;
    const tools = props.job.tools;
    const combined = [...tools, ...languages, role, level]
    const newListing = props.job.new;
    const imageLogo = `${logo}`
    console.log(imageLogo);
   
    return(
        <div className="container card small">

     <div className="imgContainer">
        {/*<--Company logo image here -->*/}
        <img src={imageLogo} alt="logo" />
    </div>
    <div className="container small">
            {/*<--Item Start -->*/}
    <div className="container between mob">
      <div className="col">
          <ul className="container slimLines">
              <li className="title company"><strong>{company}</strong></li>
              <div className="container status">
                {newListing ? <li className="new">New</li> : null}
                {featured ? <li className="featured">Featured</li> : null}
              </div>
          </ul>
      
      <p className="jobTitle slimLines"><strong>{position}</strong></p>
      <ul className="container details slimLines ">
          <li>{postedAt}</li>
          <li>{contract}</li>
          <li>{location}</li>
      </ul>
  </div>
  {/*<!-- Role -->*/}
    <div className="basis">
      <ul className="container skills wrap">
          {combined.map(skill =>    {
              return <li><button
                            onClick={props.handleSkillSelect} 
                            value={skill} 
                            id={skill}
                            key={props.job.id}
                            >
                            {skill}
                        </button>
                    </li>
          })}
      </ul>
     </div>
    </div>

     </div>
  </div>

    )
}