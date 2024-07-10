import PropTypes from "prop-types";
import { IoLocationOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";

const RightSection = ({ showLocdata }) => {
  return (
    <>
        <div className="w-[70%] h-full bg-transparent backdrop-blur-lg shadow-md shadow-neutral-900 rounded-lg px-[0.75rem] py-[2rem] flex justify-center items-center">
      {!showLocdata ? (
          <div className="w-[90%] h-[95%] flex flex-row justify-center items-center relative">
            <div className="overlay-left w-[50%] h-full absolute left-0 rounded-[2rem] opacity-20 bg-cover bg-center"
            style={{
              backgroundImage : `url('https://images.pexels.com/photos/50677/rain-after-the-rain-a-drop-of-drop-of-rain-50677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`
            }}></div>
            <div className="left-info w-[50%] h-full rounded-[2rem] bg-gradient-to-b from-[#545555] via-[#303238] to-[#080809] flex flex-col justify-between py-[3rem] px-[1.5rem]"
            >
              <div className="w-full h-[25%] flex flex-col gap-[0.75rem]">
                <div className="w-full text-5xl font-bold text-white">Tuesday</div>
                <div className="w-full text-2xl font-semibold text-white">11 July 2024</div>
                <div className="w-full flex flex-row items-center text-xl font-semibold text-white gap-[0.5rem]">
                  <div><IoLocationOutline /></div>
                  <div>Kolkata, IN</div>
                </div>
              </div>
              <div className="w-full h-[40%] flex flex-col gap-[0.75rem]">
                <div className="text-7xl w-full font-bold text-white"><FiSun /></div>
                <div className="w-full text-5xl font-bold text-white">29 &deg;C</div>
                <div className="text-3xl font-semibold text-white">Sunny</div>
              </div>
            </div>
            <div className="right-info w-[50%] h-[90%] bg-[#222831] rounded-e-[2rem] flex flex-col justify-around px-[1rem] py-[1rem]">
              <div className="top w-full h-[25%] px-[1rem] flex flex-col gap-[0.5rem]">
                <div className="flex flex-row justify-between text-2xl text-white uppercase font-semibold tracking-wide">
                  <div>precipitation</div>
                  <div>0%</div>
                </div>
                <div className="flex flex-row justify-between text-2xl text-white uppercase font-semibold tracking-wide">
                  <div>Humidity</div>
                  <div>42%</div>
                </div>
                <div className="flex flex-row justify-between text-2xl text-white font-semibold tracking-wide">
                  <div className="uppercase">wind</div>
                  <div className="lowecase">3 km/h</div>
                </div>
              </div>
              <div className="mid w-full h-[25%] bg-red-300"></div>
              <div className="low w-full h-[25%] bg-red-300"></div>
            </div>
          </div>
      ) : (
        <div className="w-full h-full font-bold text-5xl text-center text-white">No data to be shown</div>
      )}
      </div>
    </>
  );
};

RightSection.propTypes = {
  showLocdata: PropTypes.object.isRequired,
};
export default RightSection;
