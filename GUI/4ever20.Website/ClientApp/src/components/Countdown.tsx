import * as React from 'react';
import { connect } from 'react-redux';
import ReactCountdown, { CountdownRenderProps } from 'react-countdown';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import './Countdown.css';

export interface CountdownElementProps {
    digit: number,
    text: string
}

const CountdownElement = ({ digit, text } : CountdownElementProps) => {
    return (
        <Col className="countdown-element">
            <p className="digit">{digit}</p>
            <p className="text">{text}</p>
        </Col>
    );
}

const renderer = ({ days, hours, minutes, seconds, completed } : CountdownRenderProps) => {
    if (completed) {
        return <Jumbotron><h1 className="text-center">Начинаем!</h1></Jumbotron>;
    } else {
        return (
            <Jumbotron>
                <Container>
                    <Row className="react-countdown">
                        <CountdownElement digit={days} text="дней" />
                        <CountdownElement digit={hours} text="часов" />
                        <CountdownElement digit={minutes} text="минут" />
                        <CountdownElement digit={seconds} text="секунд" />
                    </Row>
                </Container>
            </Jumbotron>
            );
    }
};

const Countdown = () => (
    <ReactCountdown
        date={new Date('2020-08-04 16:08')}
        renderer={renderer}
    />
)

export default connect()(Countdown);