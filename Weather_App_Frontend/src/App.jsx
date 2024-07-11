import {useState} from 'react'
import Leftmenu from "./components/Leftmenu";
import RightSection from "./components/RightSection";
import "./App.css";

function App() {
  const [getData, setGetData] = useState();
  const receiveData = (data) => {
    setGetData(data);
  }

  return (
    <div
      className=" w-full h-screen pt-[7rem] bg-cover bg-center relative bg-[#353535]"
      // style={{
      //   backgroundImage: `url('https://t4.ftcdn.net/jpg/02/97/35/91/240_F_297359177_7QYu5IDqVWS7coXE41t6vMxcFCe295Z7.jpg')`,
      // }}
    >
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
