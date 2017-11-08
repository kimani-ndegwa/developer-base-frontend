import React, {Component} from 'react';


export class ConfirmDelete extends Component{
    render(){
        return(
            <div>
                {'Are you sure you want to delete this ' + this.props.domain + '?'}

                <div>
                    <span onClick={this.props.confirmDelete}>Yes</span>
                    <span onClick={this.props.unConfirmDelete}>No</span>
                </div>
            </div>
        )
    }
}