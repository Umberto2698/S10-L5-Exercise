import { useState } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import Weather from "./Weather";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [display, setDisplay] = useState(false);

  const geoEndpoint = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const currentWeatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat=";
  const forecastWeatherEndopoint = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  const auth = "9a2debc8efc216b86197817b5ca361af";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    setDisplay(true);
    setCurrentWeather(null);
    e.preventDefault();
    try {
      const geoResponse = await fetch(geoEndpoint + query + "&appid=" + auth);
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();

        const lat = geoData[0].lat;
        const lon = geoData[0].lon;

        try {
          const currentWeatherResponse = await fetch(
            currentWeatherEndpoint + lat + "&lon=" + lon + "&units=metric&appid=" + auth
          );
          if (currentWeatherResponse.ok) {
            const currentWeatherData = await currentWeatherResponse.json();
            try {
              const forecastWeatherResponse = await fetch(
                forecastWeatherEndopoint + lat + "&lon=" + lon + "&units=metric&appid=" + auth
              );
              if (forecastWeatherResponse.ok) {
                const forecastWeatherData = await forecastWeatherResponse.json();
                setForecastWeather(forecastWeatherData);
                setCurrentWeather(currentWeatherData);
                setDisplay(false);
              } else {
                alert("Error fetching results");
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
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {currentWeather && <Weather currentWeather={currentWeather} forecastWeather={forecastWeather}></Weather>}
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
