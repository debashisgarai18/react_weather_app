import React from "react";
import PropTypes from "prop-types";

const RightSection = ({ showLocdata }) => {
  return (
    <>
      {showLocdata ? (
        <div className="w-[70%] h-full bg-green-300">
          <div>{showLocdata.name}</div>
          <div>{showLocdata.lat}</div>
          <div>{showLocdata.long}</div>
        </div>
      ) : (
        <div className="w-[70%] h-full bg-green-300">No data to be shown</div>
      )}
    </>
  );
};

RightSection.propTypes = {
  showLocdata: PropTypes.object.isRequired,
};
export default RightSection;
