import { useState, useEffect } from "react";
import { Circle, CloudRain, Droplet, Wind } from "react-bootstrap-icons";

const List = ({ elem }) => {
  const [logo, setLogo] = useState(null);

  const fetchWeatherLogo = async () => {
    try {
      const logoResponse = await fetch("https://openweathermap.org/img/wn/" + elem.weather[0].icon + "@2x.png");
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
  }, []);

  return (
    <div className="d-flex p-2 my-3 align-items-center justify-content-between w-100 border weatherCard">
      <div className="d-flex flex-column p-2 my-2 align-items-center" style={{ width: "130px" }}>
        <div className="d-flex align-items-center">
          <div className="text-center">
            <img id="forecastLogo" src={logo} alt="" />
          </div>
          <div>
            <p className="d-inline-block position-relative mb-0">
              {elem.main.temp}
              <Circle
                className="position-absolute"
                style={{ width: "6px", height: "6px", top: "2px", right: "-8px" }}
              ></Circle>
            </p>
          </div>
        </div>
        <div>
          <p className="mb-1" style={{ fontSize: "15px" }}>
            {elem.weather[0].description}
          </p>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center bg-white p-2 ">
        <p className="mb-1 text-primary ">{elem.wind.speed}</p>
        <div className="mb-1 text-center">
          <Wind style={{ width: "20px", height: "20px" }}></Wind>
        </div>
        <p className="mb-1" style={{ fontSize: "15px" }}>
          Wind Flow
        </p>
      </div>
      <div className="d-flex flex-column align-items-center bg-white p-2 ">
        <p className="mb-1 text-primary ">{elem.clouds.all}</p>
        <div className="mb-1 text-center">
          <CloudRain style={{ width: "20px", height: "20px" }}></CloudRain>
        </div>
        <p className="mb-1" style={{ fontSize: "15px" }}>
          Precipitation
        </p>
      </div>
      <div className="d-flex flex-column align-items-center bg-white p-2 ">
        <p className="mb-1 text-primary ">{elem.main.humidity}</p>
        <div className="mb-1 text-center">
          <Droplet style={{ width: "20px", height: "20px" }}></Droplet>
        </div>
        <p className="mb-1" style={{ fontSize: "15px" }}>
          Humidity
        </p>
      </div>

      <div>
        <p className="mb-0 pe-2">{elem.dt_txt.split(" ")[1]}</p>
      </div>
    </div>
  );
};

export default List;
