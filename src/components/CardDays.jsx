import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardDays = ({ elem, forecastWeather }) => {
  return (
    <Col>
      <Link to={`/${forecastWeather.city.coord.lat}/${forecastWeather.city.coord.lon}/${elem.num}/${elem.day}`}>
        <div className="d-flex flex-column align-items-center bg-white mb-2 p-2 border ">
          <p className="mb-0">{elem.day}</p>
        </div>
      </Link>
    </Col>
  );
};

export default CardDays;
