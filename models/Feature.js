
'use strict';
module.exports = (sequelize, Sequelize) => {
  const Feature = sequelize.define("Feature", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    value: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
  },
    { timestamps: false }
  );

  Feature.associate = (models) => {
    Feature.belongsTo(models.Bus, {
      foreignKey: 'BusID',
      allowNull: false
    });
  }



  return Feature;
};