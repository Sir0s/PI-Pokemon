import React from "react";
import {Link} from "react-router-dom"
import styles from "./NavBar.module.css"

export default function NavBar() {
    return (
        <div className={styles.NavBar_container}>
            <div className={styles.links}>
                <ul>
                 <li>
                    <Link to="/pokemons"> <button> Home </button></Link>
                </li>
                <li>
                    <Link to="/new_pokemon"> <button> New Poke </button></Link>
                </li>
                </ul>
            </div>
        </div>
    );
}