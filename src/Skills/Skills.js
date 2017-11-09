import React, {Component} from 'react';
import {ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils';
import {EditSkillComponent} from '../Common';

export class Skills extends Component{
    constructor(){
        super();
        this.state = {
            skills: [],
            error:' ',
            showEditSkillComponent:false,
            skillId: '',
            skill: {}
        }
    }

    componentDidMount(){
        this.getSkills();
    }

    getSkills = () => {
        return fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + "/" +  this.props.developerId + "/skills" , {
            method: 'GET'
        }).then(response=>{
            if(response.ok) return response.json();
            throw new Error('Error fetching the skills')
        }).then(skills=>{
            this.setState({
                skills
            })
        }).catch(e=>{
            this.setState({
                error: e
            })
        })
    }

    handleEditSkill = (event, developerId, skillId) => {
        event.preventDefault();
        let edittedTitle = event.target['edit-title'].value;
        return fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + "/" +  developerId + "/skill/" + skillId , {
            method: 'PUT',
            body: JSON.stringify({
                title: edittedTitle
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=>{
            console.log(response);
            if(response.ok) return response.json();
            throw new Error('Error updating the skills')
        }).then(skill=>{
            console.log(skill)
        }).catch(e=>{
            console.log(e);
        })
    }
    handleDeleteSkill =() => {
        console.log('Delete')
    }

    openEditSkillComponent = (e, skillId) => {
        e.preventDefault();
        console.log('Id here', skillId)
        this.setState({
            showEditSkillComponent: true,
            skillId,
            skill: this.filterThroughSkillsAndGetRightOneForEdit(skillId)
        })


    }

    filterThroughSkillsAndGetRightOneForEdit = (id) =>{
        let skill = this.state.skills.filter(skill=>{
            return skill._id == id
        });
        
        return skill[0];

    }

    render(){
        console.log(this.state.skill)
        return(
            <div>
                <div>
                {
                    this.state.skills.map((skill)=>{
                        return (
                            <div key={skill._id}>
                            
                            {skill.title}

                        
                            <span onClick={(e)=> this.openEditSkillComponent(e, skill._id)}>Edit</span>
                            <span onClick={this.handleDeleteSkill}>Delete</span>
                            </div>
                        )
                    })
                }
                </div>
                {
                    this.state.showEditSkillComponent && 
                        <EditSkillComponent
                            skill={this.state.skill}
                            handleEditData={(e) => this.handleEditSkill(e, this.state.skill.developer,this.state.skill._id)}
                        />
                }
            </div>
            
        )
    }
}