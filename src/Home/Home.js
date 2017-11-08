import React , {Component} from 'react';
import {DevelopersPage} from '../Developers';


export class Home extends Component{
    render(){
        return(
            <div>Welcome to Dev Base

                <DevelopersPage/>
            </div>
        )
    }
}