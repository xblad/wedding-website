import * as React from 'react';
import { connect } from 'react-redux';
import { UncontrolledCarousel } from 'reactstrap';
import photo1 from '../photos/Forever_twenty_Moment.jpg';
import photo2 from '../photos/Still_Models_1.jpg';
import photo3 from '../photos/Still_Models_2.jpg';

const items = [
    { src: photo1, altText: 'Photo 1', key: '1' },
    { src: photo2, altText: 'Photo 2', key: '2' },
    { src: photo3, altText: 'Photo 3', key: '3' }
];

const PhotoCarousel = () => <UncontrolledCarousel items={items} />;

export default connect()(PhotoCarousel);