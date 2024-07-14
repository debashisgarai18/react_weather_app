import PropTypes from "prop-types";
import { IoLocationOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { BsCloudRain } from "react-icons/bs";
import { BsCloudSun } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import OtherDays from "./OtherDays";
import { GoCloudOffline } from "react-icons/go";

// map to store the diff icons for diff weather type
const weatherIconMap = {
  "Rain" : (<BsCloudRain />),
  "Clouds" : (<BsCloudSun />),
  "Clear" : (<FiSun />)
}

const RightSection = ({ showLocdata }) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  // states
  const [mainDay, setMainDay] = useState("");
  const [mainDate, setMainDate] = useState("");
  const [country, setCountry] = useState("");
  const [mainTemp, setMainTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [rainData, setRainData] = useState("");
  const [windSpeed, setWindSpeed] = useState(0);
  const [weatherStatus, setWeatherStatus] = useState("");
  const [weatherIcon, setWeatherIcon] = useState();

  // state to store all the data of the other 4 days
  const [data4days, setData4days] = useState([]);

  const convertUTC2ISt = (utcString) => {
    if (!utcString) return;

    const date = new Date(utcString * 1000);
    if (isNaN(date.getTime())) {
      alert("Invalid date and Invalid Day");
    }

    const dwd = {
      date: date.toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      day: date.toLocaleDateString("en-IN", { weekday: "long" }),
    };
    return dwd;
  };

  const getDatafromAPI = async () => {
    if(!showLocdata.lat && !showLocdata.long){
      return;
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${showLocdata.lat}&lon=${showLocdata.long}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
  
    // console.log(data);

    setMainTemp(data.list[0].main.temp);
    setHumidity(data.list[0].main.humidity);
    // condition to check if the rain parameter is present or not
    data.list[0].rain === undefined ? setRainData("0") :  setRainData(data.list[0].rain["3h"]);
    setCountry(data.city.country);
    setMainDay(convertUTC2ISt(data.list[0].dt).day);
    setMainDate(convertUTC2ISt(data.list[0].dt).date);
    setWindSpeed(String(parseInt(data.list[0].wind.speed) * 18 / 5));
    setWeatherStatus(data.list[0].weather[0].main);
    setWeatherIcon(weatherIconMap[data.list[0].weather[0].main]);
    
    // to set data for the remaining 4 days
    const dataArr = data.list.slice(8, 40).map((e, index) => (index % 8 === 0 ? e : null)).filter(e => e !== null);
    const tempDataArray = [];
    dataArr.map((e) => {
      const dataToBePushed = {
        "date" :  convertUTC2ISt(e.dt).date,
        "day" : convertUTC2ISt(e.dt).day,
        "mainTemp" : e.main.temp,
        "humidity" : e.main.humidity,
        "rain" : e.rain === undefined ? "0" : e.rain["3h"],
        "windSpeed" : e.wind.speed,
        "weatherStatus" : e.weather[0].main,
        "weatherIcon" : weatherIconMap[e.weather[0].main]
      }

      tempDataArray.push(dataToBePushed);
    })

    setData4days(tempDataArray);
  };

  // render it once when the app loads
  useEffect(() => {
    if (showLocdata) getDatafromAPI();
  }, [showLocdata]);

  return (
    <>
      <div className="w-[70%] h-full bg-transparent backdrop-blur-lg shadow-md shadow-neutral-900 rounded-lg px-[0.75rem] py-[2rem] flex justify-center items-center">
        {showLocdata.lat && showLocdata.long ? (
          <div className="w-[90%] h-[95%] flex flex-row justify-center items-center relative">
            <div
              className="overlay-left w-[50%] h-full absolute left-0 rounded-[2rem] opacity-20 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/50677/rain-after-the-rain-a-drop-of-drop-of-rain-50677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
              }}
            ></div>
            <div className="left-info w-[50%] h-full rounded-[2rem] bg-gradient-to-b from-[#545555] via-[#303238] to-[#080809] flex flex-col justify-between py-[3rem] px-[1.5rem]">
              <div className="w-full h-[25%] flex flex-col gap-[0.75rem]">
                <div className="w-full text-5xl font-bold text-white">
                  {mainDay}
                </div>
                <div className="w-full text-2xl font-semibold text-white">
                  {mainDate}
                </div>
                <div className="w-full flex flex-row items-center text-xl font-semibold text-white gap-[0.5rem]">
                  <div>
                    <IoLocationOutline />
                  </div>
                  <div>{showLocdata.name}, {country}</div>
                </div>
              </div>
              <div className="w-full h-[40%] flex flex-col gap-[0.75rem]">
                <div className="text-7xl w-full font-bold text-white">
                 {weatherIcon}
                </div>
                <div className="w-full text-5xl font-bold text-white">
                  {mainTemp} &deg;C
                </div>
                <div className="text-3xl font-semibold text-white">{weatherStatus}</div>
              </div>
            </div>
            <div className="right-info w-[50%] h-[90%] bg-[#222831] rounded-e-[2rem] flex flex-col justify-around px-[1rem] py-[1rem]">
              <div className="top w-full h-[25%] px-[1rem] flex flex-col gap-[0.5rem]">
                <div className="flex flex-row justify-between text-2xl text-white tracking-wide">
                  <div className="font-semibold uppercase">precipitation</div>
                  <div>{rainData}mm</div>
                </div>
                <div className="flex flex-row justify-between text-2xl text-white uppercase tracking-wide">
                  <div className="font-semibold">Humidity</div>
                  <div>{humidity}%</div>
                </div>
                <div className="flex flex-row justify-between text-2xl text-white tracking-wide">
                  <div className="uppercase font-semibold">wind</div>
                  <div className="lowecase">{windSpeed} km/hr</div>
                </div>
              </div>
              <div className="mid w-full h-[30%] flex flex-row gap-[0.1rem]">
                <OtherDays data4days = {data4days} />
              </div>
              <div className="low w-full h-[20%] flex items-center">
                <div className="w-[95%] h-[55%]">
                  <button className="h-full w-full flex items-center justify-center gap-[0.5rem] bg-gradient-to-r from-[#545555] via-[#303238] to-[#232327] text-2xl text-white rounded-md tracking-wide capitalise  focus:border-[1px] focus:border-white shadow-md border-[1px] border-white">
                    <div>
                      <MdDeleteOutline />
                    </div>
                    <div>Delete City</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full font-semibold text-3xl text-white relative">
            <div className="w-[50%] h-[50%] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-row items-center gap-[0.75rem] justify-center">
              <GoCloudOffline />
              <div>No data to be shown</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

RightSection.propTypes = {
  showLocdata: PropTypes.object.isRequired,
};
export default RightSection;
