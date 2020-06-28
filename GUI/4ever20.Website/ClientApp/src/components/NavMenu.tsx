import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar fixed="top" expand="sm" className="box-shadow mb-3 bg-dark navbar-toggleable-sm" dark>
                    <Container>
                        <NavbarBrand>
                            <NavHashLink smooth className="text-light nav-link" to="/#summary">
                                Dan & Kate Wedding
                            </NavHashLink>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavHashLink smooth className="text-light nav-link" to="/#summary">Важная информация</NavHashLink>
                                </NavItem>
                                <NavItem>
                                    <NavHashLink smooth className="text-light nav-link" to="/#timeline">Наш день</NavHashLink>
                                </NavItem>
                                <NavItem>
                                    <NavHashLink smooth className="text-light nav-link" to="/#notes">Подсказки и пожелания</NavHashLink>
                                </NavItem>
                                <NavItem>
                                    <NavHashLink smooth className="text-light nav-link" to="/#location">Место и время</NavHashLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/photos">Фотографии</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavHashLink smooth className="text-light nav-link" to="/#gifts">Подарки</NavHashLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
