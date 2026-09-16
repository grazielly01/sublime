const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const cliente = sequelize.define(
    "cliente",
    {
        id_cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome_cliente: {
            type: DataTypes.STRING(80)
        },

        endereco_cliente: {
            type: DataTypes.STRING(180)
        },

        documento_cliente: {
            type: DataTypes.CHAR(20)
        }
    },
    {
        tableName: "cliente",
        timestamps: false
    }
);

module.exports = cliente;