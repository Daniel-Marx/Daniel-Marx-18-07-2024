import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "../home/Home.jsx";
import Favorites from "../favorites/Favorites.jsx";
import Modal from "../modal/Modal.jsx";
import defaultImg from "../../images/default_beach.jpg";
import s from "./Main.module.scss";

const Main = (props) => {
  const pageSelectValue = useSelector((state) => state.pageSelect.value);
  const { unitType, setUnitType } = props;
  const [cityImageUrl, setCityImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cityKey, setCityKey] = useState("215854");

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    setImageLoaded(false);

    const img = new Image();
    img.src = cityImageUrl || defaultImg;
    img.onload = () => setImageLoaded(true);
  }, [cityImageUrl]);

  return (
    <>
      <div className={s.mainWrapper}>
        <div
          className={`${s.backgroundImage} ${imageLoaded ? s.fadeIn : ""}`}
          style={{ backgroundImage: `url(${cityImageUrl || defaultImg})` }}
        />
        <div className={s.content}>
          {pageSelectValue === "Faves" ? (
            <Favorites
              unitType={unitType}
              cityImageUrl={cityImageUrl}
              setCityImageUrl={setCityImageUrl}
              setCityKey={setCityKey}
              openModal={openModal}
            />
          ) : (
            <Home
              setCityImageUrl={setCityImageUrl}
              unitType={unitType}
              setUnitType={setUnitType}
              setCityKey={setCityKey}
              cityKey={cityKey}
              openModal={openModal}
            />
          )}
        </div>
      </div>

      <div>
        {isModalOpen && (
          <Modal
            message="There was an error processing your request. Please try again later."
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

export default Main;
