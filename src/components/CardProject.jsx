import React from "react";
import PropTypes from "prop-types";

export default function CardProject({ Img, Title, Description, onDetailsClick }) {
  return (
    <div className="bg-[#1f2937] text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col h-[420px]">
      {/* Image */}
      <img src={Img} alt={Title} className="w-full h-48 object-cover" />

      {/* Body */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-purple-400">{Title}</h3>
          <p className="text-sm text-slate-300 mt-1 line-clamp-4">{Description}</p>
        </div>

        <div className="mt-4 text-sm text-right">
          <button
            onClick={onDetailsClick}
            className="text-purple-500 hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

CardProject.propTypes = {
  Img: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
};
