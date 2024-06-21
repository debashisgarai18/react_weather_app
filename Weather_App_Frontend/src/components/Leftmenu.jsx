import { useState } from "react";
import PropTypes from 'prop-types';

const Leftmenu = ({sendData}) => {
  const [locName, setlocName] = useState("");
  const [globalLocArray, setglobaLocArray] = useState([{}]);

  const apiKey = import.meta.env.VITE_API_KEY; 

  const handleAddCityClick = async () => {

    // checks
    if(locName === '') {
        alert('Location Name cannot be Empty!!');
        return;
    }
    if(globalLocArray.includes(locName)){
        alert("This location is already present!!");
        return;
    }
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locName}&limit=1&appid=${apiKey}`);
    const resData = await res.json();
    if(resData.length === 0) {
        alert("Enter correct location name");
        return ;
    }

    // object carrying the location details
    const toBePushed = {
      locationName : locName,
      latitude : resData[0].lat,
      longitude : resData[0].lon
    }

    setglobaLocArray([...globalLocArray, toBePushed]);
    setlocName("");
    sendData(globalLocArray);
  };

  return (
    <div className="w-[25%] h-full bg-transparent backdrop-blur-lg shadow-lg shadow-neutral-900 rounded-lg px-[0.75rem] py-[2rem] flex flex-col gap-[2rem]">
      <div className="input w-full h-fit flex flex-col flex-wrap gap-[1rem]">
        <input
          type="text"
          className="w-full h-[4rem] rounded-md text-3xl px-2 focus:outline-none focus:border-none"
          onChange={(e) => setlocName((e.target.value).toLowerCase())}
          value={locName}
        />
        <button
          className="w-full h-[3rem] bg-cyan-400 text-2xl rounded-md font-semibold uppercase hover:bg-cyan-500 focus:border-2 focus:border-white"
          onClick={handleAddCityClick}
        >
          Add City
        </button>
      </div>
      <div className="w-full h-[80%]">
        <div className="text-3xl text-center py-[0.5rem] uppercase text-white/90 font-bold tracking-wide">
          Added Cities
        </div>
        <div className="w-full h-[88%] rounded-md overflow-y-auto hide-scrollbar flex gap-[0.75rem] flex-col py-[0.5rem]">
          {globalLocArray.map((e, idx) => {
            return (
              <div
                key={idx}
                className="w-full py-[0.5rem] text-2xl bg-red-700 text-white rounded-md px-[0.3rem] cursor-pointer flex flex-row justify-between"
              >
                <div className="h-full w-[60%]">{e}</div>
                <button className="h-full w-[35%] bg-blue-300 text-lg rounded-md cursor-pointer">
                  Show Data
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Leftmenu.propTypes = {
  sendData : PropTypes.any,
};
export default Leftmenu;
