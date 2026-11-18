
import "./estoque.css";
import "./registrarInsumo.css";
import "./detalhesInsumo.css";

import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Select from "../../componentes/Select/Select.jsx";

import { useState, useEffect } from "react";

function Estoque() {
    // Dados do estoque
    const [insumos, setInsumos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    // Filtros
    const [busca, setBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    // Modais
    const [modalNovoInsumoAberto, setModalNovoInsumoAberto] = useState(false);
    const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
    const [insumoSelecionado, setInsumoSelecionado] = useState(null);

    // Buscar estoque no backend
    useEffect(() => {
        fetch("http://localhost:3000/estoque")
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Erro ao buscar os insumos");
                }
                return resposta.json();
            })
            .then((dados) => {
                if (Array.isArray(dados.data)) {
                    setInsumos(dados.data);
                }
            })
            .catch((erro) => {
                console.error(erro);
                setErro("Não foi possível carregar o estoque.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);

    // Filtrar insumos
    const insumosFiltrados = insumos.filter((insumo) => {
        const correspondeCategoria =
            !categoriaSelecionada ||
            categoriaSelecionada === "Todos" ||
            insumo.categoria === categoriaSelecionada;

        const correspondeBusca =
            !busca ||
            insumo.nome?.toLowerCase().includes(busca.toLowerCase());

        return correspondeCategoria && correspondeBusca;
    });

    // Calcular insumos abaixo do mínimo
    const abaixoMinimo = insumos.filter(
        (insumo) =>
            Number(insumo.quantidade) <= Number(insumo.minimo)
    ).length;

    // Formatar data
    const formatarDataBR = (dataIso) => {
        if (!dataIso) return "";

        const partes = dataIso.split("T")[0].split("-");

        if (partes.length !== 3) return dataIso;

        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    };

    // Abrir detalhes
    const abrirDetalhes = (insumo) => {
        setInsumoSelecionado(insumo);
        setModalDetalhesAberto(true);
    };

    return (
        <div className="tudoEstoque">

            <Sidebar paginaAtiva="Estoque" />

            <div className="tudoMenosSidebar">

                <Header nomeIndustria="Sweet Sunset" />

                <div className="conteudoEstoque conteudoEstoque2">

                    <h1 className="tituloEstoque">
                        Estoque de insumos
                    </h1>

                    <p className="subtituloEstoque">
                        Controle por lote e validade — sistema PEPS
                        (usar primeiro o mais antigo)
                    </p>

                    <div className="barraFiltros">

                        <div className="ladoEsquerdoFiltros">

                            <div className="buscaComIcone">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#870B22"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m21 21-4.34-4.34" />
                                    <circle cx="11" cy="11" r="8" />
                                </svg>

                                <Input
                                    placeholder="Buscar insumo.."
                                    required={false}
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />

                            </div>

                            <div className="avisoMinimo">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ffffff"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                                    <path d="M12 9v4" />
                                    <path d="M12 17h.01" />
                                </svg>

                                {abaixoMinimo} abaixo do mínimo

                            </div>

                        </div>

                        <div className="ladoDireitoFiltros">

                            <Select
                                id="selectFiltroInsumo"
                                options={[
                                    "Todos",
                                    "Farinhas e massas",
                                    "Cacau e chocolates",
                                    "Laticínios",
                                    "Ovos e derivados",
                                    "Gorduras/óleos",
                                    "Fermentos",
                                    "Frutas",
                                    "Confeitos e finalizações",
                                    "Essências e aromatizantes",
                                    "Corantes",
                                    "Embalagens",
                                    "Decorações",
                                    "Outros"
                                ]}
                                onChange={(e) =>
                                    setCategoriaSelecionada(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                onClick={() => setModalNovoInsumoAberto(true)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer"
                                }}
                            >
                                <Button texto="Novo insumo" />
                            </button>

                        </div>

                    </div>

                    <table className="tabelaEstoque">

                        <thead>
                            <tr>
                                <th>Insumo</th>
                                <th>Lote</th>
                                <th>Quantidade</th>
                                <th>Mínimo</th>
                                <th>Validade</th>
                                <th>Custo un.</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {carregando && (
                                <tr>
                                    <td colSpan="7">
                                        Carregando estoque...
                                    </td>
                                </tr>
                            )}

                            {erro && (
                                <tr>
                                    <td colSpan="7">{erro}</td>
                                </tr>
                            )}

                            {!carregando && !erro &&
                                insumosFiltrados.length === 0 && (
                                    <tr>
                                        <td colSpan="7">
                                            Nenhum insumo encontrado.
                                        </td>
                                    </tr>
                                )}

                            {!carregando && !erro &&
                                insumosFiltrados.map((insumo, index) => (

                                    <tr key={insumo.id || index}>

                                        <td>
                                            <span
                                                onClick={() => abrirDetalhes(insumo)}
                                                className="botaoDetalhesInsumo"
                                                style={{ cursor: "pointer" }}
                                            >
                                                {insumo.nome}
                                            </span>
                                        </td>

                                        <td className="loteInsumo">
                                            {insumo.lote}
                                        </td>

                                        <td>{insumo.quantidade}</td>

                                        <td>{insumo.minimo}</td>

                                        <td>
                                            {formatarDataBR(insumo.validade)}
                                        </td>

                                        <td>
                                            R$ {Number(insumo.custo).toFixed(2)}
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    "statusReposicao " +
                                                    insumo.status?.toLowerCase()
                                                }
                                            >
                                                {insumo.status}
                                            </span>
                                        </td>

                                    </tr>

                                ))}

                        </tbody>

                    </table>

                </div>
            </div>

            {/* Os dois modais devem permanecer aqui */}

            {/* Mantenha o modal de novo insumo da sua versão atual */}

            {/* Mantenha o modal de detalhes da sua versão atual */}

        </div>
    );
}

export default Estoque;
