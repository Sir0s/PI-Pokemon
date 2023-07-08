import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../Pokemon/Pokemon";
import { getPokemonById, resetDetails } from "../../Redux/actions";

export default  function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details =  useSelector((state) => state.details);

  useEffect(() => {
    dispatch(resetDetails())
    dispatch(getPokemonById(id));
  }, [id]);
  return (
    <>
      <Link to="/pokemons">
        <button>Back</button>
      </Link>
      <div>
        <Pokemon
          id= {id}
          name={details.name}
          image={details.image}
          attack={details.attack}
          defense={details.defense}
          types={details.type}
          key={details.id}
          hp={details.hp}
          height={details.height}
          weight={details.weight}
        />
      </div>
    </>
  );
}
