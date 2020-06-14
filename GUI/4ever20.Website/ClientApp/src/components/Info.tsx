import * as React from 'react';
import { connect } from 'react-redux';
import PhotoCarousel from './PhotoCarousel';
import Countdown from './Countdown';
import Timeline from './Timeline';

const Info = () => (
    <div>
        <PhotoCarousel />
        <Countdown />
        <Timeline />
    </div>
);

export default connect()(Info);
