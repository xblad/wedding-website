import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Layout from './components/Layout';
import Info from './components/Info';
import PhotoGallery from './components/PhotoGallery';
import SaveTheDate from './components/SaveTheDate';
import './custom.css';   

export default () => (
    <Layout>
        <Route exact path='/' component={Info} />
        <Route exact path='/photos' component={PhotoGallery} />
        <Route path="/save-the-date/:invitationGuid?" component={SaveTheDate} />
    </Layout>
);
