import Leftmenu from "./components/Leftmenu";
import RightSection from "./components/RightSection";
import "./App.css";

function App() {
  return (
    <div
      className=" w-full h-screen pt-[7rem] bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full h-full bg-black absolute top-0 opacity-65"></div>
      <div className="main-render max-w-[70%] h-[90%] m-auto bg-white/10 backdrop-blur-lg rounded-2xl p-[1rem]">
        <div className="w-full h-full bg-cover bg-center rounded-2xl flex flex-wrap px-[2rem] py-[2.5rem] gap-[2.5rem]"
        style={{
          backgroundImage:`url('https://images.pexels.com/photos/913807/pexels-photo-913807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}>
          <Leftmenu/>
          <RightSection/>
        </div>
      </div>
    </div>
  );
}

export default App;
