import React, {Component} from 'react';


export class AddComponent extends Component {
    render(){
        return(
        <div>
            <input
                onChange={this.props.handleChangeInput}   
                type="text"
                placeholder={this.props.domain}
            />

            <button onClick={this.props.handleSubmitData}>Add {this.props.domain}</button>
        </div>
        )
    }
}