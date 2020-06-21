import * as React from 'react';
import { connect } from 'react-redux';
import Summary from './Summary';
import PhotoCarousel from './PhotoCarousel';
import Countdown from './Countdown';
import Timeline from './Timeline';
import Rules from './Rules';
import LocationInfo from './LocationInfo';

const Info = () => (
    <div>
        <Summary />
        <PhotoCarousel />
        <Countdown />
        <Timeline />
        <Rules />
        <LocationInfo />
    </div>
);

export default connect()(Info);
