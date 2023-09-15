import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import Weather from "./Weather";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastWeather, setForecastWeather] = useState([]);
  const [display, setDisplay] = useState(false);

  const geoEndpoint = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const currentWeatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat=";
  const forecastWeatherEndopoint = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  const auth = "9a2debc8efc216b86197817b5ca361af";
  const previousSearch = localStorage.getItem("searched");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  let lat = [];
  let lon = [];
  let forecasterWeatherArray = [];
  let currentWeatherArray = [];

  const mainFetch = async (str) => {
    setDisplay(true);
    try {
      const geoResponse = await fetch(geoEndpoint + str + "&limit=5&appid=" + auth);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        for (let i = 0; i < geoData.length; i++) {
          lat.push(geoData[i].lat);
          lon.push(geoData[i].lon);
        }

        try {
          for (let i = 0; i < lat.length; i++) {
            const currentWeatherResponse = await fetch(
              currentWeatherEndpoint + lat[i] + "&lon=" + lon[i] + "&units=metric&appid=" + auth
            );
            if (currentWeatherResponse.ok) {
              const currentWeatherData = await currentWeatherResponse.json();
              try {
                const forecastWeatherResponse = await fetch(
                  forecastWeatherEndopoint + lat[i] + "&lon=" + lon[i] + "&units=metric&appid=" + auth
                );
                if (forecastWeatherResponse.ok) {
                  const forecastWeatherData = await forecastWeatherResponse.json();
                  forecasterWeatherArray.push(forecastWeatherData);
                  currentWeatherArray.push(currentWeatherData);
                  setForecastWeather(forecasterWeatherArray);
                  setCurrentWeather(currentWeatherArray);
                } else {
                  alert("Error fetching results ");
                }
              } catch (error) {
                console.log(error);
              }
            } else {
              alert("Error fetching results 1");
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
    setDisplay(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("searched", `${query}`);
    console.log(previousSearch);
    mainFetch(query);
  };

  useEffect(() => {
    if (previousSearch !== "") {
      mainFetch(previousSearch);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">React Weather App</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form className="flex-grow-1 me-2" onSubmit={handleSubmit}>
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="City, State, Country" />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {!display &&
            currentWeather.map((elem, i) => (
              <Weather currentWeather={elem} forecastWeather={forecastWeather[i]} key={i}></Weather>
            ))}
          {display && (
            <div className="w-100 text-center mt-5">
              <Spinner animation="grow" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
