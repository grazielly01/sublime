const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const entradas = sequelize.define(
    "entradas",
    {
        id_entrada: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome_entrada: {
            type: DataTypes.STRING(30)
        },

        data_entrada: {
            type: DataTypes.DATEONLY
        },

        categoria_entrada: {
            type: DataTypes.STRING(40)
        },

        valor_entrada: {
            type: DataTypes.DECIMAL
        },

        obs_entrada: {
            type: DataTypes.STRING(90)
        }
    },
    {
        tableName: "entradas",
        timestamps: false
    }
);

module.exports = entradas;