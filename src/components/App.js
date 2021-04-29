import React, { useState, useEffect } from 'react';
import './App.css';
import { CardList } from './cardList/cardList';


function App(props) {


 const [ jobs, setJobs ] = useState([]);
 const [ skills, setSkills ] = useState([]);

 
//Load the jobs data with the fetch below
 useEffect(() =>   {
  fetchJobs();  
 },[]);

 //This is the promise and fetch that loads the data
 const fetchJobs = async () => {

  await fetch (' http://localhost:3000/jobs')
     .then((data) => data.json())
     .then((data) => {
       setJobs(data)
     })
 }


// This is the event handler it checks the skills array to ensure its not already in there.
 const handleSkillSelect = (event) =>  {
   const selected = event.target.value;
   console.log(`selected value is ${selected}`)
   let newSkillArr = [...skills];
   let selectedInSkills = newSkillArr.find(element => element === selected)
   console.log(`This will be undefined if selected is not in the skills array: ${selectedInSkills }`)
  if(selectedInSkills !== selected){newSkillArr.push(selected)}
    addSkill(newSkillArr);
 }

 //This is a setter for the skills array
 const addSkill = (newSkillArr)  =>  {
  setSkills(newSkillArr);
}

//This clears the skill array altogether
 const handleClear = (event)  =>  {
   console.log('Next command clears the skills array')
  setSkills([]);
  console.log('cleared')
}
 
 //This function removes the skill when it is x'd in the filter panel
 const handleRemSkill = (event) => {
  let currentSkills = [...skills];
  let toRemove = currentSkills.indexOf(event.target.value);
  currentSkills.splice(toRemove, 1);
  addSkill(currentSkills);
 }

 //This is a long and ungly filter function that works but not in the code flow
 const filterJobs = (jobs) => {
   let viewJobs = [];
   let finalView = [];
   let uniqueChars = [];
   jobs.forEach(job => {
     //Spread the properties that need to be in the skills section into one array
    let combinedSkills = [...job.languages, ...job.tools, job.role, job.level]
     combinedSkills.forEach(comb =>  {
       let view = skills.find(skill => skill === comb)
       //console.log(view)
       if(view !== undefined){viewJobs.push(job.id)}
       view = null;
       
       viewJobs.forEach((c) => {
           if (!uniqueChars.includes(c)) {
               uniqueChars.push(c);
           }
           
       });
     })
    });
    uniqueChars.forEach(char =>  {
      jobs.forEach(job =>  {
        if(job.id === char)  {
         finalView.push(job)
        }
      })
    })
    //console.log(`this marks the end of the filter function ${finalView}`)
    return finalView
   };
 
   
   const filter = skills.length === 0 ? jobs : filterJobs(jobs)

  return (
    
        <div className="body">
          <div className="head">
            {/*Header Image here*/}
          </div>

          <div className="container between filter border">
            <ul className="container filters wrap">
            {skills.map(skill =>  {
                return <li>{skill} <button className="delete" value={skill} onClick={handleRemSkill} key={skill} >&#10008;</button></li>
            })} 
            </ul>
            <button className="clear" onClick={handleClear}>Clear</button>
          </div>
            
          <CardList  
            jobs={filter} 
            handleSkillSelect={handleSkillSelect} 
            />
        </div>
  );
 
}

export default App;
