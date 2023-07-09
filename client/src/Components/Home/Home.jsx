import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pokemons from '../Pokemons/Pokemons';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css'; 

export default function Home() {
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(allPokemons.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      
      <h1>Home</h1>
      <NavBar />
      <div>
        <SearchBar />
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
      </div>
      <div>
        <Pokemons pokes={currentPokemons} />
      </div>
 
    </div>
  );
}