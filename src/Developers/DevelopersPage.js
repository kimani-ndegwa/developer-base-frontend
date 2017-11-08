import React, {Component} from './react';
import DeveloperList from './DeveloperList';



export class DevelopersPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            developers : []
        }
    }

    render(){
        return(
            <div>
                Here are our developers
            </div>
        )
    }
}

