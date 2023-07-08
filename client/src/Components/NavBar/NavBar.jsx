import React from "react";
import {Link} from "react-router-dom"

export default function NavBar() {
    return (
        <div>
            <div>
                <ul>
                 <li>
                    <Link to="/pokemons"> <button> Home </button></Link>
                </li>
                
                </ul>
            </div>
        </div>
    );
}