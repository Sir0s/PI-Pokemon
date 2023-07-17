import React from 'react';
import { Routes, Route  } from 'react-router-dom'
import LandingPage from './Components/Landing/LandingPage';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';
import Form from './Components/Form/Form';
import styles from './App.module.css'

//const {pathname} = useLocation();
function App() {

  return (
    <div className={styles.App}>
      {/*  { {pathname !== "/" && <Nav onsearch={onSearch}/>} } */}
      <Routes>
      <Route exact path="/" element={<LandingPage/>} />
      <Route path="/pokemons" element={<Home/>} />
      <Route exact path="/pokemons/:id" element={<Details/>} />
      <Route exact path= '/new_pokemon' element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
