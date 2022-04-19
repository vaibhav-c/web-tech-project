import './Weather.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherCard from '../../Components/WeatherCard/WeatherCard';
import { Component } from 'react';
//import keys from '../../config';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import ForecastCard from '../../Components/ForecastCard/ForecastCard';
import { Redirect } from 'react-router';


class Weather extends Component {
  state = {
    city: "",
    country: "",
    error: false,
    lat: null,
    long: null,
    dataFetched: false,
    forecast: [],
    today: '', 
    errorLat: true
  }
  
  getCity(lat, long){
    //console.log(process.env);
    var xhr = new XMLHttpRequest();
    //console.log(lat + " " + long);
    xhr.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEOLOCATION}&lat=` + lat + "&lon=" + long + "&format=json", true);
    xhr.send();
    //xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var city = response.address.city;
        var country = response.address.country;
        localStorage.setItem("city", city);
        localStorage.setItem("country", country);
        this.setState({
          ...this.state,
          city: city,
          country: country,
          errorLat: false
        });
      } 
    }, false);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position)=> {
      this.getCity(position.coords.latitude, position.coords.longitude);
      this.setState({
        ...this.state, 
        lat: position.coords.latitude,
        long: position.coords.longitude,
        error: false,
        errorLat: false
      });
      let request1 = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,minutely&appid=${process.env.REACT_APP_OPENWEATHER}&units=metric`);
      let request2 = axios.get(`https://secure.geonames.org/timezoneJSON?lat=${position.coords.latitude}&lng=${position.coords.longitude}&username=${process.env.REACT_APP_USERNAME}`);
      axios.all([request1, request2])
            .then(axios.spread((...responses) => {
                //console.log(responses);
                const response1 = responses[0];
                const response2 = responses[1];
                var parts = response2.data.time.split(" ")[0].split("-");
                var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
                localStorage.setItem("latitude", this.state.lat);
                localStorage.setItem("longitude", this.state.long);
                localStorage.setItem("timezone", response2.data.timezoneId);
                const days = {
                    Mon : "Monday",
                    Tue : "Tuesday",
                    Wed : "Wednesday",
                    Thu : "Thursday",
                    Fri : "Friday",
                    Sat : "Saturday",
                    Sun : "Sunday"
                }
                this.setState({
                    ...this.state,
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
                });
            }))
            .catch((err) => {
                this.setState({
                    ...this.state,
                    error: true,
                    errorLat: true
                })
            });
    }, () => {this.setState({...this.state, error: true, errorLat: true})})
  }

  render() {
    let val = 0;
    return (
    <div>
        {(this.state.errorLat && this.state.dataFetched) ||(this.state.errorLat && this.state.error)? <Redirect to ="/home"/> : (this.state.dataFetched && this.state.today !== ''? 
        <div>
            <WeatherCard lat = {this.state.lat} long = {this.state.long} city = {this.state.city} country = {this.state.country} today = {this.state.today}/>
            <Carousel>
                {this.state.dataFetched? this.state.forecast.map((day) => { val = val + 1; return <ForecastCard key = {val} day = {day} timezone = {this.state.today.timezone} />}) : <Spinner animation = "grow"/>}
            </Carousel>
            <button type ="button" className = "btn btn-primary me-7" style = {{ color: "black", borderWidth: "3px", borderColor : "black"}} onClick = {() => {window.location.replace('/historical');}}>Check Historical Weather</button>
        </div> : <Spinner/>)}
    </div>
    );
  }
}

export default Weather;
