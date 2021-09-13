const Bus = require('./Bus')
'use strict';
module.exports = (sequelize, Sequelize) => {
  const busRoute = sequelize.define("busRoute", {
    dropPoint: {
      type: Sequelize.STRING,
      allowNull: false
    },

    distance: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fare: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  },
    { timestamps: false }
  );

  busRoute.associate = (models) => {
    busRoute.belongsTo(models.Bus, {
      foreignKey: 'BusID',
      allowNull: false
    });
  }

  return busRoute;
};