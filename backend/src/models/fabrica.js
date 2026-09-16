const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const fabrica = sequelize.define(
    "fabrica",
    {
        id_fabrica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome_fabrica: {
            type: DataTypes.STRING(80)
        }
    },
    {
        tableName: "fabrica",
        timestamps: false
    }
);

module.exports = fabrica;