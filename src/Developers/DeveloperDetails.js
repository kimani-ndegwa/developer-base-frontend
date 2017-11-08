import React, {Component} from 'react';
import {Skills} from '../Skills'

export class DeveloperDetails extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props.match.params._id)
    }

    render(){
        return(
            <div>
                    <span>Add New Skill?</span>
                    <Skills
                        developerId={this.props.match.params._id}
                    />

                    <div>
                    
                    </div>

            </div>
        )
    }
}