import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/reducers/favoritesSlice";
import s from "./FavoriteButton.module.scss";

const FavoriteButton = ({ cityKey, city }) => {
  const dispatch = useDispatch();
  const favoritesKeys = useSelector((state) => state.favorites.favoritesKeys);
  const isFavorite = favoritesKeys.some((fav) => fav.key === cityKey);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(cityKey));
    } else {
      dispatch(addFavorite({ key: cityKey, city: city }));
    }
  };

  return (
    <div
      className={`${s.mFavorite} ${s.removeButton} ${
        isFavorite ? s.active : ""
      }`}
      onClick={handleFavoriteClick}
    >
      <div className={s.mFavorite__icon}></div>
      <span className={s.mFavorite__smallIcon}></span>
      <span className={s.mFavorite__smallIcon}></span>
      <span className={s.mFavorite__smallIcon}></span>
    </div>
  );
};

export default FavoriteButton;
