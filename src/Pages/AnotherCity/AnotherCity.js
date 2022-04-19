import React, { useState, useContext } from 'react';
import './AnotherCity.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherCard from '../../Components/WeatherCard/WeatherCard';
//import keys from '../../config';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import ForecastCard from '../../Components/ForecastCard/ForecastCard';
import { WeatherContext } from '../../context/WeatherContext';

const AnotherCity = (props) => {

    const [state, setState] =  useState({
        error: false,
        dataFetched: false,
        forecast: [],
        today: ''
    });

    const context = useContext(WeatherContext);
    
    /*const onClickForecast = (day) => {
        props.history.push('/forecast');
    }*/

    const onClickHistory = () => {
        props.history.push('/historical');
    }

    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/Zurkon/weather-geocoding/main/src/assets/bg.jpg')`;
    let latitude = localStorage.getItem("latitude");
    let longitude = localStorage.getItem("longitude");
    let country = localStorage.getItem("country");
    let city = localStorage.getItem("city");
    let d = true;
    let col = d ? "black" : "white";

    if(city === '') {
        return (
            <h3 style = {{color: col, backgroundColor: "transparent"}} onClick = {()=> {props.history.push('/home')}}>Some Error Ocurred. Return to Home</h3>
        );
    }

    let request1 = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${process.env.REACT_APP_OPENWEATHER}&units=metric`);
    let request2 = axios.get(`https://secure.geonames.org/timezoneJSON?lat=${latitude}&lng=${longitude}&username=${process.env.REACT_APP_USERNAME}`);

    if(!state.dataFetched && !state.error) {
        axios.all([request1, request2])
            .then(axios.spread((...responses) => {
                //console.log(responses);
                const response1 = responses[0];
                const response2 = responses[1];
                //console.log(response2);
                //console.log(response1);
                var parts = response2.data.time.split(" ")[0].split("-");
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                //console.log(mydate.toDateString().split(" ")[0]);
                const days = {
                    Mon : "Monday",
                    Tue : "Tuesday",
                    Wed : "Wednesday",
                    Thu : "Thursday",
                    Fri : "Friday",
                    Sat : "Saturday",
                    Sun : "Sunday"
                }
                setState({
                    ...state,
                    error: false,
                    forecast: response1.data.daily,
                    today: {
                        day: days[mydate.toDateString().split(" ")[0]],
                        date: response2.data.time.split(" ")[0].split("-")[2],
                        time: response2.data.time.split(" ")[1],
                        year: response2.data.time.split(" ")[0].split("-")[0],
                        month: parseInt(response2.data.time.split(" ")[0].split("-")[1]) - 1,
                        sunrise: response2.data.sunrise.split(" ")[1],
                        sunset: response2.data.sunset.split(" ")[1],
                        timezone: response2.data.timezoneId
                    },
                    dataFetched: true
                })
                context.setTimeZone({timezone: response2.data.timezoneId});
            }))
            .catch((err) => {
                console.log(err);
                setState({
                    ...state,
                    error: true
                })
            });
    }
    let val = 0;
    //console.log(state);
    return (
        <div>
            {state.error || !state.dataFetched? <Spinner  animation = "grow" variant = "dark"/> : <WeatherCard lat = {latitude} long = {longitude} city = {city} country = {country} today = {state.today}/>}
            <Carousel>
                {state.dataFetched? state.forecast.map((day) => {val = val + 1; return <ForecastCard key = {val} day = {day} timezone = {state.today.timezone}/>}): <Spinner  animation = "grow" variant = "dark"/>}
            </Carousel>
            <button type="button" className="btn btn-primary me-7" style={{ borderWidth: "3px" }} onClick={() => onClickHistory()}>Check Historical Weather</button>
        </div>
    );
}

export default AnotherCity;