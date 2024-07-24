import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FavoritesCard from "./FavoritesCard.jsx";
import defaultImg from "../../images/default_beach.jpg";
import Loader from "../loader/Loader.jsx";
import s from "./Favorites.module.scss";

const Favorites = (props) => {
  const { unitType, cityImageUrl, setCityImageUrl, setCityKey, openModal } =
    props;
  const [favoritesData, setFavoritesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const favoritesKeys = useSelector((state) => state.favorites.favoritesKeys);
  const accuweatherApiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY;

  useEffect(() => {
    if (!cityImageUrl) setCityImageUrl(defaultImg);
  }, []);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      setIsLoading(true);
      const fetchedData = [];
      try {
        for (const { key, city } of favoritesKeys) {
          const response = await axios.get(
            `http://dataservice.accuweather.com/currentconditions/v1/${key}`,
            {
              params: {
                apikey: accuweatherApiKey,
                details: false,
                language: "en-us",
              },
            }
          );

          if (response.data) {
            const data = response.data[0];
            const temperature =
              unitType === "Metric"
                ? data.Temperature.Metric.Value
                : data.Temperature.Imperial.Value;
            const unit =
              unitType === "Metric"
                ? data.Temperature.Metric.Unit
                : data.Temperature.Imperial.Unit;

            fetchedData.push({
              LocalObservationDateTime: data.LocalObservationDateTime,
              Temperature: temperature,
              Unit: unit,
              WeatherText: data.WeatherText,
              HasPrecipitation: data.HasPrecipitation,
              PrecipitationType: data.PrecipitationType,
              IsDayTime: data.IsDayTime,
              city,
              key: key,
            });
          }
        }
        setFavoritesData(fetchedData);
      } catch (error) {
        console.error("Error fetching favorite data", error);
        openModal();
      } finally {
        setIsLoading(false);
      }
    };

    if (favoritesKeys.length > 0) {
      fetchFavoritesData();
    } else {
      setFavoritesData([]);
      setIsLoading(false);
    }
  }, [favoritesKeys, unitType]);

  return (
    <div className={s.favoritesWrapper}>
      {isLoading ? (
        <div className={s.loadingMessage}>
          <Loader />
        </div>
      ) : favoritesData.length === 0 ? (
        <div className={s.noFavoritesMessage}>No favorites saved yet.</div>
      ) : (
        <div className={s.favoritesCardsWrapper}>
          {favoritesData.map((data, index) => (
            <FavoritesCard
              key={data.key}
              cityKey={data.key}
              date={data.LocalObservationDateTime}
              temperature={data.Temperature}
              unit={data.Unit}
              iconPhrase={data.WeatherText}
              HasPrecipitation={data.HasPrecipitation}
              PrecipitationType={data.PrecipitationType}
              IsDayTime={data.IsDayTime}
              city={data.city}
              setCityKey={setCityKey}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
