import React, { useState, useContext } from 'react';
import './WeatherCard.css';
import Links from './Links';
import axios from 'axios';
//import keys from '../../config';
import { WeatherContext } from '../../context/WeatherContext';
import { Spinner } from 'react-bootstrap';
import { WiCloud, WiHumidity, WiStrongWind } from "react-icons/wi";

const WeatherCard = (props) => {

    const context = useContext(WeatherContext);
    const [data, setData] = useState({
        day: false,
        weather: '',
        main: '',
        remaining: '',
        loaded: false
    });

    let col = data.day? "black" : "white";
    //console.log(props.country);
    //console.log(props.today);
    
    const sendRequest = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.long}&appid=${process.env.REACT_APP_OPENWEATHER}&units=metric`)
        .then((req) => {
            if(props.today.time > props.today.sunset || props.today.time < props.today.sunrise) {
                setData({
                    ...data,
                    day: false,
                    weather: req.data.weather[0].description,
                    main: req.data.weather[0].main,
                    remaining: req.data,
                    loaded: true
                });
                context.setWeather({day : false});
                context.setWeatherCity({city: props.city, country: props.country, latitude: props.lat, longitude: props.long});
            } else {
                setData({
                    day: true,
                    weather: req.data.weather[0].description,
                    main: req.data.weather[0].main,
                    remaining: req.data,
                    loaded: true
                });
                context.setWeather({day: true});
            }
        });
    }

    if(data.weather === '') {
        sendRequest();
    }

    //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = props.today.day + ", " + props.today.date + " " + month[props.today.month] + " " + props.today.year;
    /*let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    let minutes = today.getMinutes() < 10? '0' + today.getMinutes() : today.getMinutes(); 
    let time = hours + ":" + minutes;*/
    
    let condition = data.day ? Links.day[data.main] : Links.night[data.main];
    let linkbg = data.day? Links.backgrounds.green : Links.backgrounds.night;
    document.body.style.backgroundImage = `url(${linkbg})`;
    if(data.main === "Clouds") {
        if(data.weather === "few clouds") {
            condition =  data.day ? Links.day[data.main].fewClouds : Links.night[data.main].fewClouds;
        } else if(data.weather === "scattered clouds") {
            condition =  data.day ? Links.day[data.main].scatteredClouds : Links.night[data.main].scatteredClouds;
        } else if(data.weather === "broken clouds") {
            condition =  data.day ? Links.day[data.main].brokenClouds : Links.night[data.main].brokenClouds;
        } else if(data.weather === "overcast clouds") {
            condition =  data.day ? Links.day[data.main].overcastClouds : Links.night[data.main].overcastClouds;
        }
    }

    return (
        <div className="container-fluid px-1 px-md-4 py-5 mx-auto">
            <div className="row d-flex justify-content-center px-3">
                <div className={data.day? "card":"cardNight"} style = {{backgroundImage: `url(${condition})`}}>
                    <h2 className="ml-auto mr-4 mt-3 mb-0" style = {{fontWeight: 'bold', color: col}}>{props.city}</h2>
                    <p className="ml-auto mr-4 mb-0 med-font" style = {{fontWeight: 'bold', color: col, textTransform: 'capitalize'}}>{data.weather}</p>
                    <h1 className="ml-auto mr-4 large-font" style = {{fontWeight: 'bold', color: col}}>{data.loaded? data.remaining.main.temp.toFixed(1) : <Spinner animation = "grow" variant = {data.day? "dark": "light"}/>}&#176;C</h1>
                    <div className="time-font mb-0 ml-4 mt-auto" style = {{fontWeight: 'bold', color: col}}>
                        <span style = {{float: "left"}}><WiHumidity size = "50px" color = {col}/>{data.loaded? data.remaining.main.humidity +'%': <Spinner animation = "grow" variant = "dark"/>}</span>
                        <span><WiCloud size = "50px" color = {col}/>{data.loaded? data.remaining.clouds.all +'%': <Spinner/>}</span>
                        <span style = {{float: "right"}}><WiStrongWind size = "50px" color = {col}/>{data.loaded? data.remaining.wind.speed.toFixed(1) + 'm/s': <Spinner animation = "grow" variant = "dark"/>}</span>
                    </div>
                    <div><p className="time-font mb-0 ml-4 mt-auto" style = {{fontWeight: 'bold', color: col}}>{props.time}</p></div>
                    <div><p className="ml-4 mb-4" style = {{fontWeight: 'bold', color: col}}>{date}</p></div>
                </div>
            </div>
        </div>
        
    );
}
export default WeatherCard;