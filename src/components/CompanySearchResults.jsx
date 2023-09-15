import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import List from "./List";

const CompanySearchResults = () => {
  const [forecastWeather, setForecastWeather] = useState([]);
  const [today, setToday] = useState("");

  const params = useParams();

  const forecastWeatherEndopoint = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  const auth = "9a2debc8efc216b86197817b5ca361af";

  useEffect(() => {
    getWeather();
    if (params.day === "Sun.") {
      setToday("Sunday");
    } else if (params.day === "Mon.") {
      setToday("Monday");
    } else if (params.day === "Tue.") {
      setToday("Tuesday");
    } else if (params.day === "Wed.") {
      setToday("Wednesday");
    } else if (params.day === "Thu.") {
      setToday("Thursday");
    } else if (params.day === "Fri.") {
      setToday("Friday");
    } else if (params.day === "Sat.") {
      setToday("Saturday");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWeather = async () => {
    try {
      const response = await fetch(
        forecastWeatherEndopoint + params.lat + "&lon=" + params.lon + "&units=metric&appid=" + auth
      );
      if (response.ok) {
        const data = await response.json();
        setForecastWeather(data.list);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="w-100">
        <Col className="my-3 text-center">
          <h1 className="display-4 mb-4">Weather for {today} </h1>
          {forecastWeather
            .filter((elem) => new Date(elem.dt * 1000).getDay() === Number.parseInt(params.num))
            .map((elem, i) => (
              <List elem={elem} key={i}></List>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
