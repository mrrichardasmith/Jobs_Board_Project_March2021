import React from 'react';
import { Card } from '../card/card';

export function CardList(props) {
    
   
    return  (
            
            props.jobs.map((job, index) => {
                console.log(index)
                return (
                    <div>
                        <Card job={job} 
                                handleSkillSelect={props.handleSkillSelect} 
                                />
                    </div>
                )
            })
        
    )

}