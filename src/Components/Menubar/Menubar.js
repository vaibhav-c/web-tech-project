import React, {useContext} from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import './Menubar.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { BiMenu } from 'react-icons/bi';

const Menubar = (props) => {
    const context = useContext(WeatherContext);
    const moveToHome = () => {
        context.setWeather({day: true});
        window.location.replace('/home');
    }

    let day = context.day;
    //console.log(context.day);
    let col = day? "black" : "white";

    return (
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
            <Container>
                <Navbar.Brand>
                    <button type ="button" className = {day? "btn btn-primary me-3" : "btn btn-primary me-4" } style = {{ color: col, borderWidth: "3px", borderColor : col}} onClick = {() => moveToHome()}>
                        The Weather App
                    </button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style = {{borderColor: col, borderWidth: "3px", color: "transparent"}}><BiMenu type = "solid" size = "30" color = {col}/></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav" style = {{borderColor: col, borderWidth: "3px", color: "transparent"}}>
                <Nav className="me-auto" style = {{justifyContent: "end", textAlign:"right"}}>
                
                </Nav>
                <Nav className="justify-content-end">
                    
                    <Nav.Item>
                        <Nav.Link style = {{color: col}}><button type ="button" className = {day? "btn btn-primary me-3" : "btn btn-primary me-4" } style = {{ color: col, borderWidth: "3px", borderColor : col}} onClick = {() => moveToHome()}>Check Another City</button></Nav.Link>
                    </Nav.Item>
                </Nav>    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Menubar;