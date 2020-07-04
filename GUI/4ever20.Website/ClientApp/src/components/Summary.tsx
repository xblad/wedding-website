import * as React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { NavHashLink } from 'react-router-hash-link';
import './Summary.css';

const LocationLink = (props: { children?: React.ReactNode }) => (
    <NavHashLink smooth className="text-light" to="/#location">{props.children}</NavHashLink>
)

const Summary = () => (
    <div id="summary">
        <p id="summary-names">Даниил&nbsp;и&nbsp;Екатерина</p>
        <p id="summary-appeal">рады пригласить вас на свою свадьбу!</p>
        <Container>
            <Row className="lead">
                <Col>
                    <h4 id="summary-body">
                    Совсем скоро наступит день, который будет для нас особенным – день нашей свадьбы. Мы
                    очень хотим, чтобы рядом были близкие и родные люди и приглашаем вас провести этот
                    день вместе с нами. Ваше присутствие станет для нас самым лучшим подарком!
                    </h4>
                </Col>
            </Row>
            <Row>
                <Col sm className="lead m-3"><LocationLink><FontAwesomeIcon className="cyan" icon={faCalendarAlt} /> 4 августа 2020 года</LocationLink></Col>
                <Col sm className="lead m-3"><LocationLink><FontAwesomeIcon className="magenta" icon={faMapMarkerAlt} /> Вилла Seven Hills, Прага</LocationLink></Col>
                <Col sm className="lead m-3"><LocationLink><FontAwesomeIcon className="yellow" icon={faClock} /> Сбор гостей 15:00</LocationLink></Col>
            </Row>
            <Row className="lead">
                <Col>
                    <NavLink className="text-light" href='https://www.instagram.com/explore/tags/4ever20wedding/' target="_blank">
                        <h4 style={{ marginTop: 20 }}>
                            <FontAwesomeIcon className="cyan" icon={faInstagram} />
                            &nbsp;
                            #4ever20wedding
                        </h4>
                    </NavLink>
                </Col>
            </Row>
        </Container>
    </div>
)

export default connect()(Summary);