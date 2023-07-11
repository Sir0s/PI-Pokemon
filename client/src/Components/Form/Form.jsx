import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon,resetCreated } from '../../Redux/actions';
import Pokemon from '../Pokemon/Pokemon';
import NavBar from "../NavBar/NavBar";
import { useEffect } from 'react';

const maxTypes = 2;
const stringRegExp = /^[a-zA-Z]{1,20}$/;
const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;

export function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!stringRegExp.test(input.username)) {
      errors.name = 'Name is invalid';
    }
  
    if(!input.image){
      errors.image = 'Image is required';
      } else if (!urlRegExp.test(input.image)){
      errors.image = 'Image URL invalid';
    }

    if(input.types.length <= 0){
      errors.types = 'Types is required';
    }
      
    return errors;
  };
  
const FormPage = ()=> {

    let types = useSelector(state => state.types);
    let createdPokemon = useSelector(state => state.created); 
    let error = useSelector(state => state.error);

    let dispatch = useDispatch();
  
    const inputStateInitial = {
      name: '',
      image: '',
      height: 0,
      weight: 0,
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      types: [],
    }

    const [input, setInput] = useState(inputStateInitial);
    
    const [errors, setErrors] = useState({
        name: '',
        image: '',
        height: '',
        weight: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        types:''
      });


      function handleInputChange (event) {
     
        if ((event.target.name === 'name')  && (event.target.value.length>1)){
          if (!stringRegExp.test(event.target.value) ) {
            return false;
          }
        }

        setInput({
          ...input,
          [event.target.name]: event.target.value
        });
    
        setErrors(validate({
          ...input,
          [event.target.name]: event.target.value
        }));
      
      }


      function onChangeRange(event) {

        setInput({
          ...input,
          [event.target.name]: event.target.value
        });
    
      }


      function onChangeTypes(event) {

        // maximo de types 2
        if (event.target.value === "0") return;

          if (input.types.filter(type => (type.name === event.target.value)).length===0) {

            let newType = {"name": event.target.value};
            setInput({
              ...input,
              types: [...input.types, newType]
            });

            setErrors(validate({
              ...input,
              types: [...input.types, newType]
            }));

            
            if (input.types.length === maxTypes-1) {
              event.target.disabled = true;
            }  
          
        }
        event.target.value = "0";
      }

      // delete Type de la lista
      function onClickDelete(event) {
          let newTypes = input.types.filter(type => type.name !== event.target.value);
          setInput({
                ...input,
                types: newTypes
              });       

          if (input.types.length < maxTypes+1) {
            document.getElementById("typesSelect").disabled = false;
          }

          setErrors(validate({
            ...input,
            types: newTypes
          }));

      }

      function onClickCreate(event) {
        event.preventDefault();
        
        if (Object.keys(errors).length === 0) { 
              dispatch(createPokemon(input));
        } else {
          setErrors({
            ...errors
          })
        }
      }


    function inicializarForm(){           
        let selectTypes = document.getElementById("typesSelect");
        if (input.types.length<2) selectTypes.disabled = false;  
    }       

    function errorCreate(){
      let selectTypes = document.getElementById("typesSelect");
      let submitCreate = document.getElementById("submitCreate");
      if (input.types.length<2) selectTypes.disabled = false;
      submitCreate.disabled = false;                          
        
    }
      
   
    useEffect(() => {
      setInput(inputStateInitial);
      inicializarForm();
      setTimeout(()=>{dispatch(resetCreated())},2000);
      // eslint-disable-next-line
    },[]);


    useEffect(() => {
      errorCreate();
      setTimeout(()=>{dispatch(resetCreated())},2000);
      // eslint-disable-next-line
    },[error]);


  return (
  <div>
    <NavBar />
    <div>
    
      {createdPokemon && (
        <div>
          <span>POKEMON CREATED</span>
        </div>
      )}

      {error.length > 0 && (
        <div>
          <span>{error}</span>
        </div>
      )}

      {Object.keys(errors).length !== 0 && (
        <div>
          You must complete the form correctly before sending.
        </div>
      )}
    </div>
    <div>
      <div>
       
        <div>
          <div>
            <label>NAME:</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleInputChange}
              placeholder="Pokémon Name"
            />
          </div>
          <div>
            {errors.name && <p>{errors.name}</p>}
          </div>
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
            />
          </div>
          <div>
            {errors.image && <p>{errors.image}</p>}
          </div>
        </div>

        

       
        <div>
          <div>
            <label>TYPES:</label>
            <select defaultValue="0" id="typesSelect" onChange={onChangeTypes} name="types">
              <option value="0">Select Types</option>
              {types.map((type, index) => (
                <option key={index} value={type.name}>{type.name}</option>
              ))}
            </select>
          </div>
          <div>
            {input.types.map((type, index) => (
              <div key={index}>
                <span>{type.name}</span>
                <button value={type.name} onClick={onClickDelete}>X</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            2 types maximum
          </div>
          <div>
            {errors.types && errors.types}
          </div>
        </div>

       
        <div>
          <form>
            <div>
              <span>HP</span>
              <input type="range" defaultValue={input.hp} name="hp" onChange={onChangeRange}
                min={0} max={999} value={input.hp} />
              <span>{input.hp}</span>
            </div>
            <div>
              <span>ATTACK</span>
              <input type="range" defaultValue={input.attack} name="attack" onChange={onChangeRange}
                min={0} max={999} value={input.attack} />
              <span>{input.attack}</span>
            </div>
            <div>
              <span>DEFENSE</span>
              <input type="range" defaultValue={input.defense} name="defense" onChange={onChangeRange}
                min={0} max={999} value={input.defense} />
              <span>{input.defense}</span>
            </div>
            <div>
              <span>SPEED</span>
              <input type="range" defaultValue={input.speed} name="speed" onChange={onChangeRange}
                min={0} max={999} value={input.speed} />
              <span>{input.speed}</span>
            </div>
            <div>
              <span>HEIGHT</span>
              <input type="range" defaultValue={input.height} name="height" onChange={onChangeRange}
                min={0} max={999} value={input.height} />
              <span>{input.height}</span>
            </div>
            <div>
              <span>WEIGHT</span>
              <input type="range" defaultValue={input.weight} name="weight" onChange={onChangeRange}
                min={0} max={999} value={input.weight} />
              <span>{input.weight}</span>
            </div>
          </form>
        </div>

        <div>
          <input onClick={onClickCreate} type="submit" name="submit" value="CREATE" id="submitCreate" />
        </div>

      </div>
      <div>
        <div>
          <span>CARD PREVIEW</span>
          <div>
            <Pokemon name={input.name} image={input.image} height={input.height} weight={input.weight} hp={input.hp} attack={input.attack} defense={input.defense} speed={input.speed} types={input.types} />
          </div>
        </div>
      </div>

    </div>
  </div>
);
}
export default FormPage;