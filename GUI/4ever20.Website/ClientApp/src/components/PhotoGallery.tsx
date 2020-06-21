import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as PhotoStore from '../store/PhotoStore';
import PhotoGalleryCore from './PhotoGalleryCore';

// At runtime, Redux will merge together...
type PhotoGalleryProps =
    PhotoStore.PhotoGalleryState // ... state we've requested from the Redux store
    & typeof PhotoStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class PhotoGallery extends React.PureComponent<PhotoGalleryProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                {this.renderPhotos()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestPhotos();
    }

    private renderPhotos() {
        return <PhotoGalleryCore photoList={this.props.photoList}/>;
    }
}

export default connect(
    (state: ApplicationState) => state.photos, // Selects which state properties are merged into the component's props
    PhotoStore.actionCreators // Selects which action creators are merged into the component's props
)(PhotoGallery as any);
