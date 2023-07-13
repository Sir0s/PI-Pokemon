import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { getPokemons, getTypes } from "../../Redux/actions";
import Pokemons from '../Pokemons/Pokemons';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css';


export default function Home() {
  let dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchResults, setSearchResults] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedType, setSelectedType] = useState('');
  const [filterByAPI, setFilterByAPI] = useState(false);
  const [filterByDB, setFilterByDB] = useState(false);
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons = searchResults.length > 0 ? searchResults.slice(indexOfFirstPokemon, indexOfLastPokemon) : filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReset = () => {
    setSearchResults([]);
    setCurrentPage(1);
    setSelectedType('');
    setSortOrder('asc');
    setFilterByAPI(false);
    setFilterByDB(false);
  };

  const filterPokemons = (pokemons) => {
    let filtered = pokemons;
  
    // Filtrar por tipo
     if (selectedType !== '') {
      filtered = filtered.filter((pokemon) => {
        const tipos = pokemon.type && pokemon.type.map((type) => type.name);
        return tipos && tipos.includes(selectedType); // Add a check for tipos before using includes
      });
    } 
  
    // Filtrar por API
    if (filterByAPI) {
      filtered = filtered.filter((pokemon) => !pokemon.created);
    }
  
    // Filtrar por DB
    if (filterByDB) {
      filtered = filtered.filter((pokemon) => pokemon.created);
    }
  
    return filtered;
  };

  const sortPokemons = (pokemons) => {
    let sorted = [...pokemons];

    // Ordenar por nombre
    sorted.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return sorted;
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, []);

  useEffect(() => {
    // Filtrar y ordenar los pokemons cuando se actualicen los datos
    const filtered = filterPokemons(allPokemons);
    const sorted = sortPokemons(filtered);
    setFilteredPokemons(sorted);
    setCurrentPage(1);
  }, [allPokemons, selectedType, sortOrder, filterByAPI, filterByDB]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleAPIFilterChange = () => {
    setFilterByAPI(!filterByAPI);
    setCurrentPage(1);
  };

  const handleDBFilterChange = () => {
    setFilterByDB(!filterByDB);
    setCurrentPage(1);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setCurrentPage(1);
  };

  return (
    
    <div className={styles.container}>
      
      <h1 className={styles.title}>Home</h1>
      <NavBar />
      <div>
        <SearchBar setSearchResults={handleSearchResults} />
      </div>
      <div className={styles.filters}>
        <label htmlFor="typeFilter">Filter by Type:</label>
        <select id="typeFilter" onChange={(e) => handleTypeChange(e.target.value)}>
          <option value="0">All</option>
               
          {allTypes?.map((type,index) => (
            <option key={index} value={type.name}>
            {type.name}
          </option>
          ))} </select>

        <div>
          <span>Sort Order:</span>
          <button onClick={() => handleSortOrderChange('asc')}>A-Z</button>
          <button onClick={() => handleSortOrderChange('desc')}>Z-A</button>
        </div>
      </div>
      <div className={styles.filterOptions}>
        <div>
          <input type="checkbox" id="apiFilter" checked={filterByAPI} onChange={handleAPIFilterChange} />
          <label htmlFor="apiFilter">API</label>
        </div>
        <div>
          <input type="checkbox" id="dbFilter" checked={filterByDB} onChange={handleDBFilterChange} />
          <label htmlFor="dbFilter">DB</label>
        </div>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${styles.pageButton} ${pageNumber === currentPage ? 'disabled' : ''}`}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </button>
        ))}
        <button className={styles.pageButton} onClick={handleReset}>Reset</button>
      </div>
      <div className={styles.pokemonList}>
        <Pokemons pokes={currentPokemons} />
      </div>
    </div>
  );
}
