import * as React from 'react';
import { connect } from 'react-redux';
import Summary from './Summary';
import PhotoCarousel from './PhotoCarousel';
import Countdown from './Countdown';
import Timeline from './Timeline';

const Info = () => (
    <div>
        <Summary />
        <PhotoCarousel />
        <Countdown />
        <Timeline />
    </div>
);

export default connect()(Info);
