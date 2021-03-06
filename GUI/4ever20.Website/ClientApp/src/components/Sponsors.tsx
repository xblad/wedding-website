﻿import * as React from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Col, Row, Container } from 'reactstrap';
import organizerImgSrc from '../images/sponsors/organizer.jpg';
import placeImgSrc from '../images/sponsors/place.jpg';
import cateringImgSrc from '../images/sponsors/catering.png';
import barmanImgSrc from '../images/sponsors/barman.jpg';
import decoratorImgSrc from '../images/sponsors/decorator.jpg';
import inspiringPhotographerImgSrc from '../images/sponsors/inspiring_photographer.jpg';
import photographerImgSrc from '../images/sponsors/photographer.jpg';
import videographerImgSrc from '../images/sponsors/videographer.jpg';
import makeupImgSrc from '../images/sponsors/makeup.jpg';
import bandImgSrc from '../images/sponsors/band.jpg';
import dressImgSrc from '../images/sponsors/dress.png';
import cakeImgSrc from '../images/sponsors/cake.png';
import inventoryImgSrc from '../images/sponsors/inventory.jpg';
import clothingArtImgSrc from '../images/sponsors/clothing_art.jpg';

const SponsorImg = ({ href, title, src, original }: { href: string, title: string, src: string, original?: boolean }) => (
    <div>
        <a href={href} target="_blank">
            <img className={`d-block mx-auto my-3 ${!original && "rounded-circle"}`}
                alt={title}
                title={title}
                src={src}
                width="130"
                data-holder-rendered="true"
                />
        </a>
    </div>
    );

const Sponsors = () => (
    <Jumbotron id="sponsors">
        <h1>Этот день нам помогли осуществить</h1>
        <Container>
            <Row>
                <Col sm><SponsorImg href="https://www.instagram.com/tatiana.chervova/" title="Татьяна Кудря — Организатор" src={organizerImgSrc}/></Col>
                <Col sm><SponsorImg href="https://villa7hills.com/?lang=ru" title="Villa Seven Hills — Место" src={placeImgSrc}/></Col>
                <Col sm><SponsorImg href="https://www.streetcatering.cz/" title="Street Catering — Еда" src={cateringImgSrc}/></Col>
                <Col sm><SponsorImg href="https://www.instagram.com/kealtozet/" title="Никита Парфенов — Бармен" src={barmanImgSrc}/></Col>
                <Col sm><SponsorImg href="https://www.instagram.com/pragueflowers_pg/" title="Petr Grena — Декоратор" src={decoratorImgSrc} /></Col>
                <Col sm><SponsorImg href="http://annitum.com/" title="Анни Кайвомага — Видеограф" src={videographerImgSrc} /></Col>
                <Col sm><SponsorImg href="https://adamovafoto.com/" title="Дарья Адамова — Фотограф" src={photographerImgSrc} /></Col>
            </Row>
            <Row>
                <Col sm><SponsorImg href="https://www.instagram.com/by_dolphin_ns/" title="Анастасия Щукова — Бьюти Гуру" src={makeupImgSrc} /></Col>
                <Col sm><SponsorImg href="https://www.coupleofsounds.com/" title="Couple of Sound — Живая Музыка" src={bandImgSrc} /></Col>
                <Col sm><SponsorImg href="https://teamo.cz/" title="Te Amo — Платье Невесты" src={dressImgSrc} /></Col>
                <Col sm><SponsorImg original href="https://www.sladkedortikytali.cz/" title="Dorty Tali — Свадебный Торт" src={cakeImgSrc} /></Col>
                <Col sm><SponsorImg href="https://www.maximuminventory.cz/" title="Maximum Inventory — Мебель" src={inventoryImgSrc} /></Col>
                <Col sm><SponsorImg href="https://www.instagram.com/alinadooplo/" title="Алина Лапаева — Роспись Одежды" src={clothingArtImgSrc} /></Col>
                <Col sm><SponsorImg href="https://feelingsfotolab.com/" title="Ксения Аникеева — Вдохновляющий Фотограф" src={inspiringPhotographerImgSrc} /></Col>
            </Row>
        </Container>
    </Jumbotron>
);

export default connect()(Sponsors);
