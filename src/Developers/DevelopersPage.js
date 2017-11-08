import React, {Component} from 'react';
import DeveloperList from './DeveloperList';
import {ROOT_BACKEND_URL} from '../utils';
import {Loader} from '../Common';



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
        }).then(response => {
            if(response.ok){return response.json()};
            throw new Error('An Error Occurred');
        }).then(developers=>{
            this.setState({developers})
        }).catch(e=>{
            this.setState({errorText: e});
        })
    }


    render(){
        if(this.state.developers.length === 0){
            return(<Loader/>)
        }
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

