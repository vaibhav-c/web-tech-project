import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Home from './Pages/Home/Home';
import { WeatherProvider } from './context/WeatherContext';
import Menubar from './Components/Menubar/Menubar';
import Weather from './Pages/Weather/Weather';
import { Route, BrowserRouter } from 'react-router-dom';
import AnotherCity from './Pages/AnotherCity/AnotherCity';
import Historical from './Pages/Historical Weather/Historical';


class App extends Component {
  render() {
    return (
      <WeatherProvider>
        <BrowserRouter>
        <div className="App">
            <Menubar/>
            <Route exact path = "/" component = {Weather}/>
            <Route exact path = "/home" component = {Home}/>
            <Route exact path = "/weathercity" component = {AnotherCity}/>
            <Route exact path = "/historical" component = {Historical}/>
            
        </div>
        </BrowserRouter>
      </WeatherProvider>
    );
  }
}

export default App;
