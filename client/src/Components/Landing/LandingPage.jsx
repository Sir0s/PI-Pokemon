import { Link } from "react-router-dom";

  export default function LandingPage() {
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
