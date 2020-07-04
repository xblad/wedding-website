import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';
import * as PhotoStore from '../store/PhotoStore';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from "react-images";
import { Jumbotron, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const PhotoGalleryCore = ({ photoList }: { photoList: PhotoStore.Photo[] }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div>
            <Jumbotron className="text-center">
                <NavLink className="text-light" href='https://www.instagram.com/explore/tags/4ever20wedding/' target="_blank">
                    <h1 style={{ marginTop: 20 }}>
                        <FontAwesomeIcon className="cyan" icon={faInstagram} />
                        &nbsp;
                        #4ever20wedding
                    </h1>
                </NavLink>
                <h3 style={{ fontFamily: 'Pacifico' }}>Ниже вы сможете найти фотографии праздника</h3>
            </Jumbotron>
            <Gallery photos={photoList} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photoList.map(x => ({
                                source: x.src
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}

export default connect()(PhotoGalleryCore);
