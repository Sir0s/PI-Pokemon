  import React from 'react';
  import styles from './Pokemon.module.css';

  export default function Pokemon(props) {
    //eslint-disable-next-line
    const { name, image, attack, defense, hp, height, weight, types } = props;

    return (
      <div className={styles.card}>
        <div className={styles.card2}>
        <div>
          <h2 className={styles.name}>{name}</h2>
        </div>
        <div>
          <img className={styles.image} src={image} />
        </div>
        {/* <div>
          <span>Attack: {attack}</span>
        </div>
        <div>
          <span>Defense: {defense}</span>
        </div>
        <div>
          <span>HP: {hp}</span>
        </div>
        <div>
          <span>Height: {height}</span>
        </div>
        <div>
          <span>Weight: {weight}</span>
        </div>  */}
        <div>
              {types &&
                types.map((type, index) => {
                  return (
                    <span>
                      Type {index+1}: {type} <br />
                    </span>
                  );
                })}
            </div>
            </div>
      </div>
    );
  }