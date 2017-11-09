import React, {Component} from 'react';
import './Common.css';


export class AddComponent extends Component {
    render(){
        return(
        <div className="overlay">
            <div className="add-section">
            <span className="close-btn" onClick={this.props.handleCloseComponent}> X</span>
            <div className="input-section">
            <input
                onChange={this.props.handleChangeInput}   
                type="text"
                placeholder={this.props.domain}
            />
            <button onClick={this.props.handleSubmitData}> + Add {this.props.domain}</button>

            </div>
            </div>
        </div>
        )
    }
}