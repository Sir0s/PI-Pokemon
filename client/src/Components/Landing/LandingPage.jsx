import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"
  export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div>
        
      </div>
      <div className={styles.enter}>
        <Link to="/pokemons">
          <button className={styles.button}>Enter</button>
        </Link>
      </div>
    </div>
  );
}
