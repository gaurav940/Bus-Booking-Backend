
'use strict';
module.exports = (sequelize, Sequelize) => {
  const BusDate = sequelize.define("BusDate", {
    bDate: {
      type: Sequelize.DATE,
      allowNull: false
    },

    seats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
    { timestamps: false }
  );

  BusDate.associate = (models) => {
    BusDate.belongsTo(models.Bus, {
      foreignKey: 'BusID',
      allowNull: false
    });
  }



  return BusDate;
};