import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchPokemon, resetSearch } from '../../Redux/actions';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const founded = useSelector((state) => state.found_pokemon);
  const [error, setError] = useState(null);
  
 
  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
    setError(null)
  };

  useEffect(() => {
    if (founded && founded.id) {
      navigate(`/pokemons/${founded.id}`);
      dispatch(resetSearch());
    } 
  }, [founded,dispatch,navigate]);
  const handleKey = (event) =>{
    if (event.key === 'Enter'){
      handleClick(event);
    }
  }

  const handleClick = (event) => {
    event.preventDefault();

    if (/^\d+$/.test(search)) {
      setError("Por favor ingrese un nombre valido.");
      setSearch("");
    } else {
      setError(null)
      dispatch(searchPokemon(search))
      setSearch("");
      
    }
  };
 

  return (
    <div>
      <input type="search" onChange={handleChange} onKeyPress={handleKey} value={search} />
      <button onClick={handleClick}>Buscar</button>
      {error && <p>{error}</p>}
    </div>
  );
}
