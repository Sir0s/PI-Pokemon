import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../Redux/actions";

export default function LandingPage() {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <div>
        <h1>Pokemon Page</h1>
      </div>
      <div>
        <Link to="/pokemons">
          <button>Enter</button>
        </Link>
      </div>
    </div>
  );
}
