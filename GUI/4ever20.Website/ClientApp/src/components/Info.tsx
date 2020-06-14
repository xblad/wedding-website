import * as React from 'react';
import { connect } from 'react-redux';
import PhotoCarousel from './PhotoCarousel';
import Timeline from './Timeline';

const Info = () => (
    <div>
        <PhotoCarousel />
        <Timeline />
    </div>
);

export default connect()(Info);
