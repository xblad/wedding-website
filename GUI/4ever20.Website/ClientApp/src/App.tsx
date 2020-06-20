import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Layout from './components/Layout';
import Info from './components/Info';
import Preparation from './components/Preparation';
import DayX from './components/DayX';
import SaveTheDate from './components/SaveTheDate';
import Guests from './components/Guests';
import './custom.css';   

export default () => (
    <Layout>
        <Route exact path='/' component={Info} />
        <Route exact path='/preparation' component={Preparation} />
        <Route exact path='/day-x' component={DayX} />
        <Route path='/guests' component={Guests} />
        <Route path="/save-the-date/:invitationGuid?" component={SaveTheDate} />
    </Layout>
);
