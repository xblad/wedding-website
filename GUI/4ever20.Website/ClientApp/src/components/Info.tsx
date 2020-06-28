import * as React from 'react';
import { connect } from 'react-redux';
import Summary from './Summary';
import PhotoCarousel from './PhotoCarousel';
import Countdown from './Countdown';
import Timeline from './Timeline';
import Rules from './Rules';
import LocationInfo from './LocationInfo';
import Sponsors from './Sponsors';
import Gifts from './Gifts';

const Info = () => (
    <div>
        <Summary />
        <PhotoCarousel />
        <Countdown />
        <Timeline />
        <Rules />
        <LocationInfo />
        <Sponsors />
        <Gifts />
    </div>
);

export default connect()(Info);
