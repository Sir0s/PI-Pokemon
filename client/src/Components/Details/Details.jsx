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
      <Link to="/pokemons" className={styles.backButton}>
        Back
      </Link>
      
      {details && (
        <div className={styles.card} key={details.id}>
          <div>
            <h2 className={styles.cardName}>{details.name}</h2>
          </div>
          <div>
            <img className={styles.image} src={details.image} alt={details.name} />
          </div>
          <div>
            <span>Attack: {details.attack}</span>
          </div>
          <div>
            <span>Defense: {details.defense}</span>
          </div>
          <div>
            <span>HP: {details.hp}</span>
          </div>
          <div>
            <span>Height: {details.height}</span>
          </div>
          <div>
            <span>Weight: {details.weight}</span>
          </div>
          <div>
            {details.types &&
              details.types.map((type, index) => {
                return (
                  <span key={index}>
                    Type {index + 1}: {type.name} <br />
                  </span>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
