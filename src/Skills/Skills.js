import React, {Component} from 'react';
import {ROOT_SINGLE_DEVELOPER_BACKEND_URL} from '../utils';
import {SkillComponent} from './SkillComponent';

// Give this the developer and it is able to make a fetch call to get the skills of that particular dev.
export class Skills extends Component{
    constructor(props){
        super(props);
        this.state = {
            skills: [],
            error: '',
        };

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
            // let skills = this._getOnlyTitleFromSkillSet(skillsData);
            this.setState({skills});
        }).catch(e=>{
            this.setState({error: e});
        })
    }

    // _getOnlyTitleFromSkillSet = (skillsData) => {
    //     let skills = [];
    //     skillsData.map(skill=>{
    //         skills.push(skill.title);
    //     })

    //     return skills;
    // }
    render(){

        return(
            <div>
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
            </div>
        )
    }
}