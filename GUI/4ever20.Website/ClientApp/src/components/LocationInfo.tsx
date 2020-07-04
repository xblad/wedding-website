import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Container, Row, Col } from 'reactstrap';
// @ts-ignore
import AddToCalendarHOC from 'react-add-to-calendar-hoc';
import './LocationInfo.css';

const event = {
    description: 'Свадьба проходит во вторник.\nНе забудьте купальник, удобную обувь, зонтик, теплую одежду.\nБольше информации на сайте https://4ever20.wedding/',
    duration: 20,
    startDatetime: '20200804T150000',
    endDatetime: '20200805T110000',
    location: 'Villa Seven Hills, Barrandovská 155/15, 152 00 Praha 5-Hlubočepy, Czechia',
    title: '4ever20 - Dan & Kate Wedding',
    timezone: 'Europe/Prague'
}

const Button = ({ children, onClick }: { children: any, onClick: any }) => {
    return (
        <button
            className='add-to-calendar-button'
            onClick={onClick}
        >
            {children}
        </button>
    );
}

const CalendarModal = ({
    children,
    isOpen,
    onRequestClose,
}: {
    children: any,
    isOpen: any,
    onRequestClose: any,
}) => {
    return (
        <Modal
            className='add-to-calendar-modal'
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
        >
            <h2>Add to Calendar</h2>
            <div>{children}</div>
            <Button onClick={onRequestClose}>Cancel</Button>
        </Modal>
    );
}

const Dropdown = ({ children }: { children : any }) => {
    return (
        <div className='add-to-calendar-dropdown'>
            {children}
        </div>
    );
}

const AddToCalendarModal = AddToCalendarHOC(Button, CalendarModal);
const AddToCalendar = AddToCalendarHOC(Button, Dropdown);
const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const LocationInfo = () => (
    <Container id="location" className="my-5">
        <Row>
            <Col sm="8">
                <iframe
                    width="100%"
                    height="450px"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ_aUcTguVC0cRLbrRoalEmCU&key=AIzaSyDrApfzMJHakoW7zQW-ciNOkX_gdYZak3I">
                    </iframe>
            </Col>
            <Col sm="4">
                <h4>Вилла Seven Hills, Прага</h4>
                <h4>4 августа 2020 года</h4>
                <h4>Сбор гостей 15:00</h4>
                <AddToCalendarModal
                    event={event}
                    className='add-to-calendar-component'
                    linkProps={{
                        className: 'add-to-calendar-link',
                    }}
                    buttonText="Добавить в календарь"
                    items={['Google', 'iCal']}
                />
            </Col>
        </Row>
    </Container>
);

export default connect()(LocationInfo);
