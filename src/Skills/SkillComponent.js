import React from 'react';

export const SkillComponent = ({skill}) => {
    return(
        <div>
            <div className="skill-title">
                {skill.title}
            </div>

            <div className="icon-section">
                <span>Edit </span>
                <span>Delete</span>
            </div>
        </div>
    )
} 