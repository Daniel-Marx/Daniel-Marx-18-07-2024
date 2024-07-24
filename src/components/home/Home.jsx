import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DayCard from "./DayCard.jsx";
import FavoriteButton from "../favoritesButton/FavoriteButton";
import sunIcon from "../../images/sunny.png";
import moonIcon from "../../images/moon.png";
import defaultImg from "../../images/default_beach.jpg";
import Loader from "../loader/Loader.jsx";
import s from "./Home.module.scss";

const Home = (props) => {
  const {
    setCityImageUrl,
    unitType,
    setUnitType,
    cityKey,
    setCityKey,
    openModal,
  } = props;
  const pexelsApiKey = process.env.REACT_APP_PEXELS_API_KEY;
  const accuweatherApiKey = process.env.REACT_APP_ACCUWEATHER_API_KEY;
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("Tel Aviv");
  const [searchValue, setSearchValue] = useState("");
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [noSuggestionsFound, setNoSuggestionsFound] = useState(true);
  const [currentConditions, setCurrentConditions] = useState("");
  const [fiveDayForecast, setFiveDayForecast] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleAutocompleteSearch = async () => {
      if (city.trim() === "") {
        setAutocompleteSuggestions([]);
        setNoSuggestionsFound(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`,
          {
            params: {
              apikey: accuweatherApiKey,
              q: city.trim(),
              language: "en-us",
            },
          }
        );

        if (response.data.length > 0) {
          setAutocompleteSuggestions(response.data);
          setNoSuggestionsFound(false);
        } else {
          setAutocompleteSuggestions([]);
          setNoSuggestionsFound(true);
        }
      } catch (error) {
        console.error("Error fetching autocomplete suggestions", error);
        setAutocompleteSuggestions([]);
        openModal();
      }
    };

    handleAutocompleteSearch();
  }, [city]);

  useEffect(() => {
    if (cityKey) handleSearch();
  }, [cityKey, unitType]);

  const handleSearch = async () => {
    fetchBackgroundImage();
    setIsLoading(true);
    if (searchValue) setCityName(searchValue);

    if (cityKey)
      try {
        const response = await axios.get(
          `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`,
          {
            params: {
              apikey: accuweatherApiKey,
              details: false,
              language: "en-us",
            },
          }
        );

        if (response.data) setCurrentConditions(response.data[0]);
        else {
          setCurrentConditions("");
        }
      } catch (error) {
        console.error("Error fetching current conditions:", error);
        openModal();
      }

    try {
      const useMetric = unitType === "Metric";
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}`,
        {
          params: {
            apikey: accuweatherApiKey,
            details: false,
            language: "en-us",
            metric: useMetric,
          },
        }
      );
      if (response.data) setFiveDayForecast(response.data);
      else {
        setFiveDayForecast("");
      }
    } catch (error) {
      console.error("Error fetching five day forecast:", error);
      openModal();
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBackgroundImage = async () => {
    let queryText;
    if (city === "" || city === "Tel Aviv") queryText = "Tel Aviv City";
    else queryText = `${city} city skyline`;

    try {
      const response = await axios.get(`https://api.pexels.com/v1/search`, {
        params: {
          query: queryText,
          per_page: 1,
        },
        headers: {
          Authorization: pexelsApiKey,
        },
      });
      const image = response.data.photos[0];
      if (image) {
        setCityImageUrl(image.src.large);
      } else {
        setCityImageUrl(defaultImg);
      }
    } catch (error) {
      console.error("Error fetching the image from Pexels", error);
      setCityImageUrl(defaultImg);
    }
  };

  const handleUnitChange = (newUnitType) => {
    setUnitType(newUnitType);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setAutocompleteSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={s.homeWrapper}>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div
              className={`input-group mb-3 ${s.searchGroupWrapper}`}
              ref={searchRef}
            >
              <div className={s.inputAndResults}>
                <input
                  className={`form-control shadow-none ${s.formControl}`}
                  type="search"
                  value={searchValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      setSearchValue(value);
                      setCity(value);
                    }
                  }}
                  placeholder="Enter city name"
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      autocompleteSuggestions.length > 0
                    ) {
                      setSearchValue(autocompleteSuggestions[0].LocalizedName);
                      setCityKey(autocompleteSuggestions[0].Key);
                      setAutocompleteSuggestions([]);
                    }
                  }}
                />

                <div className={s.autocompleteSuggestions}>
                  {noSuggestionsFound && city.trim() !== "" && (
                    <div className={`${s.alert} alert alert-info`}>
                      No suggestions found.
                    </div>
                  )}

                  {autocompleteSuggestions.length > 0 && (
                    <div className={`${s.listGroup} list-group`}>
                      {autocompleteSuggestions
                        .slice(0, 10)
                        .map((suggestion) => (
                          <button
                            key={suggestion.Key}
                            className={`list-group-item list-group-item-action ${s.listGroupItem}`}
                            onClick={() => {
                              setSearchValue(suggestion.LocalizedName);
                              setCityKey(suggestion.Key);
                              setAutocompleteSuggestions([]);
                            }}
                          >
                            {suggestion.LocalizedName}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                className={`btn btn-outline-secondary ${s.btn}`}
                type="button"
                style={{
                  borderRadius: "0 5px 5px 0",
                  backgroundColor: "#dc5f00",
                  color: "#fff",
                  border: "none",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b94e00")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#dc5f00")
                }
                onClick={() => {
                  if (autocompleteSuggestions.length > 0) {
                    setSearchValue(autocompleteSuggestions[0].LocalizedName);
                    setCityKey(autocompleteSuggestions[0].Key);
                    setAutocompleteSuggestions([]);
                  }
                }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.homeMainWrapper}>
          {!isLoading && !currentConditions && !fiveDayForecast && (
            <div className={s.noFavoritesMessage}>
              Unfortunately we are unable to process your request at the moment.
              Please try again at a later time.
            </div>
          )}

          {currentConditions && (
            <div className={s.homeTop}>
              <div className={s.homeTopLeft}>
                <div className={s.weatherImage}>
                  {currentConditions.IsDayTime ? (
                    <img
                      src={sunIcon}
                      alt="sun icon"
                      className={s.weatherIconHome}
                    />
                  ) : (
                    <img
                      src={moonIcon}
                      alt="moon icon"
                      className={s.weatherIconHome}
                    />
                  )}
                </div>
                <div className={s.weatherDetails}>
                  <div className={s.cityName}>{cityName}</div>

                  <div className={s.topLeftTemp}>
                    <span className={s.tempValue}>
                      {" "}
                      {unitType === "Metric"
                        ? currentConditions.Temperature.Metric.Value
                        : currentConditions.Temperature.Imperial.Value}
                      °{" "}
                    </span>

                    <span
                      className={
                        unitType === "Metric"
                          ? s.tempSelected
                          : s.tempNotSelected
                      }
                      onClick={() => handleUnitChange("Metric")}
                    >
                      C
                    </span>
                    {" | "}
                    <span
                      className={
                        unitType === "Imperial"
                          ? s.tempSelected
                          : s.tempNotSelected
                      }
                      onClick={() => handleUnitChange("Imperial")}
                    >
                      F
                    </span>
                  </div>

                  <div className={s.weatherText}>
                    {currentConditions.WeatherText}
                  </div>

                  <div className={s.precipitation}>
                    Precipitation expected:{" "}
                    {currentConditions.HasPrecipitation ? (
                      <span className={s.precipitationType}>
                        {currentConditions.PrecipitationType}
                      </span>
                    ) : (
                      <span className={s.precipitationType}>None</span>
                    )}
                  </div>
                </div>
              </div>

              <div className={s.homeTopRight}>
                <div className={s.removeButtonRow}>
                  <div className={s.homeTopRightText}>Add to favorites</div>
                  <div className={s.removeButton}>
                    <FavoriteButton cityKey={cityKey} city={cityName} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {fiveDayForecast && (
            <div className={s.forecastText}>
              {fiveDayForecast.Headline.Text}
            </div>
          )}

          {fiveDayForecast && (
            <div className={s.dayCardsWrapper}>
              {fiveDayForecast.DailyForecasts.map((forecastItem) => (
                <div
                  key={forecastItem.EpochDate}
                  className={s.dayCardCompWrapper}
                >
                  <DayCard
                    handleUnitChange={handleUnitChange}
                    date={forecastItem.Date}
                    minTemp={forecastItem.Temperature.Minimum.Value}
                    maxTemp={forecastItem.Temperature.Maximum.Value}
                    unit={forecastItem.Temperature.Minimum.Unit}
                    iconPhrase={forecastItem.Day.IconPhrase}
                    unitType={unitType}
                    HasPrecipitation={forecastItem.Day.HasPrecipitation}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
