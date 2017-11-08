import React, {Component} from './react';
import DeveloperList from './DeveloperList';
import {ROOT_BACKEND_URL} from '../utils';



export class DevelopersPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            developers : [],
            errorText: ''
        }
    }

    componentDidMount(){
        fetch(ROOT_BACKEND_URL, {
            method: 'GET'
        }).then(developers=>{
            this.setState(developers);
        }).catch(e=>{
            this.setState(errorText: e);
        })
    }


    render(){
        return(
            <div>
                Here are our developers
                <DeveloperList
                developers={this.state.developers}
                />
            </div>
        )
    }
}

