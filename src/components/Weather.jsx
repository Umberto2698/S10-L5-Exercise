import { Row, Col } from "react-bootstrap";
import { Circle, Wind, CloudRain, Droplet } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import CardDays from "./CardDays";

const Weather = ({ currentWeather, forecastWeather }) => {
  const [logo, setLogo] = useState(null);
  const [today, setToday] = useState([]);

  const fetchWeatherLogo = async () => {
    try {
      const logoResponse = await fetch(
        "https://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + "@2x.png"
      );
      if (logoResponse.ok) {
        setLogo(logoResponse.url);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherLogo();
    const dayOfTheWeek = new Date(forecastWeather.list[0].dt * 1000).getDay();
    if (dayOfTheWeek === 0) {
      setToday([
        { day: "Sun.", num: 0 },
        { day: "Mon.", num: 1 },
        { day: "Tue.", num: 2 },
        { day: "Wed.", num: 3 },
        { day: "Thu.", num: 4 },
      ]);
    } else if (dayOfTheWeek === 1) {
      setToday([
        { day: "Mon.", num: 1 },
        { day: "Tue.", num: 2 },
        { day: "Wed.", num: 3 },
        { day: "Thu.", num: 4 },
        { day: "Fri.", num: 5 },
      ]);
    } else if (dayOfTheWeek === 2) {
      setToday([
        { day: "Tue.", num: 2 },
        { day: "Wed.", num: 3 },
        { day: "Thu.", num: 4 },
        { day: "Fri.", num: 5 },
        { day: "Sat.", num: 6 },
      ]);
    } else if (dayOfTheWeek === 3) {
      setToday([
        { day: "Wed.", num: 3 },
        { day: "Thu.", num: 4 },
        { day: "Fri.", num: 5 },
        { day: "Sat.", num: 6 },
        { day: "Sun.", num: 0 },
      ]);
    } else if (dayOfTheWeek === 4) {
      setToday([
        { day: "Thu.", num: 4 },
        { day: "Fri.", num: 5 },
        { day: "Sat.", num: 6 },
        { day: "Sun.", num: 0 },
        { day: "Mon.", num: 1 },
      ]);
    } else if (dayOfTheWeek === 5) {
      setToday([
        { day: "Fri.", num: 5 },
        { day: "Sat.", num: 6 },
        { day: "Sun.", num: 0 },
        { day: "Mon.", num: 1 },
        { day: "Tue.", num: 2 },
      ]);
    } else if (dayOfTheWeek === 6) {
      setToday([
        { day: "Sat.", num: 6 },
        { day: "Sun.", num: 0 },
        { day: "Mon.", num: 1 },
        { day: "Tue.", num: 2 },
        { day: "Wed.", num: 3 },
      ]);
    }
  }, []);
  return (
    <div className="d-flex flex-column align-items-center mt-4 py-2 weatherCard">
      <div className="text-center">
        <img id="weatherLogo" src={logo} alt="" />
      </div>
      <div className="text-center mb-1">
        <div>
          <p className="display-1 d-inline-block position-relative">
            {currentWeather.main.temp}
            <Circle
              className="position-absolute"
              style={{ width: "10px", height: "10px", top: "7px", right: "-14px" }}
            ></Circle>
          </p>
        </div>
        <h5 className="m-0">
          {currentWeather.name}, {currentWeather.sys.country}
        </h5>
        <h5>{currentWeather.weather[0].main} </h5>
      </div>
      <div className="d-flex flex-column align-items-center px-2 w-100">
        <Row className="w-100 mt-2">
          <Col xs={4}>
            <div className="d-flex flex-column align-items-center bg-white p-2 ">
              <p className="mb-1 text-primary display-5">{currentWeather.wind.speed}</p>
              <div className="mb-1 text-center">
                <Wind style={{ width: "20px", height: "20px" }}></Wind>
              </div>
              <p className="mb-1" style={{ fontSize: "15px" }}>
                Wind Flow
              </p>
            </div>
          </Col>
          <Col xs={4}>
            <div className="d-flex flex-column align-items-center bg-white p-2 ">
              <p className="mb-1 text-primary display-5">{currentWeather.clouds.all}</p>
              <div className="mb-1 text-center">
                <CloudRain style={{ width: "20px", height: "20px" }}></CloudRain>
              </div>
              <p className="mb-1" style={{ fontSize: "15px" }}>
                Precipitation
              </p>
            </div>
          </Col>
          <Col xs={4}>
            <div className="d-flex flex-column align-items-center bg-white p-2 ">
              <p className="mb-1 text-primary display-5">{currentWeather.main.humidity}</p>
              <div className="mb-1 text-center">
                <Droplet style={{ width: "20px", height: "20px" }}></Droplet>
              </div>
              <p className="mb-1" style={{ fontSize: "15px" }}>
                Humidity
              </p>
            </div>
          </Col>
        </Row>
        <Row xs={5} className="w-100 mt-3 g-0">
          {today.map((elem, i) => (
            <CardDays elem={elem} forecastWeather={forecastWeather} key={i}></CardDays>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Weather;
