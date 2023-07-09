import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, createPokemon } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";

const FormPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const created = useSelector((state) => state.created);
  const error = useSelector((state) => state.error);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [hp, setHp] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedTypes([...selectedTypes, { name: selectedType }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPokemon = {
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      type: selectedTypes,
    };
    dispatch(createPokemon(newPokemon));
  };

  const handleReset = () => {
    setName("");
    setImage("");
    setHp(0);
    setAttack(0);
    setDefense(0);
    setSpeed(0);
    setHeight(0);
    setWeight(0);
    setSelectedTypes([]);
  };

  return (
    <div>
      <NavBar />
      <h1>Create a New Pokemon</h1>
      {created && <p>Pokemon created successfully!</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          HP (0 - 999):
          <input
            type="range"
            min={0}
            max={999}
            value={hp}
            onChange={(e) => setHp(Number(e.target.value))}
            required
          />
          {hp}
        </label>
        <br />
        <label>
          Attack (0 - 999):
          <input
            type="range"
            min={0}
            max={999}
            value={attack}
            onChange={(e) => setAttack(Number(e.target.value))}
            required
          />
          {attack}
        </label>
        <br />
        <label>
          Defense (0 - 999):
          <input
            type="range"
            min={0}
            max={999}
            value={defense}
            onChange={(e) => setDefense(Number(e.target.value))}
            required
          />
          {defense}
        </label>
        <br />
        <label>
          Speed (0 - 999):
          <input
            type="range"
            min={0}
            max={999}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            required
          />
          {speed}
        </label>
        <br />
        <label>
          Height (0 - 999):
          <input
            type="range"
            min={0}
            max={999}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            required
          />
          {height}
        </label>
        <br />
        <label>
          Weight (0 - 999):
          <input
            type="range"
            min={0}
            max={999}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            required
          />
          {weight}
        </label>
        <br />
        <label>
          Types:
          <select onChange={handleTypeChange}>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Create</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default FormPage;
