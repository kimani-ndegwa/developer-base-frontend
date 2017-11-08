import React, {Component} from 'react';

export class EditDeveloperComponent extends Component{
    render(){
        return(
            <form onSubmit={this.props.handleEditData}>
            <input
                defaultValue={this.props.developer.name}
                type='text'
                name='edit-developer'
            />
            <input
            type='submit'
            value='edit'
            />
            </form>
        )
    }
}