import * as React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

const Summary = () => (
    <Jumbotron className="text-center" style={{ fontFamily: 'Open Sans', backgroundColor: '#eee', color: 'black' }}>
        <h1 style={{ fontFamily: 'Pacifico' }}>Ребята!</h1>
        <Container>
            <Row className="lead" style={{ color: '#4e4e4e' }}>
                <Col>
                    <h4>
                    Совсем скоро наступит день, который будет для нас особенным – день нашей свадьбы. Мы
                    очень хотим, чтобы рядом были близкие и родные люди и приглашаем вас провести этот
                    день вместе с нами. Ваше присутствие станет для нас самым лучшим подарком!
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col sm className="lead m-3"><h4><FontAwesomeIcon className="cyan" icon={faCalendarAlt} /> 4 августа 2020 года</h4></Col>
                <Col sm className="lead m-3"><h4><FontAwesomeIcon className="magenta" icon={faMapMarkerAlt} /> Вилла Seven Hills, Прага</h4></Col>
                <Col sm className="lead m-3"><h4><FontAwesomeIcon className="yellow" icon={faClock} /> Сбор гостей 15:00</h4></Col>
            </Row>
        </Container>
    </Jumbotron>
)

export default connect()(Summary);