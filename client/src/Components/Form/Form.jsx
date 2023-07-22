import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, resetCreated } from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import styles from "./Form.module.css";

const maxTypes = 2;
const nameRegex = /^[a-z]{1,20}$/;
const urlRegex =
  /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;
const inputStateInitial = {
  name: "",
  image: "",
  height: 0,
  weight: 0,
  hp: 1,
  attack: 1,
  defense: 1,
  speed: 0,
  types: [],
};
const errrosStateInitial = {
  name: "",
  image: "",
  height: "",
  weight: "", 
  hp: "",
  attack: "",
  defense: "",
  speed: "",
  types: [],
};

export function validate(input) {
  let errors = {};
  if (input.name.length <= 0) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(input.name)) {
    errors.name = "Name is invalid";
  }

  if (input.image.length <= 0) {
    errors.image = "Image is required";
  } else if (!urlRegex.test(input.image)) {
    errors.image = "Image URL invalid";
  }

  if (!input.types.length) {
    errors.types = "Types is required";
  }

  return errors;
}

const FormPage = () => {
  const [input, setInput] = useState(inputStateInitial);
  const created = useSelector((state) => state.created);
  const [createButtonDisabled, setCreateButtonDisabled] = useState(true);
  const [errors, setErrors] = useState(errrosStateInitial);
  let types = useSelector((state) => state.types);
  let error = useSelector((state) => state.error);

  let dispatch = useDispatch();

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setErrors(validate({ ...input, [name]: value }));
    setInput({ ...input, [name]: value });
    setCreateButtonDisabled(Object.keys(errors).length > 0);
  }

  function onChangeRange(event) {
    event.preventDefault();
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }

  function onChangeTypes(event) {
    event.preventDefault();
    if (event.target.value === "0") return;

    const selectedType = event.target.value;

    if (!input.types.includes(selectedType)) {
      setInput((prevState) => ({
        ...prevState,
        types: [...prevState.types, selectedType],
      }));

      if (input.types.length === maxTypes - 1) {
        event.target.disabled = true;
      }
    }

    event.target.value = "0";
  }

  function onClickDelete(event) {
    event.preventDefault();
    const typeToRemove = event.target.value;
    const newTypes = input.types.filter((type) => type !== typeToRemove);
    setInput({
      ...input,
      types: newTypes,
    });

    if (input.types.length < maxTypes) {
      document.getElementById("typesSelect").disabled = false;
    }

    setErrors(
      validate({
        ...input,
        types: newTypes,
      })
    );
  }

  function onClickCreate(event) {
    event.preventDefault();

    if (Object.keys(errors).length === 0) {
      dispatch(createPokemon(input));
    }
  }

  function inicializarForm() {
    let selectTypes = document.getElementById("typesSelect");
    if (input.types.length < 2) selectTypes.disabled = false;
  }

  function errorCreate() {
    let selectTypes = document.getElementById("typesSelect");

    if (input.types.length < 2) selectTypes.disabled = false;
  }

  useEffect(() => {
    setInput(inputStateInitial);
    inicializarForm();
    setTimeout(() => {
      dispatch(resetCreated());
    }, 5000);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    errorCreate();
    setTimeout(() => {
      dispatch(resetCreated());
    }, 1000);
    // eslint-disable-next-line
  }, [errors]);

  return (
    <div>
      <NavBar />

      <div className={styles.container}>
        <div>
          {created && (
            <div>
              <span>POKEMON CREATED</span>
            </div>
          )}
          {errors && error && (
            <div>
              <span>{"Creation Failed Pokemon Name already exists" || errors}</span>
            </div>
          )}

          {
            <h2 className={styles.form_title}>
              {Object.keys(errors).length !== 0 && "Crea tu propio pokemon."}
            </h2>
          }
        </div>

        <div className={styles.formContainer}>
          <form autoComplete="off">
            <div>
              <div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>NAME:</label>
                  <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
                    placeholder="Pokémon Name"
                    className={styles.input}
                  />
                </div>
                <div>{errors.name && <p>{errors.name}</p>}</div>
              </div>

              <div>
                <div>
                  <label>IMAGE:</label>
                  <input
                    type="text"
                    name="image"
                    value={input.image}
                    onChange={handleInputChange}
                    placeholder="Link to image..."
                    className={styles.input}
                  />
                </div>
                <div>{errors.image && <p>{errors.image}</p>}</div>
              </div>

              <div>
                <div>
                  <label>TYPES:</label>
                  <select
                    className={styles.input}
                    id="typesSelect"
                    onChange={onChangeTypes}
                    name="types"
                  >
                    <option value="0">Select Types</option>
                    {types.map((types, index) => (
                      <option key={index} value={types.name}>
                        {types.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {input.types.map((type, index) => (
                    <div key={index}>
                      <span>{type}</span>
                      <button value={type} onClick={onClickDelete}>
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div>2 types maximum</div>
                <div>{errors.types && errors.types}</div>
              </div>

              <div>
                <div>
                  <span>HP</span>
                  <input
                    type="range"
                    name="hp"
                    onChange={onChangeRange}
                    min={1}
                    max={999}
                    value={input.hp}
                    className={styles.input}
                  />
                  <span>{input.hp}</span>
                </div>
                <div>
                  <span>ATTACK</span>
                  <input
                    type="range"
                    name="attack"
                    onChange={onChangeRange}
                    min={1}
                    max={999}
                    value={input.attack}
                    className={styles.input}
                  />
                  <span>{input.attack}</span>
                </div>
                <div>
                  <span>DEFENSE</span>
                  <input
                    type="range"
                    name="defense"
                    onChange={onChangeRange}
                    min={1}
                    max={999}
                    value={input.defense}
                    className={styles.input}
                  />
                  <span>{input.defense}</span>
                </div>
                <div>
                  <span>SPEED</span>
                  <input
                    type="range"
                    name="speed"
                    onChange={onChangeRange}
                    min={0}
                    max={999}
                    value={input.speed}
                    className={styles.input}
                  />
                  <span>{input.speed}</span>
                </div>
                <div>
                  <span>HEIGHT</span>
                  <input
                    type="range"
                    name="height"
                    onChange={onChangeRange}
                    min={0}
                    max={999}
                    value={input.height}
                    className={styles.input}
                  />
                  <span>{input.height}</span>
                </div>
                <div>
                  <span>WEIGHT</span>
                  <input
                    type="range"
                    name="weight"
                    onChange={onChangeRange}
                    min={0}
                    max={999}
                    value={input.weight}
                    className={styles.input}
                  />
                  <span>{input.weight}</span>
                </div>
                <div>
                  <input
                    onClick={onClickCreate}
                    type="submit"
                    name="submit"
                    value="CREATE"
                    id="submitCreate"
                    disabled={createButtonDisabled}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.cardPreviewContainer}>
          <span>PREVIEW</span>
          <div>
            <div>
              <div>
                <h2>{input.name}</h2>
              </div>
              <div>
                <img src={input.image} alt={input.name} />
              </div>
              <div>
                <span>Attack: {input.attack}</span>
              </div>
              <div>
                <span>Defense: {input.defense}</span>
              </div>
              <div>
                <span>HP: {input.hp}</span>
              </div>
              <div>
                <span>Height: {input.height}</span>
              </div>
              <div>
                <span>Weight: {input.weight}</span>
              </div>
              <div>
                {input.types &&
                  input.types.map((type, index) => {
                    return (
                      <span key={index}>
                        Type {index + 1}: {type} <br />
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormPage;
