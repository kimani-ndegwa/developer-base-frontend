import React, {Component} from 'react';


export class ConfirmDelete extends Component{
    render(){
        return(
            <div className="overlay">
                <div className="content">
                {'Are you sure you want to delete this ' + this.props.domain + '?'}

                <div className="actions-section">
                    <span className="action" onClick={this.props.confirmDelete}>Yes</span>
                    <span className="action" onClick={this.props.unConfirmDelete}>No</span>
                </div>
                </div>
            </div>
        )
    }
}