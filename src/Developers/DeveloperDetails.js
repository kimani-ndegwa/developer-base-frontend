import React, {Component} from 'react';
import {SkillComponent} from '../Skills';
import {
    AddComponent,
    EditDeveloperComponent,
    EditSkillComponent,
    ConfirmDelete
} from '../Common';
import {ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils';
import {Redirect} from 'react-router-dom'

export class DeveloperDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            skillTitle: '',
            addingSkill: false,
            deleteDeveloper: false,
            editDeveloper: false,
            confirmDeleteDeveloper: false,
            developerName: '',
            developer: {},
            skills: [],
            error: '',
        }
    }
    componentDidMount(){
        this.getSkills();
        this.getCurrentDeveloper();
    }

    addingSkill= () => {
        this.setState({
            addingSkill: true
        })
    }

    edittingDeveloper = () => {
        this.setState({
            editDeveloper: true
        })
    }

    deletingDeveloper = () => {
        this.setState({
            deleteDeveloper: !this.state.deleteDeveloper
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

    getCurrentDeveloper = () => {
        return fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + this.props.match.params._id, {
            method : 'GET'
        })
        .then(response=>{
            if(response.ok)return response.json()
            throw new Error('Error occured getting skills')
        }).then(developer=>{
            this.setState({developer});
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


    _handleEditDeveloper = (event) => {
        event.preventDefault();
        let developerId = this.props.match.params._id;
        let edittedName = event.target['edit-developer'].value;
        fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + developerId, {
            method: 'PUT',
            body: JSON.stringify({
                name: edittedName
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=>{
            if(response.ok) return response.json();
            throw new Error('Error Creating Skill');
        }).then(developer =>{
            console.log(developer);
        }).catch(e=>{
            console.log(e);
        })
    }

    _handleDeleteDeveloper = (event) => {
        event.preventDefault();
        let developerId = this.props.match.params._id;
        fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + developerId, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=>{
            if(response.ok) return response.json();
            throw new Error('Error Deleting Developer');
        }).then((message) =>{
            this.setState({
                confirmDeleteDeveloper: true
            })
        }).catch(e=>{
            console.log(e);
        })
    }

    render(){
        if(this.state.confirmDeleteDeveloper){
            return(
                <Redirect to='/'/>
            )
        }
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
                                        <div key={index}>
                                        <SkillComponent
                                            skill={skill}
                                        />

                                        </div>
                                    )
                                })
                    }

                <div className='icon-dev-actions'>
                        <span onClick={this.handleToggleEditDeveloper}>Edit Developer</span>
                        {
                            this.state.edittingDeveloper && 
                            <EditDeveloperComponent
                                developer={this.state.developer}
                                handleEditData={this._handleEditDeveloper}
                            
                            />
                        }
                        <span onClick={this.deletingDeveloper}>Delete Developer</span>
                        {
                            this.state.deleteDeveloper &&
                            <ConfirmDelete
                                confirmDelete={this._handleDeleteDeveloper}
                                unConfirmDelete={this.deletingDeveloper}
                            />
                        }
                    </div>

            </div>
        )
    }
}