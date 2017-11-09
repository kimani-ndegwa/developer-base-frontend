import React, {Component} from 'react';
import './Common.css';

export class EditSkillComponent extends Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <form className="edit-form" onSubmit={this.props.handleEditData}>
            <div className="edit-section">
            <span className="close-btn" onClick={this.props.closeEditSection}>X</span>
            <div className="input-section">
            <input
                defaultValue={this.props.skill.title}
                type='text'
                name='edit-title'
            />
            <input
            type='submit'
            value='edit'
            />
            </div>
            </div>
            </form>
        )
    }
}