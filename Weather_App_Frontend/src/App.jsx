import {useState} from 'react'
import Leftmenu from "./components/Leftmenu";
import RightSection from "./components/RightSection";
import "./App.css";
import { FaTowerBroadcast } from "react-icons/fa6";

function App() {
  const [getData, setGetData] = useState({});
  const receiveData = (data) => {
    setGetData(data);
  }

  // TODO : Accept the data here from the left section and call the API here only instead o RightSection (update)
  // TODO (contd.) : doing this coz while clicking in one of the other 5 days it should yield the specifc data for that day.

  return (
    <div
      className=" w-full h-screen pt-[7rem] bg-cover bg-center relative bg-[#353535]"
    >
      <div className='max-w-[60%] m-auto text-white text-5xl font-semibold tracking-wider flex items-center flex-row gap-[1.23rem]'>
        <FaTowerBroadcast />
        <div>Weather Forecast</div>
      </div>
      <div className="w-full h-full bg-black absolute top-0 opacity-45"></div>
      <div className="main-render max-w-[70%] h-[90%] m-auto bg-transparent rounded-2xl p-[1rem]">
        <div className="w-full h-full bg-cover bg-center rounded-2xl flex flex-wrap px-[2rem] py-[2.5rem] gap-[2.5rem]">
          <Leftmenu locData = {receiveData}/>
          <RightSection showLocdata = {getData}/>
        </div>
      </div>
    </div>
  );
}

export default App;
