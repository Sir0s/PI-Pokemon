import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Details.module.css";
import { getPokemonById, resetDetails } from "../../Redux/actions";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(resetDetails());
    dispatch(getPokemonById(id));
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className={styles.container}>
      <header>
        <h1>Pokémon Details</h1>
      </header>

      <Link to="/pokemons" className={styles.backButton}>
        <button>Back</button>
      </Link>

      {details === "Request failed with status code 404" && (
        <div>
          <span> Pokémon not found! </span>
        </div>
      )}
      {details !== "Request failed with status code 404" && (
        <div className={styles.Detail} key={details.id}>
          <div>
            <h2 className={styles.cardName}>{details.name}</h2>
            <p className={styles.description}>
              This is a little description of the details of {details.name}.
            </p>
          </div>
          <div>
            <img className={styles.image} src={details.image} alt={details.name} />
          </div>
          <div className={styles.statsContainer}>
            <div className={styles.statsRow}>
              <span>Attack: {details.attack}</span>
              <span>Defense: {details.defense}</span>
            </div>
            <div className={styles.statsRow}>
              <span>HP: {details.hp}</span>
              <span>Height: {details.height}</span>
            </div>
            <div className={styles.statsRow}>
              <span>Weight: {details.weight}</span>
             
            </div>
          </div>
          <div className={styles.typesContainer}>
            {details.types &&
              details.types.map((type, index) => {
                return (
                  <span key={index} className={styles.type}>
                    Type {index + 1}: {type.name}
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
