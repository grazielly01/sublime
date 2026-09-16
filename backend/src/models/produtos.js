const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const produtos = sequelize.define(
    "produtos",
    {
        id_produto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        data_validade_produto: {
            type: DataTypes.DATEONLY
        },

        nome_produto: {
            type: DataTypes.CHAR(80)
        },

        qtde_produto: {
            type: DataTypes.DECIMAL
        },

        preco_unit_produto: {
            type: DataTypes.DECIMAL
        },

        categ_produto: {
            type: DataTypes.INTEGER
        },

        descricao_produto: {
            type: DataTypes.STRING(500)
        },

        receita_produto: {
            type: DataTypes.STRING(2000)
        },

        margem_lucro_produto: {
            type: DataTypes.DECIMAL
        }
    },
    {
        tableName: "produtos",
        timestamps: false
    }
);

module.exports = produtos;