import React, {Component} from 'react';
import './Common.css'

export class EditDeveloperComponent extends Component{
    render(){
        return(
            <form className="edit-form" onSubmit={this.props.handleEditData}>
            <div className="edit-section">
            <span className="close-btn" onClick={this.props.closeEditSection}>X</span>
            <div className="input-section">
            <input
                defaultValue={this.props.developer.name}
                type='text'
                name='edit-developer'
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