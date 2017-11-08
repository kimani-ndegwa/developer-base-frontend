import React, {Component} from 'react';
import {SkillComponent} from '../Skills';
import {AddComponent} from '../Common';
import {ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils'

export class DeveloperDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            skillTitle: '',
            addingSkill: false,
            editDeveloper: false,
            skills: [],
            error: '',
        }
    }
    componentDidMount(){
        this.getSkills();
    }

    handleAddSkill= () => {
        this.setState({
            addingSkill: true
        })
    }

    getSkills = () => {
        return fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + this.props.match.params._id + '/skills', {
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

    handleSubmitSkill = (event) =>{
        let developerId = this.props.match.params._id
        fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + developerId +  '/skills/', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.skillTitle
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=>{
            if(response.ok) return response.json();
            throw new Error('Error Creating Skill');
        }).then(skill =>{
            let updatedSkills = [...this.state.skills];
            updatedSkills.push(skill);
            this.setState({
                skills: updatedSkills
            })
        }).catch(e=>{
            console.log(e);
        })
    }

    handleChangeInputComponent = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            skillTitle: value
        });
    }

    render(){
        return(
            <div>
                    <span onClick={this.handleAddSkill}>Add New Skill?</span>
                    {
                        this.state.addingSkill &&
                        <AddComponent
                            domain="Skill"
                            handleChangeInput={this.handleChangeInputComponent}
                            handleSubmitData={this.handleSubmitSkill}
                        
                        />
                    }

                    {
                                this.state.skills.length === 0 ?
                                <span>This developer has no skills added yet.</span>
                                :
                                this.state.skills.map((skill, index)=>{
                                    return(
                                        <SkillComponent
                                            key={index}
                                            skill={skill}
                                        />
                                    )
                                })
                    }


                    <div className='icon-dev-actions'>
                        <span>Edit User</span>
                        <span>Delete User</span>
                    </div>

            </div>
        )
    }
}