import React, {Component} from 'react';

export class EditSkillComponent extends Component{

    constructor(){
        super();
    }
    render(){
        return(
            <form onSubmit={this.props.handleEditData}>
            <input
                defaultValue={this.props.skill.title}
                type='text'
                name='edit-title'
            />
            <input
            type='submit'
            value='edit'
            />
            </form>
        )
    }
}