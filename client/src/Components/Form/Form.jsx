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
  const [hp, setHp] = useState(1);
  const [attack, setAttack] = useState(1);
  const [defense, setDefense] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [newType, setNewType] = useState("");

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    if (selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, selectedType]);
    }
  };

  const handleNewTypeChange = (e) => {
    setNewType(e.target.value);
  };

  const handleAddNewType = () => {
    if (newType.trim() !== "" && selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, newType.trim()]);
      setNewType("");
    }
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
      types: selectedTypes,
    };
    dispatch(createPokemon(newPokemon));
  };

  const handleReset = () => {
    setName("");
    setImage("");
    setHp(1);
    setAttack(1);
    setDefense(1);
    setSpeed(0);
    setHeight(0);
    setWeight(0);
    setSelectedTypes([]);
    setNewType("");
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
          HP (1 - 999):
          <input
            type="range"
            min={1}
            max={999}
            value={hp}
            onChange={(e) => setHp(Number(e.target.value))}
            required
          />
          {hp}
        </label>
        <br />
        <label>
          Attack (1 - 999):
          <input
            type="range"
            min={1}
            max={999}
            value={attack}
            onChange={(e) => setAttack(Number(e.target.value))}
            required
          />
          {attack}
        </label>
        <br />
        <label>
          Defense (1 - 999):
          <input
            type="range"
            min={1}
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
        <div>
          <label>New Type:</label>
          <input
            type="text"
            value={newType}
            onChange={handleNewTypeChange}
          />
          <button type="button" onClick={handleAddNewType}>
            Add New Type
          </button>
        </div>
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