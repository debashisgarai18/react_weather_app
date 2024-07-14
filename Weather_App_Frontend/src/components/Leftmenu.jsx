import { useState } from "react";
import PropTypes from "prop-types";
import { CiCircleList } from "react-icons/ci";
import { MdMyLocation } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";

const Leftmenu = ({ locData }) => {
  const [locName, setlocName] = useState("");
  const [globalLocArray, setglobaLocArray] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleAddCityClick = async () => {
    // checks
    if (locName === "") {
      alert("Location Name cannot be Empty!!");
      setlocName("");
      return;
    }

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${locName}&limit=1&appid=${apiKey}`
    );
    const resData = await res.json();
    if (resData.length === 0) {
      alert("Enter correct location name");
      setlocName("");
      return;
    }

    if (globalLocArray) {
      const findName = globalLocArray.map((elem) => elem.locationName);
      if (findName.includes(resData[0].name)) {
        alert("This location is already present!!");
        setlocName("");
        return;
      }
    }

    // object carrying the location details
    const toBePushed = {
      locationName: resData[0].name,
      latitude: resData[0].lat,
      longitude: resData[0].lon,
    };

    setglobaLocArray([...globalLocArray, toBePushed]);
    setlocName("");
  };

  // function to show the data on clicking "show data"
  // passing the specific data to the main app.js
  const showData = (locName, latitude, longitude) => {
    const passData = {
      name: locName,
      lat: latitude,
      long: longitude,
    };
    locData(passData);
  };

  return (
    <div className="w-[25%] h-full bg-transparent backdrop-blur-lg shadow-md shadow-neutral-900 rounded-lg px-[0.75rem] py-[2rem] flex flex-col gap-[2rem]">
      <div className="input w-full h-fit flex flex-col flex-wrap gap-[1rem]">
        <input
          type="text"
          className="w-full h-[4rem] rounded-md text-2xl px-2 focus:outline-none focus:border-none"
          onChange={(e) => setlocName(e.target.value.toLowerCase())}
          value={locName}
        />
        <button
          className="w-full h-[3rem] bg-gradient-to-r from-[#545555] via-[#303238] to-[#232327] text-2xl text-white rounded-md tracking-wide capitalise hover:scale-105  focus:border-[1px] focus:border-white shadow-md border-[1px] border-white"
          onClick={handleAddCityClick}
        >
          Add City
        </button>
      </div>
      <div className="w-full h-[80%]">
        <div className="text-2xl py-[0.5rem] capitalize text-white/90 tracking-wide flex flex-row items-center gap-[0.3rem]">
          <div>
            <CiCircleList />
          </div>
          <div>Locations</div>
        </div>
        <div className="w-full h-[88%] rounded-md overflow-y-auto hide-scrollbar flex flex-col py-[0.5rem] gap-[0.2rem]">
          {globalLocArray.length !== 0 ? (
            globalLocArray.map((e, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full py-[0.3rem] text-white rounded-md px-[0.5rem] cursor-pointer flex flex-row justify-between items-center gap-[0.5rem] border-[0.4px] border-white/30 hover:bg-white/20 hover:text-white"
                >
                  <div className="text-sm">
                    <MdMyLocation />
                  </div>
                  <div className="h-full w-[60%] text-xl">{e.locationName}</div>
                  <button
                    className="h-full w-fit px-[0.5rem] text-xl rounded-md cursor-pointer tracking-wide hover:scale-105 focus:scale-105"
                    onClick={() =>
                      showData(e.locationName, e.latitude, e.longitude)
                    }
                  >
                    <FaArrowRightLong />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-white w-full text-center">No city names are present</div>
          )}
        </div>
      </div>
    </div>
  );
};

Leftmenu.propTypes = {
  locData: PropTypes.func.isRequired,
};
export default Leftmenu;
