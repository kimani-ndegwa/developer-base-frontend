import React, {Component} from 'react';
import {SkillComponent, Skills} from '../Skills';
import {
    AddComponent,
    EditDeveloperComponent,
    EditSkillComponent,
    ConfirmDelete
} from '../Common';
import {ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils';
import {Redirect, Link} from 'react-router-dom'

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
            showEditSkillComponent:false,
            skillId: ''
        }
    }
    componentDidMount(){
        this.getSkills();
        this.getCurrentDeveloper();
    }

    hanldeAddSkill= () => {
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

    handleCloseComponent = () => {
        this.setState({
            addingSkill: false
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
        return fetch(ROOT_SINGLE_DEVELOPER_BACKEND_URL + '/' + developerId +  '/skills/', {
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
                skills: updatedSkills,
                addingSkill: false
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

    handleToggleEditDeveloper = () => {
        this.setState({
            edittingDeveloper: !this.state.edittingDeveloper
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
                    {
                        this.state.addingSkill &&
                        <AddComponent
                            domain="Skill"
                            handleChangeInput={this.handleChangeInputComponent}
                            handleSubmitData={this.handleSubmitSkill}
                            handleCloseComponent={this.handleCloseComponent}
                        
                        />
                    }

                    <Skills
                    developerId={this.props.match.params._id}
                    skills={this.state.skills}
                    />

                <div className='icon-dev-actions'>
                        <span className="add-skill" onClick={this.hanldeAddSkill}>Add New Skill?</span>
                        <span className="action" onClick={this.handleToggleEditDeveloper}>Edit Developer</span>
                        {
                            this.state.edittingDeveloper && 
                            <EditDeveloperComponent
                                developer={this.state.developer}
                                handleEditData={this._handleEditDeveloper}
                                closeEditSection={this.handleToggleEditDeveloper}
                            />
                        }
                        <span  className="action" onClick={this.deletingDeveloper}>Delete Developer</span>
                        {
                            this.state.deleteDeveloper &&
                            <ConfirmDelete
                                domain={'Developer'}
                                confirmDelete={this._handleDeleteDeveloper}
                                unConfirmDelete={this.deletingDeveloper}
                            />
                        }
                        <span className="action"><Link style={{textDecoration: 'none'}}to={'/'}>Back</Link></span>
                    </div>

            </div>
        )
    }
}