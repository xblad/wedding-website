import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Layout from './components/Layout';
import Info from './components/Info';
import Preparation from './components/Preparation';
import DayX from './components/DayX';
import SaveTheDate from './components/SaveTheDate';
//import Counter from './components/Counter';
//import FetchData from './components/FetchData';
import OurStory from './components/OurStory';
import Guests from './components/Guests';

import './custom.css'
import Container from 'reactstrap/lib/Container';

const MainLayout =
    <Layout>
        <Route exact path='/' component={Info} />
        <Route exact path='/preparation' component={Preparation} />
        <Route exact path='/day-x' component={DayX} />
        {/*
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
            */}
        <Route path='/story' component={OurStory} />
        <Route path='/guests' component={Guests} />
    </Layout>

export default () => (
    //MainLayout
    <Container>
        <Switch>
            <Route path="/save-the-date/:invitationGuid?" component={SaveTheDate} />
            <Redirect from="*" to="/save-the-date" />
        </Switch>
    </Container>
);
