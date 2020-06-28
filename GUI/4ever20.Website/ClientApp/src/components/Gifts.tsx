import * as React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

const Gifts = () => (
    <Jumbotron id="gifts">
        <h1>Идеи для подарка</h1>
        <p>Вклад в наш бюджет — это лучший подарок.</p>
        <p className="polite">Hомер счёта: <em>1677906044/3030</em></p>
        <p className="polite">Revolut: <em>+420 720 021 216</em></p>
    </Jumbotron>
);

export default connect()(Gifts);
