import * as React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faBirthdayCake, faWineGlassAlt, faHeart, faUtensils, faCocktail, faSwimmingPool, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Timeline.scss';

export interface TimelineEntry {
    icon: IconDefinition;
    time: string;
    title?: string;
    description: string;
    booletins?: string[];
}

const entries = [
    { icon: faWineGlassAlt, time: "15:00", description: "Сбор Гостей / Фуршет" },
    { icon: faHeart, time: "16:08", description: "Церемония" },
    { icon: faUtensils, time: "18:00", description: "Праздничный Ужин" },
    { icon: faCocktail, time: "19:00", description: "Байки Бармена / Дегустация Коктейлей" },
    { icon: faBirthdayCake, time: "21:00", description: "Разрезание Свадебного Торта" },
    { icon: faSwimmingPool, time: "22:00", description: "Бассейн / Релакс" },
    { icon: faMoon, time: "02:00", description: "Сладкий Сон на Вилле после Долгого Дня" }
];

const Timeline = () => (
    <div>
        <h1>Наш День</h1>
        <div className="timeline">
            {
                entries.map((timelineEntry: TimelineEntry) =>
                    <div className="entry">
                        <div className="title">
                            <h4>
                                <FontAwesomeIcon className="yellow" icon={timelineEntry.icon} /> {timelineEntry.time}
                            </h4>
                            <p>{timelineEntry.title}</p>
                        </div>
                        <div className="body">
                            <h3>{timelineEntry.description}</h3>
                            {timelineEntry.booletins &&
                                <ul>
                                    {timelineEntry.booletins.map((booletin, i) => <li key={i}>{booletin}</li>)}
                                </ul>}
                        </div>
                    </div>
                )
            }
        </div>
    </div>
)

export default connect()(Timeline);