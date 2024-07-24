import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHome, selectFaves } from "../../redux/reducers/pageSelectSlice";
import s from "./Header.module.scss";

const Header = ({}) => {
  const pageSelectValue = useSelector((state) => state.pageSelect.value);
  const dispatch = useDispatch();

  return (
    <header className={s.headerWrapper}>
      <h1 className={s.title}>abra Web & Mobile Weather Service</h1>

      <div className={s.headerDayNightWrapper}></div>

      <div className={s.headerHomeFavesWrapper}>
        <button
          className={`${s.navButton} ${
            pageSelectValue === "Home" ? s.selected : ""
          }`}
          onClick={() => dispatch(selectHome())}
        >
          Home
        </button>
        <button
          className={`${s.navButton} ${
            pageSelectValue === "Faves" ? s.selected : ""
          }`}
          onClick={() => dispatch(selectFaves())}
        >
          Favorites
        </button>
      </div>
    </header>
  );
};

export default Header;
