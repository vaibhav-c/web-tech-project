import React, { useContext } from 'react';
import './ForecastCard.css';
import Links from '../WeatherCard/Links';
import { WiThermometer, WiThermometerExterior, WiSunrise, WiSunset } from "react-icons/wi";
import { WeatherContext } from '../../context/WeatherContext';
import moment from 'moment-timezone';

const ForecastCard = (props) => {
    //console.log(props.timezone);
    const context = useContext(WeatherContext);
    let col = "black";
    let col1 = context.day? "black" : "white";
    let today = new Date(props.day.dt * 1000);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = days[today.getDay()] + ", " + today.getDate() + " " + month[today.getMonth()] + " " + today.getFullYear();
    //let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    //let minutes = today.getMinutes() < 10? '0' + today.getMinutes() : today.getMinutes(); 
    //let time = hours + ":" + minutes;
    //let timeThere = moment.tz(today.getFullYear() + "-" + (today.getMonth() < 10 ? "0" + today.getMonth() : today.getMonth()) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(props.timezone).format().split("T")[1].split("-")[0];

    let sunrise = new Date(props.day.sunrise * 1000);
    let srhours = sunrise.getHours() < 10 ? '0' + sunrise.getHours() : sunrise.getHours();
    let srminutes = sunrise.getMinutes() < 10? '0' + sunrise.getMinutes() : sunrise.getMinutes(); 
    let srtime = srhours + ":" + srminutes;
    let srtimeThere = moment.tz(today.getFullYear() + "-" + (1 + today.getMonth() < 10 ? "0" + (1 + today.getMonth()) : (1 + today.getMonth())) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + srtime).tz(props.timezone).format().split("T")[1].split("-")[0];

    let sunset = new Date(props.day.sunset * 1000);
    let sshours = sunset.getHours() < 10 ? '0' + sunset.getHours() : sunset.getHours();
    let ssminutes = sunset.getMinutes() < 10? '0' + sunset.getMinutes() : sunset.getMinutes(); 
    let sstime = sshours + ":" + ssminutes;
    let sstimeThere = moment.tz(today.getFullYear() + "-" + (1 + today.getMonth() < 10 ? "0" + (1 + today.getMonth()) : (1 + today.getMonth())) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + sstime).tz(props.timezone).format().split("T")[1].split("-")[0];;
    //console.log(today.getFullYear() + "-" + (1 + today.getMonth() < 10 ? "0" + (1 + today.getMonth()) : (1 + today.getMonth())) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + sstime);
    //console.log(moment.tz(today.getFullYear() + "-" + (1 + today.getMonth() < 10 ? "0" + (1 + today.getMonth()) : (1 + today.getMonth())) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + sstime, moment.tz.guess()).tz(props.timezone).format());
    //console.log(moment.tz("2014-06-01 12:00", moment.tz.guess()).tz(props.timezone).format())
    let condition = Links.day[props.day.weather[0].main];
    if(props.day.weather[0].main === "Clouds") {
        if(props.day.weather[0].description === "few clouds") {
            condition = Links.day[props.day.weather[0].main].fewClouds;
        } else if(props.day.weather[0].description === "scattered clouds") {
            condition = Links.day[props.day.weather[0].main].scatteredClouds;
        } else if(props.day.weather[0].description === "broken clouds") {
            condition = Links.day[props.day.weather[0].main].brokenClouds;
        } else if(props.day.weather[0].description === "overcast clouds") {
            condition = Links.day[props.day.weather[0].main].overcastClouds;
        }
    }
    //condition = 
    return (
        <div className="container-fluid px-1 px-md-4 py-5 mx-auto">
            <h3 style = {{color: col1}}>Weather Forecast</h3>
            <div className="row d-flex justify-content-center px-3">
                <div className= "card-forecast" style = {{backgroundImage: `url(${condition})`}}>
                    <p className="ml-auto mr-4 mb-0 large-font-forecast" style = {{fontWeight: 'bold', color: col, textTransform: 'capitalize'}}>{props.day.weather[0].description}</p>
                    <div className="time-font-forecast mb-0 ml-4 mt-auto" style = {{fontWeight: 'bold', color: col}}><WiThermometerExterior size = "50px" color = {col} />{props.day.temp.min.toFixed(1)}&#176;C <WiThermometer size = "50px" color = {col}/>{props.day.temp.max.toFixed(1)}&#176;C</div>
                    <p className="ml-4 mb-4" style = {{fontWeight: 'bold', color: col}}>{date}</p>
                    <p className="ml-4 mb-4" style = {{fontWeight: 'bold', color: col}}><WiSunrise size = "60px" color = "black"/>{srtimeThere.substring(0, 5)}<WiSunset size = "60px" color = "black"/>{sstimeThere.substring(0, 5)}</p>
                </div>
            </div>
        </div>
        
    );
}
export default ForecastCard;
