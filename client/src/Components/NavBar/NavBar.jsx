import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";


export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_container}>
        <div className={styles.links}>
          <ul className={styles.list}>
            <li className={styles.home}>
              <Link to="/pokemons">
                  <button> Home </button>
              </Link>
            </li>
            <li className={styles.newpoke}>
              <Link to="/new_pokemon">
               <button>New Poke</button> 
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
