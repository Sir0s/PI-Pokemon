import React from "react";
import styles from "./Pokemon.module.css"

export default function Pokemon(props) {
  
  return (
    
    <div className={styles.card} key={props.id}>
     
      <div >
        <h2 className="card-name">{props.name}</h2>
      </div>
      <div>
        <img className={styles.image} src={props.image} alt={props.name} />
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
        {props.types && props.types.map((types, index) => {
            return <span key={index}>type {index+1}: {types.name} <br /> </span>; //types de la api vienen type=[{},{}]
          })}
      </div>
      <div>
        {props.typesDB && props.typesDB.map((types, index) => {
            return <span key={index}>type {index+1}: {types.name} <br /> </span>; //types de la db vienen como Types=[{},{}] (tienen distinto)
          })}
      </div>
      
      
    </div>
  );
}
