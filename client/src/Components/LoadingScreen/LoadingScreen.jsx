import React from "react";
import styles from "./LoadingScreen.module.css"; 
import imgLoader from "../../images/loading.gif"

const LoadingScreen = () => {
  return (
    <div className={styles.loadingContainer}>
      <img className={styles.gif} src={imgLoader}></img>
      <div className={styles.loader}></div>
      <h2>Loading Pokemons...</h2>
      
    </div>
  );
};

export default LoadingScreen;