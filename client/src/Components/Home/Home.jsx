import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pokemons from '../Pokemons/Pokemons';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../Redux/actions";

export default function Home() {

  let dispatch = useDispatch();

 
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchResults, setSearchResults] = useState([]);
  const totalPages = Math.ceil(allPokemons.length / itemsPerPage);

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = searchResults.length > 0 ? searchResults : allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReset = () => {
    setSearchResults([]);
    setCurrentPage(1);
  };
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
      // eslint-disable-next-line
  }, []);


  return (
    <div>
      <h1>Home</h1>
      <NavBar />
      <div>
        <SearchBar setSearchResults={setSearchResults} />
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleReset}>Reset</button> 
      </div>
      <div>
        <Pokemons pokes={currentPokemons} />
       
      </div>
    </div>
  );
}
