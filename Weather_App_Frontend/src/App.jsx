import {useState} from 'react'
import Leftmenu from "./components/Leftmenu";
import RightSection from "./components/RightSection";
import "./App.css";

function App() {
  const [getData, setGetData] = useState();
  const receiveData = (data) => {
    setGetData(data);
  }

  console.log(getData);
  return (
    <div
      className=" w-full h-screen pt-[7rem] bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/storm-clouds_1122-2747.jpg?t=st=1720645629~exp=1720649229~hmac=8529b63099306477fc1c2efb5771f86a69456f7cc4204bcd4486e6a4adb9c8e4&w=1380')`,
      }}
    >
      <div className="w-full h-full bg-black absolute top-0 opacity-45"></div>
      <div className="main-render max-w-[70%] h-[90%] m-auto bg-transparent rounded-2xl p-[1rem]">
        <div className="w-full h-full bg-cover bg-center rounded-2xl flex flex-wrap px-[2rem] py-[2.5rem] gap-[2.5rem]"
        style={{
          backgroundImage:`url()`
        }}>
          <Leftmenu locData = {receiveData}/>
          <RightSection showLocdata = {getData}/>
        </div>
      </div>
    </div>
  );
}

export default App;
