import React from 'react';
import ReactDOM from 'react-dom';
import {Home} from './Home';
import {DeveloperDetails} from './Developers'
import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Router>
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/developer/:_id' component={DeveloperDetails}/>
    </Switch>
</Router>


, document.getElementById('root'));
registerServiceWorker();
