const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const evento = sequelize.define(
    "evento",
    {
        id_evento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        titulo_evento: {
            type: DataTypes.STRING(30)
        },

        data_inicio_evento: {
            type: DataTypes.DATE
        },

        data_fim_evento: {
            type: DataTypes.DATE
        },

        campo_categoria_evento: {
            type: DataTypes.ENUM(
                "produção",
                "entrega",
                "compra",
                "pagamento",
                "outro"
            )
        },

        descricao_evento: {
            type: DataTypes.STRING(90)
        }
    },
    {
        tableName: "evento",
        timestamps: false
    }
);

module.exports = evento;