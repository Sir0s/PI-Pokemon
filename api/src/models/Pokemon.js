const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
   
    id :{
      type: DataTypes.UUID,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    imagen: {
      type: DataTypes.STRING,
    },
    vida: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ataque: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    defensa: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    velocidad: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    altura: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    peso: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

  },
  {
    timestamps:false,
  });
};
