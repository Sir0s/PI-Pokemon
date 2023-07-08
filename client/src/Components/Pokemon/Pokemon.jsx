import React from "react";

export default function Pokemon(props) {
  
  return (
    <div>
      <div>
        <h2>{props.name}</h2>
      </div>
      <div>
        <img src={props.image} alt={props.name} />
      </div>
      <div>
        <span>Attack: {props.attack}</span>
      </div>
      <div>
        <span>Defense: {props.defense}</span>
      </div>
      <div>
        <span>HP: {props.hp}</span>
      </div>
      <div>
        <span>Height: {props.height}</span>
      </div>
      <div>
        <span>Weight: {props.weight}</span>
      </div>
      <div>
        {props.types && props.types.map((type, index) => {
            return <span key={index}>{type.name} </span>;
          })}
      </div>
    </div>
  );
}
