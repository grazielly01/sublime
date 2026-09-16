const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const fornecedores = sequelize.define(
    "fornecedores",
    {
        id_fornecedor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        cnpj_fornecedor: {
            type: DataTypes.STRING(14)
        }
    },
    {
        tableName: "fornecedores",
        timestamps: false
    }
);

module.exports = fornecedores;