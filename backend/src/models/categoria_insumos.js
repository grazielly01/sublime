const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const categoria_insumos = sequelize.define(
    "categoria_insumos",
    {
        id_categoria_insumos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome_categoria_insumos: {
            type: DataTypes.STRING(60)
        }
    },
    {
        tableName: "categoria_insumos",
        timestamps: false
    }
);

module.exports = categoria_insumos;