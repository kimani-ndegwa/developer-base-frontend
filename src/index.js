import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './Home';
import { DevelopersPage } from './Developers'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/developers' component={DevelopersPage} />
        </Switch>
    </Router>


    , document.getElementById('root'));
registerServiceWorker();
