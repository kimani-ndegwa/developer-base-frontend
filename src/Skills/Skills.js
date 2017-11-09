import React, {Component} from 'react';
import {ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils';
import {
    EditSkillComponent,
    ConfirmDelete,
    Loader
} from '../Common';
import './Skills.css';

export class Skills extends Component{
    constructor(){
        super();
        this.state = {
            error:' ',
            skills: [],
            showEditSkillComponent:false,
            showConfirmDelete: false,
            skillId: '',
            skill: {}
        }
    }

    componentDidMount(){
        this.getSkills();
    }

    getSkills = () => {
        return fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + this.props.developerId + '/skills', {
            method : 'GET'
        })
        .then(response=>{
            if(response.ok)return response.json()
            throw new Error('Error occured getting skills')
        }).then(skills=>{
            this.setState({skills});
        }).catch(e=>{
            this.setState({error: e});
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
            this.getSkills();
            this.setState({
                showEditSkillComponent: false
            })
        }).catch(e=>{
            console.log(e);
        })
    }

    handleDeleteSkill = (event, developerId, skillId) => {
        event.preventDefault();
        return fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + "/" +  developerId + "/skill/" + skillId , {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=>{
            console.log(response);
            if(response.ok) return response.json();
            throw new Error('Error updating the skills')
        }).then(skill=>{
            this.getSkills();
            this.setState({
                showConfirmDelete: false
            })
        }).catch(e=>{
            console.log(e);
        })
    }

    openEditSkillComponent = (e, skillId) => {
        e.preventDefault();
        this.setState({
            showEditSkillComponent: true,
            skillId,
            skill: this.filterThroughSkillsAndGetRightOneForEdit(skillId)
        })


    }

    closeEditSection = (event) =>{
        console.log(event, "Here")
        this.setState({
            showEditSkillComponent: false
        })
    }

    showConfirmDeleteSkill = (e, skillId) => {
        console.log(skillId)
        e.preventDefault();
        this.setState({
            showConfirmDelete: true,
            skillId: skillId,
            skill: this.filterThroughSkillsAndGetRightOneForEdit(skillId)
        })
    }

    hideConfirmeDelete = () => {
    this.setState({
            showConfirmDelete: false
        })
    }

    filterThroughSkillsAndGetRightOneForEdit = (id) =>{
        let skill = this.props.skills.filter(skill=>{
            return skill._id == id
        });
        
        return skill[0];

    }

    render(){
        if (this.props.skills.length===0){
            return(
                <Loader/>
            )
        }
        return(
            <div className="skill-container">
                <div>
                {
                    
                    this.state.skills.map((skill)=>{
                        return (
                            <div key={skill._id} className="skill">
                            <h1>{skill.title}</h1>
                            <div className="action-section">
                            <span className="action" onClick={(e)=> this.openEditSkillComponent(e, skill._id)}>Edit?</span>
                            <span className="action" onClick={(e)=>this.showConfirmDeleteSkill(e, skill._id)}>Delete?</span>

                            </div>
                            </div>
                        )
                    })
                }
                </div>
                {
                    this.state.showEditSkillComponent && 
                        <EditSkillComponent
                            skill={this.state.skill}
                            skills={this.props.skills}
                            closeEditSection={this.closeEditSection}
                            handleEditData={(e) => this.handleEditSkill(e, this.state.skill.developer,this.state.skill._id)}
                        />
                }

                {
                    this.state.showConfirmDelete && 
                        <ConfirmDelete
                            domain={'Skill'}
                            confirmDelete={(e)=> this.handleDeleteSkill(e, this.state.skill.developer, this.state.skill._id)}
                            unConfirmDelete={this.hideConfirmeDelete}
                        />
                }
            </div>
            
        )
    }
}