import { useSelector } from "react-redux";
import Pokemons from '../Pokemons/Pokemons';
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";

export default function Home (){
    const pokemons = useSelector((state)=>state.pokemons)
    return(
        <div>
            <h1>Home</h1>
            <NavBar/>
            <div>
                <SearchBar/>
            </div>
            <div>
                <Pokemons pokes={pokemons} />
            </div>
        </div>
    )
}