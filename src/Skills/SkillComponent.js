import React, {Component} from 'react';
import {ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils';
import {EditSkillComponent} from '../Common';


export class SkillComponent extends Component{
    constructor(){
        super()
        this.state = {
            editSkill: false, 
            deleteSkill: false,            
        }
    }

    editSkill = () => {
        this.setState({
            editSkill: true
        })
    }

    deletingSkill = () => {
        this.setState({
            deleteSkill: true
        })
    }

    handleEdittingSkill = () =>{
        this.setState({
            editSkill: true
        })
    }
    _handleEditSkill = (event, skillId) => {
        event.preventDefault();
        let edittedTitle = event.target['edit-title'].value;
        fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + this.props.developerId + '/skill/' + skillId, {
            method: 'PUT',
            body: JSON.stringify({
                title: edittedTitle
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=>{
            if(response.ok) return response.json();
            throw new Error('Error Editting Skill');
        }).then(skill =>{
            this.setState({
                editSkill: false
            })
        }).catch(e=>{
            console.log(e);
        })
    }

    render(){
    return(
        <div>
            <div className="skill-title">
                {this.props.skill.title}
            </div>

            <div className="icon-section">
                <span onClick={this.handleEdittingSkill}>Edit </span>
                <span>Delete</span>
            </div>
            {
                this.state.editSkill &&
                <EditSkillComponent
                skill={this.props.skill} 
                handleEditData={(e)=> this._handleEditSkill(e, this.props.skill._id)}
                />
            }
        </div>
    )
} 
}
