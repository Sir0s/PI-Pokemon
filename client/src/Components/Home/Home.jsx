import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPokemons,
  getTypes,
  setSelectedType,
  setFilterOption,
} from "../../Redux/actions";
import Pokemons from "../Pokemons/Pokemons";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import styles from "./Home.module.css"; 



export default function Home() {
  const dispatch = useDispatch();
  const loading = useSelector((state)=> state.loading)
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.types);
  const selectedType = useSelector((state) => state.selectedType);
  const filterOption = useSelector((state) => state.filterOption);
  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchResults, setSearchResults] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const indexOfLastPokemon = currentPage * itemsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - itemsPerPage;
  const currentPokemons =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstPokemon, indexOfLastPokemon)
      : filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReset = () => {
    setSearchResults([]);
    setCurrentPage(1);
    dispatch(setSelectedType(""));
    dispatch(setFilterOption("All"));
    setSortOrder("");
  };

  const filterPokemons = () => {
    let filtered = allPokemons;

    // Filtrar por opción
    if (filterOption === "API") {
      filtered = filtered.filter((pokemon) => !pokemon.created);
    } else if (filterOption === "DB") {
      filtered = filtered.filter((pokemon) => pokemon.created);
    }

    if (selectedType !== "") {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
      return filtered;
    }

    return filtered;
  };

  const sortPokemons = (pokemons) => {
    let sorted = [...pokemons];

    // Ordenar por nombre o ataque según sortOrder
    sorted.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "desc") {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === "attack_asc") {
        return a.attack - b.attack;
      } else if (sortOrder === "attack_desc") {
        return b.attack - a.attack;
      }
      return sorted;
    });

    return sorted;
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
    //eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    // Filtrar y ordenar los pokemons cuando se actualicen los datos
    const filtered = filterPokemons(allPokemons);
    const sorted = sortPokemons(filtered);
    setFilteredPokemons(sorted);
    setCurrentPage(1);
    //eslint-disable-next-line
  }, [allPokemons, selectedType, filterOption, sortOrder]);

  const handleTypeChange = (type) => {
    dispatch(setSelectedType(type));
    setCurrentPage(1);
  };

  const handleFilterOptionChange = (option) => {
    dispatch(setFilterOption(option));
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSearchResults = (results) => {
    setSearchResults(results.length > 0 ? [results[0]] : []);
    setCurrentPage(1);
  };

  return (

    <div>

      <div>
        <NavBar />
      </div>

      <div className={styles.container}>
        <div className={styles.filters_and_searchbar_container}>
          <div className={styles.SearchBar_container}>
            <SearchBar setSearchResults={handleSearchResults} />
          </div>

          <div className={styles.filter_container}>
            <label>Filters: TYPE: </label>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="">All</option>
              {allTypes?.map((type, index) => (
                <option key={index} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <div>
              <span> API / DB: </span>
              <select
                value={filterOption}
                onChange={(e) => handleFilterOptionChange(e.target.value)}
              >
                <option value="All">All</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
              </select>
            </div>
          </div>
          
          <div className={styles.Order_container}>
            <div className={styles.orders}>
              <span>ORDER: </span>
              <button
                className={styles.button}
                onClick={() => handleSortOrderChange("asc")}
              >
                A-Z
              </button>
              <button
                className={styles.button}
                onClick={() => handleSortOrderChange("desc")}
              >
                Z-A
              </button>
              <button
                className={styles.button}
                onClick={() => handleSortOrderChange("attack_asc")}
              >
                Lowest Attack
              </button>
              <button
                className={styles.button}
                onClick={() => handleSortOrderChange("attack_desc")}
              >
                Highest Attack
              </button>
            </div>
          </div>
        </div>
        
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`${styles.pageButton} ${
                  pageNumber === currentPage ? styles.disabled : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === currentPage}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            className={`${styles.pageButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={handleReset}
            disabled={currentPage === 1}
          >
            Reset
          </button>
        </div>

        <div className={styles.pokemonList}>
        {loading ? <LoadingScreen /> : <Pokemons isLoading={loading} pokes={currentPokemons} />}
         
        </div>
      </div>
    </div>
  );
}
