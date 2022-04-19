import React, { useState, useContext } from 'react';
import { Country, City }  from 'country-state-city';
import { Container, Dropdown } from 'react-bootstrap';
import './Home.css'
import { Button } from 'react-bootstrap'
import { WeatherContext } from '../../context/WeatherContext';

const Home = (props) => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Zurkon/weather-geocoding/main/src/assets/bg.jpg')`;
    const [state, setState] = useState({
        country: '',
        city: '',
        countryName: '',
        countryLat: '',
        countryLong: '',
        cityLat: '',
        cityLong: ''
    });

    const context = useContext(WeatherContext);

    const selectCountry = (val) =>{
        setState({
            ...state, 
            country: val.isoCode,
            countryName: val.name,
            countryLat: val.latitude,
            countryLong: val.longitude,
            city: '',
            cityLat: '',
            cityLong: ''
        });
    }

    const selectCity = (val) =>{
        setState({
            ...state, 
            city: val.name,
            cityLat: val.latitude,
            cityLong: val.longitude
        });
    }

    const submitEntries = () => {
        let toSubmitLat = state.cityLat;
        let toSubmitLong = state.cityLong;
        if(state.cityLat === "" || state.cityLong === '') {
            toSubmitLat = state.countryLat;
            toSubmitLong = state.countryLong;
        }
        context.setWeatherCity({city: state.city, country: state.countryName, latitude: toSubmitLat, longitude: toSubmitLong });
        props.history.push('/weathercity');
    }

    let CitySelector = (City.getCitiesOfCountry(state.country).length === 0? <Dropdown.Item onSelect = {() => setState({...state, city: state.countryName})}>{state.countryName}</Dropdown.Item> : (City.getCitiesOfCountry(state.country).map((city)=> {
        return <Dropdown.Item onSelect = {() => selectCity(city)}>{city.name}</Dropdown.Item>
    })));

    return (
        <Container>
            <Dropdown>
                <Button variant="danger" style = {{marginTop: "5rem", width: "10rem"}}>{state.country === ''? "Select Country" : state.countryName}</Button>

                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" style = {{marginTop: "5rem", marginLeft: "10px", width: "15rem", backgroundColor: "transparent", borderWidth: "0.2rem", borderColor: "#d9534f", color: "#d9534f"}}/>

                <Dropdown.Menu style = {{height: "auto", maxHeight: "400px", overflowX: "hidden"}}>
                    {Country.getAllCountries().map((country)=> {
                        return <Dropdown.Item onSelect = {() => {selectCountry(country)}}>{country.name}</Dropdown.Item>
                    })};
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Button variant="danger" style = {{marginTop: "5rem", width: "10rem"}}>{state.city === ''? "Select City" : state.city}</Button>

                <Dropdown.Toggle split variant="danger" id="dropdown-split-basic" style = {{marginTop: "5rem", marginLeft: "10px", width: "15rem", backgroundColor: "transparent", color: "#d9534f", borderWidth: "0.2rem", borderColor: "#d9534f"}}/>

                <Dropdown.Menu style = {{height: "auto", maxHeight: "400px", overflowX: "hidden"}}>
                    {state.country === ''? <Dropdown.Item>Select Country From Above</Dropdown.Item> : CitySelector}
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="success" onClick = {() => submitEntries()} style = {{marginTop: "5rem", width: "10rem"}}>Submit</Button>
        </Container>
    );
}

export default Home;