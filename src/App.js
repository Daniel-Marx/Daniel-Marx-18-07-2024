import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, setUnitType } from "./redux/reducers/themeSlice";
import Header from "./components/header/Header.jsx";
import Main from "./components/main/Main.jsx";

import "./styles/theme.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const unitType = useSelector((state) => state.theme.unitType);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "";
  }, [isDarkMode]);

  return (
    <div className="appWrapper">
      <Header
        isDarkMode={isDarkMode}
        unitType={unitType}
        toggleTheme={() => dispatch(toggleTheme())}
      />
      <Main
        unitType={unitType}
        setUnitType={(newUnitType) => dispatch(setUnitType(newUnitType))}
      />
    </div>
  );
};

export default App;
