import "./estoque.css";
import { Link } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      
import Button from "../../componentes/Button/Button.jsx";   
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  
import Header from "../../componentes/Header/Header.jsx";  
import { motion } from "motion/react";
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

    // Estado para controlar a abertura do pop-up de Novo Insumo
    const [modalNovoInsumoAberto, setModalNovoInsumoAberto] = useState(false);

    // Estados do formulário do novo insumo
    const [nome, setNome] = useState("");
    const [validade, setValidade] = useState("");
    const [lote, setLote] = useState("");
    const [categoria, setCategoria] = useState("");
    const [custo, setCusto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [minimo, setMinimo] = useState("");

    // Buscar os insumos do backend quando a página abrir
    useEffect(() => {
        carregarEstoque();
    }, []);

    const carregarEstoque = () => {
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
    };

    // Função para registrar o novo insumo via API
    const handleRegistrarInsumo = (e) => {
        e.preventDefault();
        
        const novoInsumo = {
            nome,
            validade,
            lote,
            categoria: categoria || "Outros",
            custo: Number(custo),
            quantidade: Number(quantidade),
            minimo: Number(minimo),
            status: Number(quantidade) <= Number(minimo) ? "Repor" : "OK"
        };

        fetch("http://localhost:3000/estoque", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoInsumo)
        })
        .then((res) => {
            if (res.ok) {
                setModalNovoInsumoAberto(false);
                // Limpar campos
                setNome(""); setValidade(""); setLote(""); setCusto(""); setQuantidade(""); setMinimo("");
                carregarEstoque(); // Atualiza a tabela
            } else {
                alert("Erro ao salvar insumo.");
            }
        })
        .catch((err) => console.error(err));
    };

    // Lógica inteligente de filtragem
    const insumosFiltrados = Array.isArray(insumos)
        ? insumos.filter((insumo) => {
            const correspondeCategoria = !categoriaSelecionada || categoriaSelecionada === "Todos" || categoriaSelecionada === "Selecione uma opção" || insumo.categoria === categoriaSelecionada;
            const correspondeBusca = !busca || insumo.nome?.toLowerCase().includes(busca.toLowerCase());
            return correspondeCategoria && correspondeBusca;
        })
        : [];

    const abaixoMinimo = Array.isArray(insumos)
        ? insumos.filter((insumo) => Number(insumo.quantidade) <= Number(insumo.minimo)).length
        : 0;

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
                    <h1 className="tituloEstoque">Estoque de insumos</h1>
                    <p className="subtituloEstoque">Controle por lote e validade — sistema PEPS (usar primeiro o mais antigo)</p>

                    <div className="barraFiltros">

                        <div className="ladoEsquerdoFiltros">

                            <div className="buscaComIcone">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                                    <path d="m21 21-4.34-4.34"/>
                                    <circle cx="11" cy="11" r="8"/>
                                </svg>

                                <Input
                                    placeholder="Buscar insumo.."
                                    required={false}
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />

                            </div>

                            <div className="avisoMinimo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert">
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
                                    <path d="M12 9v4"/>
                                    <path d="M12 17h.01"/>
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

                            {/* Botão aciona a abertura do pop-up modal */}
                            <button 
                                type="button" 
                                className="botaoAbrirModalInsumo"
                                onClick={() => setModalNovoInsumoAberto(true)}
                            >
                                Novo insumo
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
                                <tr><td colSpan="7">Carregando estoque...</td></tr>
                            )}
                            {erro && (
                                <tr><td colSpan="7">{erro}</td></tr>
                            )}
                            {!carregando && !erro && insumosFiltrados.length === 0 && (
                                <tr><td colSpan="7">Nenhum insumo encontrado.</td></tr>
                            )}
                            {!carregando && !erro && insumosFiltrados.map((insumo, index) => (
                                <tr key={insumo.id || index}>
                                    <td>
                                        <Link to="/estoque/detalhes" className="botaoDetalhesInsumo">
                                            {insumo.nome}
                                        </Link>
                                    </td>
                                    <td className="loteInsumo">{insumo.lote}</td>
                                    <td>{insumo.quantidade}</td>
                                    <td>{insumo.minimo}</td>
                                    <td>{formatarDataBR(insumo.validade)}</td>
                                    <td>R$ {Number(insumo.custo).toFixed(2)}</td>
                                    <td>
                                        <span className={"statusReposicao " + insumo.status?.toLowerCase()}>
                                            {insumo.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>

            {/* =====================================================
               POP-UP MODAL: REGISTRAR NOVO INSUMO
            ===================================================== */}
            {modalNovoInsumoAberto && (
                <div className="modalOverlay">
                    <div className="modalConteudo" style={{ maxWidth: "900px", width: "90%", padding: "32px" }}>
                        <div className="modalCabecalho" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 style={{ fontSize: "24px", color: "#870B22", margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 700 }}>
                                Registrar novo insumo
                            </h2>
                            <button
                                type="button"
                                className="botaoFecharModal"
                                onClick={() => setModalNovoInsumoAberto(false)}
                                style={{ background: "none", border: "none", fontSize: "26px", cursor: "pointer", color: "#870B22" }}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modalCorpo">
                            <form onSubmit={handleRegistrarInsumo} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ fontWeight: 600, fontSize: "14px" }}>Nome do insumo</label>
                                        <input
                                            type="text"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            placeholder="Digite aqui o nome do insumo..."
                                            required
                                            style={{ height: "46px", padding: "0 14px", border: "1px solid #870B22", borderRadius: "10px", outline: "none" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ fontWeight: 600, fontSize: "14px" }}>Validade</label>
                                        <input
                                            type="text"
                                            value={validade}
                                            onChange={(e) => setValidade(e.target.value)}
                                            placeholder="DD/MM/AAAA"
                                            required
                                            style={{ height: "46px", padding: "0 14px", border: "1px solid #870B22", borderRadius: "10px", outline: "none" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ fontWeight: 600, fontSize: "14px" }}>Lote</label>
                                        <input
                                            type="text"
                                            value={lote}
                                            onChange={(e) => setLote(e.target.value)}
                                            placeholder="LT-0000"
                                            required
                                            style={{ height: "46px", padding: "0 14px", border: "1px solid #870B22", borderRadius: "10px", outline: "none" }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: "16px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ fontWeight: 600, fontSize: "14px" }}>Categoria</label>
                                        <select
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)}
                                            required
                                            style={{ height: "46px", padding: "0 12px", border: "1px solid #870B22", borderRadius: "10px", background: "#fff", outline: "none" }}
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Farinhas e massas">Farinhas e massas</option>
                                            <option value="Cacau e chocolates">Cacau e chocolates</option>
                                            <option value="Laticínios">Laticínios</option>
                                            <option value="Ovos e derivados">Ovos e derivados</option>
                                            <option value="Gorduras/óleos">Gorduras/óleos</option>
                                            <option value="Fermentos">Fermentos</option>
                                            <option value="Frutas">Frutas</option>
                                            <option value="Confeitos e finalizações">Confeitos e finalizações</option>
                                            <option value="Essências e aromatizantes">Essências e aromatizantes</option>
                                            <option value="Corantes">Corantes</option>
                                            <option value="Embalagens">Embalagens</option>
                                            <option value="Decorações">Decorações</option>
                                            <option value="Outros">Outros</option>
                                        </select>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ fontWeight: 600, fontSize: "14px" }}>Custo unitário</label>
                                        <input
                                            type="text"
                                            value={custo}
                                            onChange={(e) => setCusto(e.target.value)}
                                            placeholder="R$ 0,00"
                                            required
                                            style={{ height: "46px", padding: "0 14px", border: "1px solid #870B22", borderRadius: "10px", outline: "none" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ fontWeight: 600, fontSize: "14px" }}>Quantidade</label>
                                        <input
                                            type="number"
                                            value={quantidade}
                                            onChange={(e) => setQuantidade(e.target.value)}
                                            placeholder="00"
                                            required
                                            style={{ height: "46px", padding: "0 14px", border: "1px solid #870B22", borderRadius: "10px", outline: "none" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <label style={{ fontWeight: 600, fontSize: "14px" }}>Qtd. mínima</label>
                                        <input
                                            type="number"
                                            value={minimo}
                                            onChange={(e) => setMinimo(e.target.value)}
                                            placeholder="00"
                                            required
                                            style={{ height: "46px", padding: "0 14px", border: "1px solid #870B22", borderRadius: "10px", outline: "none" }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                                    <button
                                        type="button"
                                        onClick={() => setModalNovoInsumoAberto(false)}
                                        style={{ padding: "12px 24px", borderRadius: "999px", border: "1px solid #870B22", background: "#fff", color: "#870B22", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        style={{ padding: "12px 28px", borderRadius: "999px", border: "none", background: "#870B22", color: "#fff", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
                                    >
                                        Registrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Estoque;