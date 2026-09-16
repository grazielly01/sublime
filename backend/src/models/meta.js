const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const meta = sequelize.define(
    "meta",
    {
        id_meta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        titulo_meta: {
            type: DataTypes.STRING(60)
        },

        prazo_meta: {
            type: DataTypes.DATEONLY
        },

        qtde_meta: {
            type: DataTypes.INTEGER
        },

        descricao_meta: {
            type: DataTypes.STRING(80)
        }
    },
    {
        tableName: "meta",
        timestamps: false
    }
);

module.exports = meta;