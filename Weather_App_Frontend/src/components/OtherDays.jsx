import PropTypes from "prop-types";
const OtherDays = ({ data4days }) => {

  const trimmedString = (str) => {
    if(str === "Thursday")
    return str.slice(0, 4);

    return str.slice(0, 3);
  }
  const tempInteger = (str) => {
    return String(parseInt(str));
  }
  return (
    <>
      {data4days.map((e, idx) => (
        <button
          key={idx}
          className="h-full w-[25%] focus:scale-105 hover:scale-105 bg-[#272E37] focus:bg-white focus:text-black hover:bg-white hover:text-black text-white flex items-center justify-center flex-col py-[1rem] gap-[0.5rem] rounded-[0.5rem]"
        >
          <div className="w-full text-4xl flex justify-center">
            {e.weatherIcon}
          </div>
          <div className="w-full">{trimmedString(e.day)}</div>
          <div className="w-full text-xl font-semibold">
            {tempInteger(e.mainTemp)} &deg;C
          </div>
        </button>
      ))}
    </>
  );
};

OtherDays.propTypes = {
  data4days: PropTypes.array.isRequired,
};
export default OtherDays;
