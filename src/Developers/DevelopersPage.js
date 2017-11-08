import React, {Component} from 'react';
import DeveloperList from './DeveloperList';
import {ROOT_BACKEND_URL, ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils';
import {Loader, AddComponent} from '../Common';



export class DevelopersPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            developers : [],
            errorText: '',
            addingDeveloper: false,
            developerName: '',
            skillTitle: ''
        }
    }

    componentDidMount(){
        fetch(ROOT_BACKEND_URL, {
            method: 'GET'
        }).then(response => {
            if(response.ok){return response.json()};
            throw new Error('An Error Occurred');
        }).then(developers=>{
            this.setState({developers})
        }).catch(e=>{
            this.setState({errorText: e});
        })
    }

    handleAddDeveloper = () => {
        this.setState({
            addingDeveloper: true
        })
    }

    handleSubmitDeveloper = (event) =>{
        fetch(ROOT_BACKEND_URL, {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.developerName
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response=>{
            if(response.ok) return response.json();
            throw new Error('Error Creating Developer');
        }).then(developer =>{
            let updatedDevelopers = [...this.state.developers];
            updatedDevelopers.push(developer);
            this.setState({
                developers: updatedDevelopers
            })
        }).catch(e=>{
            console.log(e);
        })
    }

    handleChangeInputComponent = (event) => {
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            developerName: value
        });
    }

    render(){
        if(this.state.developers.length === 0){
            return(<Loader/>)
        }
        return(
            <div>
                Here are our developers
                <a onClick={this.handleAddDeveloper}>+ Add New Developer?</a>
                {
                    this.state.addingDeveloper && 

                    <AddComponent
                        domain='Developer'
                        handleSubmitData={this.handleSubmitDeveloper}
                        handleChangeInput={this.handleChangeInputComponent}
                    />
             
                }
                
                <DeveloperList
                developers={this.state.developers}
                />
            </div>
        )
    }
}

