const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const categoria_evento_tabela = sequelize.define(
    "categoria_evento_tabela",
    {
        id_categoria_evento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome_categoria_evento: {
            type: DataTypes.STRING(30)
        }
    },
    {
        tableName: "categoria_evento_tabela",
        timestamps: false
    }
);

module.exports = categoria_evento_tabela;