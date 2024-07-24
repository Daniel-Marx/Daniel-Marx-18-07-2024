import React from "react";
import PropTypes from "prop-types";
import s from "./DayCard.module.scss";

const DayCard = ({
  date,
  minTemp,
  maxTemp,
  unit,
  iconPhrase,
  HasPrecipitation,
  PrecipitationType,
}) => {
  return (
    <div className={s.dayCardWrapper}>
      <div className={s.date}>{new Date(date).toDateString()}</div>
      <div className={s.iconPhrase}>{iconPhrase}</div>
      <div className={s.temp}>
        Min: {minTemp}° {unit}
      </div>
      <div className={s.temp}>
        Max: {maxTemp}° {unit}
      </div>
      <div className={s.recipitation}>
        Precipitation:{" "}
        {HasPrecipitation ? (
          <span className={s.precipitationType}>
            {PrecipitationType ? PrecipitationType : "None"}
          </span>
        ) : (
          <span className={s.precipitationType}>None</span>
        )}
      </div>
    </div>
  );
};

DayCard.propTypes = {
  date: PropTypes.string.isRequired,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  iconPhrase: PropTypes.string.isRequired,
  HasPrecipitation: PropTypes.bool.isRequired,
  PrecipitationType: PropTypes.string,
};

export default DayCard;
