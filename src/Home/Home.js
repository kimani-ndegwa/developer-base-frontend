import React , {Component} from 'react';
import {DevelopersPage} from '../Developers';
import './Home.css';

export class Home extends Component{
    render(){
        return(
            <div className="home">
                <div className="catalogue">
                <h2>Welcome to Dev Base</h2>
            <DevelopersPage/>
            </div>>
            </div>
        )
    }
}