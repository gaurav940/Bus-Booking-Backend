
'use strict';

const busRoute = require("./busRoute");
const Feature = require("./Feature")

module.exports = (sequelize, Sequelize) => {
    const Bus = sequelize.define("Bus", {
        Bus_Name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        source: {
            type: Sequelize.STRING,
            allowNull: false
        },
        destination: {
            type: Sequelize.STRING,
            allowNull: false
        },
        seats: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        seatType: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
        { timestamps: false }
    );


    Bus.associate = (models) => {
        Bus.hasMany(models.busRoute, {
            foreignKey: 'BusID',
            allowNull: false
        });


        Bus.hasMany(models.Feature, {
            foreignKey: 'BusID',
            allowNull: false
        });
    }
    return Bus;
};