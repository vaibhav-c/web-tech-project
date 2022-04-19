import axios from 'axios';
import React, { useState } from 'react';
//import keys from '../../config';
import moment from 'moment';
//import { State } from 'country-state-city';
import LineChart from '../../Components/Charts/LineChart/LineChart';
//import MultiLineChart from '../../Components/Charts/MultiLineChart/MulitLineChart';
import { Spinner } from 'react-bootstrap';
import './Historical.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
//import { WeatherContext } from '../../context/WeatherContext';
import { CgMenuGridO } from 'react-icons/cg';

const Historical = (props) => {
    const [data, setData] = useState({
        weatherHistorical1 : '',
        weatherHistorical2 : '',
        weatherHistorical3 : '',
        //weatherHistorical4 : '',
        dataFetched: false,
        dataComputed: false,
        labels: {
            labelstmin : [],
            labelstmax : [],
            labelsprec : []
        },
        tempmax: [],
        tempmin: [],
        prcp: [],
        chosen: 2
    });

    //let context = useContext(WeatherContext);
    let day = localStorage.getItem("day") === 'true';
    
    //let col = day? "#025d8" : "#5bc0de";

    let colText = day? "black" : "white";

    let colBorder = day? "black": "black";

    let colMin = day? "lightgreen" : "darkgreen";

    let colMax = day? "pink" : "red";

    let colPrec = day? "lightblue" : "darkcyan";

    const link = day? 'https://desktopwalls.net/wp-content/uploads/2015/08/Blue%20Hills%20Forest%20Mist%20Desktop%20Wallpaper.jpg': 'https://raw.githubusercontent.com/Zurkon/weather-geocoding/main/src/assets/blue.jpg';
    document.body.style.backgroundImage =   `url(${link})`;
    let timezone = localStorage.getItem("timezone");
    let today = new Date();
    let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    let minutes = today.getMinutes() < 10? '0' + today.getMinutes() : today.getMinutes(); 
    let time = hours + ":" + minutes;

    let startDate1 = (today.getFullYear() - 10) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    let startDateThere1 = moment.tz((today.getFullYear() - 10) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];
    let endDate1 = (today.getFullYear() - 1) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    let endDateThere1 = moment.tz((today.getFullYear() - 1) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];


    let startDate2 = (today.getFullYear() - 20) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    let startDateThere2 = moment.tz((today.getFullYear() - 20) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];
    let endDate2 = (today.getFullYear() - 11) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    let endDateThere2 = moment.tz((today.getFullYear() - 11) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];



    let startDate3 = (today.getFullYear() - 30) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    let startDateThere3 = moment.tz((today.getFullYear() - 30) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];
    let endDate3 = (today.getFullYear() - 21) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    let endDateThere3 = moment.tz((today.getFullYear() - 21) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];



    //let startDate4 = (today.getFullYear() - 40) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    //let startDateThere4 = moment.tz((today.getFullYear() - 40) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];
    //let endDate4 = (today.getFullYear() - 31) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate());
    //let endDateThere4 = moment.tz((today.getFullYear() - 31) + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + " " + time, moment.tz.guess()).tz(timezone).format().split("T")[0];


    let k = 0;
    let tmin = [];
    let tmax = []
    let prec = [];
    let lbls = {
        tmin : [],
        tmax : [],
        prec : [] 
    }
    if(data.weatherHistorical1 === '' && k === 0) {
        var options1 = {
            method: 'GET',
            url: 'https://meteostat.p.rapidapi.com/point/daily',
            params: {
                lat: localStorage.getItem("latitude"),
                lon: localStorage.getItem("longitude"),
                start: timezone === undefined? startDate3 : startDateThere3,
                end: timezone === undefined? endDate3 : endDateThere3,
                model: 'true'
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDXKEY,
                'x-rapidapi-host': 'meteostat.p.rapidapi.com'
            }
        };

        var options2 = {
            method: 'GET',
            url: 'https://meteostat.p.rapidapi.com/point/daily',
            params: {
                lat: localStorage.getItem("latitude"),
                lon: localStorage.getItem("longitude"),
                start: timezone === undefined? startDate2 : startDateThere2,
                end: timezone === undefined? endDate2 : endDateThere2,
                model: 'true'
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDXKEY,
                'x-rapidapi-host': 'meteostat.p.rapidapi.com'
            }
        };

        var options3 = {
            method: 'GET',
            url: 'https://meteostat.p.rapidapi.com/point/daily',
            params: {
                lat: localStorage.getItem("latitude"),
                lon: localStorage.getItem("longitude"),
                start: timezone === undefined? startDate1 : startDateThere1,
                end: timezone === undefined? endDate1 : endDateThere1,
                model: 'true'
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDXKEY,
                'x-rapidapi-host': 'meteostat.p.rapidapi.com'
            }
        };

        /*var options4 = {
            method: 'GET',
            url: 'https://meteostat.p.rapidapi.com/point/daily',
            params: {
                lat: localStorage.getItem("latitude"),
                lon: localStorage.getItem("longitude"),
                start: timezone === undefined? startDate4 : startDateThere4,
                end: timezone === undefined? endDate4 : endDateThere4,
                model: 'true'
            },
            headers: {
                'x-rapidapi-key': process.env.RAPIDXKEY,
                'x-rapidapi-host': 'meteostat.p.rapidapi.com'
            }
        };*/

        let request1 = axios.request(options1);
        let request2 = axios.request(options2);
        let request3 = axios.request(options3);
        //let request4 = axios.request(options4);

        axios.all([request1, request2, request3])
            .then(axios.spread((...responses) => {
                setData({
                    ...data,
                    weatherHistorical1: responses[0].data.data,
                    weatherHistorical2: responses[1].data.data,
                    weatherHistorical3: responses[2].data.data,
                    //weatherHistorical4: responses[3].data.data,
                    dataFetched: true,
                });
                k = 1;
        })).catch(function (error) {
            console.error(error);
        });

        /*axios.request(options).then(function (response) {
            setData({
                ...data,
                weatherHistorical: response.data.data,
                dataFetched: true,
            });
            k = 1;
        }).catch(function (error) {
            console.error(error);
        });*/
    }

    if(data.dataFetched && !data.dataComputed) {
        let dateToChoose = timezone === undefined? startDate3 : startDateThere3;
        for(let i = 0; i < data.weatherHistorical1.length; i++) {
            //console.log(data.weatherHistorical[i]);
            if(data.weatherHistorical1[i].date.indexOf(dateToChoose.substring(4)) !== -1) {
                
                if(data.weatherHistorical1[i].tmin !== null) {
                    lbls.tmin.push(data.weatherHistorical1[i].date);
                    tmin.push(data.weatherHistorical1[i].tmin);
                }

                if(data.weatherHistorical1[i].tmax !== null) {
                    lbls.tmax.push(data.weatherHistorical1[i].date);
                    tmax.push(data.weatherHistorical1[i].tmax);
                }
                
                if(data.weatherHistorical1[i].prcp !== null) {
                    lbls.prec.push(data.weatherHistorical1[i].date);
                    prec.push(data.weatherHistorical1[i].prcp);
                }
            }
            if(i === data.weatherHistorical1.length - 1) {
                setData({
                    ...data,
                    tempmin: tmin,
                    tempmax: tmax,
                    prcp: prec,
                    labels: {
                        labelstmin : lbls.tmin,
                        labelstmax : lbls.tmax,
                        labelsprec : lbls.prec
                    }
                })
            }
        }
        for(let i = 0; i < data.weatherHistorical2.length; i++) {
            //console.log(data.weatherHistorical[i]);
            if(data.weatherHistorical2[i].date.indexOf(dateToChoose.substring(4)) !== -1) {

                if(data.weatherHistorical2[i].tmin !== null) {
                    lbls.tmin.push(data.weatherHistorical2[i].date);
                    tmin.push(data.weatherHistorical2[i].tmin);
                }
                
                if(data.weatherHistorical2[i].tmax !== null) {
                    lbls.tmax.push(data.weatherHistorical2[i].date);
                    tmax.push(data.weatherHistorical2[i].tmax);
                }
                
                if(data.weatherHistorical2[i].prcp !== null) {
                    lbls.prec.push(data.weatherHistorical2[i].date);
                    prec.push(data.weatherHistorical2[i].prcp);
                }
            }
            if(i === data.weatherHistorical2.length - 1) {
                setData({
                    ...data,
                    tempmin: tmin,
                    tempmax: tmax,
                    prcp: prec,
                    labels: {
                        labelstmin : lbls.tmin,
                        labelstmax : lbls.tmax,
                        labelsprec : lbls.prec
                    }
                })
            }
        }
        for(let i = 0; i < data.weatherHistorical1.length; i++) {
            //console.log(data.weatherHistorical[i]);
            if(data.weatherHistorical3[i].date.indexOf(dateToChoose.substring(4)) !== -1) {
                
                if(data.weatherHistorical3[i].tmin !== null) {
                    lbls.tmin.push(data.weatherHistorical3[i].date);
                    tmin.push(data.weatherHistorical3[i].tmin);
                }
                
                if(data.weatherHistorical3[i].tmax !== null) {
                    lbls.tmax.push(data.weatherHistorical3[i].date);
                    tmax.push(data.weatherHistorical3[i].tmax);
                }
                
                if(data.weatherHistorical3[i].prcp !== null) {
                    lbls.prec.push(data.weatherHistorical3[i].date);
                    prec.push(data.weatherHistorical3[i].prcp);
                }
            }
            if(i === data.weatherHistorical3.length - 1) {
                setData({
                    ...data,
                    dataComputed: true,
                    tempmin: tmin,
                    tempmax: tmax,
                    prcp: prec,
                    labels: {
                        labelstmin : lbls.tmin,
                        labelstmax : lbls.tmax,
                        labelsprec : lbls.prec
                    }
                })
            }
        }
        /*for(let i = 0; i < data.weatherHistorical4.length; i++) {
            if(data.weatherHistorical4[i].date.indexOf(dateToChoose.substring(4)) !== -1) {
                lbls.push(data.weatherHistorical4[i].date);
                tmin.push(data.weatherHistorical4[i].tmin);
                tmax.push(data.weatherHistorical4[i].tmax);
                prec.push(data.weatherHistorical4[i].prcp);
            }
            if(i === data.weatherHistorical4.length - 1) {
                setData({
                    ...data,
                    dataComputed: true,
                    tempmin: tmin,
                    tempmax: tmax,
                    prcp: prec,
                    labels: lbls
                })
            }
        }*/
    }

   let menuComponent = (
        <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
            <Container className = "container1">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" style = {{borderColor: colBorder, borderWidth: "3px", color: "transparent"}}><CgMenuGridO type = "solid" size = "30" color = {colBorder}/></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav" style = {{borderColor: colBorder, borderWidth: "3px", color: "transparent"}}>
                    <Nav className="justify-content-end" >
                        <Nav.Item>
                            <Nav.Link style = {{color: colText}}><button type ="button" className = {day? "btn btn-primary me-5" : "btn btn-primary me-6" } style = {{ color: colText, borderWidth: "3px", borderColor : colBorder}} onClick = {() => {setData({...data, chosen: 2})}}>Minimum Temperature</button></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style = {{color: colText}}><button type ="button" className = {day? "btn btn-primary me-5" : "btn btn-primary me-6" } style = {{ color: colText, borderWidth: "3px", borderColor : colBorder}} onClick = {() => {setData({...data, chosen: 3})}}>Maximum Temperature</button></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style = {{color: colText}}><button type ="button" className = {day? "btn btn-primary me-5" : "btn btn-primary me-6" } style = {{ color: colText, borderWidth: "3px", borderColor : colBorder}} onClick = {() => {setData({...data, chosen: 1})}}>Precipitation</button></Nav.Link>
                        </Nav.Item>
                    </Nav>    
                </Navbar.Collapse>
            </Container>
        </Navbar>
   );

    return (
        data.dataComputed? (
            <div>
                {menuComponent}
                {data.chosen === 3 ? (<LineChart labels = {data.labels.labelstmax} data = {data.tempmax} title = "Data for past 30 years" text = "Maximum Temperature (in &#176;C)" bgColor = {colMax}/>)
                : (data.chosen === 2? (<LineChart labels = {data.labels.labelstmin} data = {data.tempmin} title = "Data for past 30 years" text = "Minimum Temperature (in &#176;C)" bgColor = {colMin}/>)
                : (<LineChart labels = {data.labels.labelsprec} data = {data.prcp} title = "Data for past 30 years" text = "Precipitation (in mm)" bgColor = {colPrec}/>))}
            </div>
        ) : <Spinner animation = "grow" variant = {day? "dark": "light"}/>
    );
}

export default Historical;