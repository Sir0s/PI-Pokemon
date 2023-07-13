import React from "react";
import Pokemon from "../Pokemon/Pokemon";
import { Link } from "react-router-dom";
import styles from "./Pokemons.module.css"

export default function Pokemons({ pokes }) {

  return (
    <div className={styles.cards}>
      
      {pokes.map((pokemon) => {
        return (
          <Link to={`/pokemons/${pokemon.id}`} key={pokemon.id}>
            <Pokemon
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              attack={pokemon.attack}
              types={pokemon.type}
              typesDB={pokemon.Types}
              hp={pokemon.hp}
              defense={pokemon.defense}
              speed={pokemon.speed}
              height={pokemon.height}
              weight={pokemon.weight}
              created={pokemon.created}
            />
          </Link>
        );
      })}
    </div>
  );
}
