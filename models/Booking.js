
'use strict';
module.exports = (sequelize, Sequelize) => {
  const Booking = sequelize.define("Booking", {
    Pname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    },

    totalAmount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  
    bDate: {
      type: Sequelize.DATE,
      allowNull: false
    },

    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
    { timestamps: false }
  );


  // Booking.associate = (models) => {
  //   Booking.hasOne(models.Bus, {
  //     foreignKey: 'BusID',
  //     allowNull: false
  //   });

  // Booking.hasOne(models.busRoute, {
  //     foreignKey: 'RouteID',
  //     allowNull: false
  //   });

  // }
  return Booking;
};