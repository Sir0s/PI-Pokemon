import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPokemon, resetSearch } from '../../Redux/actions';
import styles from './SearchBar.module.css'

export default function SearchBar({ setSearchResults }) {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const foundPokemon = useSelector((state) => state.found_pokemon);
  const errorSearch = useSelector((state) => state.error_search);

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    setError(null);
  };

  useEffect(() => {
    if (foundPokemon && foundPokemon.id) {
      setSearchResults([foundPokemon]);
      dispatch(resetSearch());
    } else if (errorSearch) {
      setError('No Pokémon found');
      dispatch(resetSearch())
    }
  }, [foundPokemon, errorSearch, dispatch, setSearchResults]);

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      handleClick(event);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (/^\d+$/.test(search)) {
      setError('Please enter a valid name.');
      setSearch('');
    } else {
      dispatch(searchPokemon(search));
      setSearch('');
    }
   
  };

  return (
    <div className={styles.searchbar}>
      <input className={styles.input}
        type="search"
        placeholder="Enter a name to search."
        onChange={handleChange}
        onKeyPress={handleKey}
        value={search}
      />
      <button className={styles.button} onClick={handleClick}>Search</button>
      {error && <p className={styles.p}>Error: {error}</p>}
    </div>
  );
}
