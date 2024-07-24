import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { selectHome } from "../../redux/reducers/pageSelectSlice";
import FavoriteButton from "../favoritesButton/FavoriteButton";
import sunIcon from "../../images/sunny.png";
import moonIcon from "../../images/moon.png";
import s from "./FavoritesCard.module.scss";

const FavoritesCard = (props) => {
  const {
    city,
    date,
    temperature,
    unit,
    iconPhrase,
    HasPrecipitation,
    PrecipitationType,
    cityKey,
    setCityKey,
    IsDayTime,
  } = props;
  const dispatch = useDispatch();

  return (
    <div
      className={s.favoritesCardWrapper}
      onClick={() => {
        setCityKey(cityKey);
        dispatch(selectHome());
      }}
    >
      <div className={s.favoritesCardTop}>
        {IsDayTime ? (
          <img src={sunIcon} alt="sun icon" className={s.weatherIconCard} />
        ) : (
          <img src={moonIcon} alt="moon icon" className={s.weatherIconCard} />
        )}

        <div className={s.city}>{city}</div>

        <div className={s.removeButton}>
          <FavoriteButton cityKey={cityKey} city={city} />
        </div>
      </div>

      <div className={s.favoritesCardDivider}></div>

      <div className={s.favoritesCardBody}>
        <div className={s.precipitation}>{new Date(date).toDateString()}</div>

        <div className={s.temp}>
          {temperature}°{unit}
        </div>

        <div className={s.precipitation}>Weather: {iconPhrase}</div>

        <div className={s.precipitation}>
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
    </div>
  );
};

FavoritesCard.propTypes = {
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  iconPhrase: PropTypes.string.isRequired,
  HasPrecipitation: PropTypes.bool.isRequired,
  PrecipitationType: PropTypes.string,
  cityKey: PropTypes.string.isRequired,
  IsDayTime: PropTypes.bool.isRequired,
};

export default FavoritesCard;
