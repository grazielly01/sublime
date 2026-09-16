const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const usuario = sequelize.define(
    "usuario",
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome_usuario: {
            type: DataTypes.STRING(60)
        },

        telefone_usuario: {
            type: DataTypes.CHAR(15)
        },

        plano_usuario: {
            type: DataTypes.CHAR(15)
        },

        email_usuario: {
            type: DataTypes.STRING(30)
        },

        nome_fabrica_usuario: {
            type: DataTypes.STRING(60)
        },

        cargo_usuario: {
            type: DataTypes.STRING(40)
        }
    },
    {
        tableName: "usuario",
        timestamps: false
    }
);

module.exports = usuario;