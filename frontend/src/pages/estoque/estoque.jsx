import "./estoque.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import Input from "../../componentes/Input/Input.jsx";      /*Importando o componente input da pasta componentes. APROVADO*/
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import { motion } from "motion/react";
import Select from "../../componentes/Select/Select.jsx";
import {useState, useEffect} from "react";

function Estoque() {
    // Estados para armazenar os dados do estoque
    const [insumos, setInsumos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    
    // Estados mínimos para controlar os seletores de filtros
    const [busca, setBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

    // Buscar os insumos do backend quando a página abrir
    useEffect(() => {
        fetch("http://localhost:3000/estoque")
            .then((resposta) => {
                if (!resposta.ok) {
                    throw new Error("Erro ao buscar os insumos");
                }
                return resposta.json();
            })
            .then((dados) => {
                if (dados && Array.isArray(dados.data)) {
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

    // Lógica inteligente de filtragem baseada nas propriedades reais do backend
    const insumosFiltrados = Array.isArray(insumos)
        ? insumos.filter((insumo) => {
            const correspondeCategoria = !categoriaSelecionada || categoriaSelecionada === "Todos" || categoriaSelecionada === "Selecione uma opção" || insumo.categoria === categoriaSelecionada;
            const correspondeBusca = !busca || insumo.nome?.toLowerCase().includes(busca.toLowerCase());
            return correspondeCategoria && correspondeBusca;
        })
        : [];

    // Calcular quantos insumos estão abaixo do mínimo dinamicamente
    const abaixoMinimo = Array.isArray(insumos)
        ? insumos.filter((insumo) => Number(insumo.quantidade) <= Number(insumo.minimo)).length
        : 0;

    // Função local simples para deixar a data ISO do Node limpa (DD/MM/AAAA)
    const formatarDataBR = (dataIso) => {
        if (!dataIso) return "";
        const partes = dataIso.split("T")[0].split("-");
        if (partes.length !== 3) return dataIso;
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    };
=======
import "./registrarInsumo.css";
import "./detalhesInsumo.css";
import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { motion } from "motion/react";
import Select from "../../componentes/Select/Select.jsx";
import { useState } from "react";

function Estoque() {
    // Estados para controlar os modais
    const [modalNovoInsumoAberto, setModalNovoInsumoAberto] = useState(false);
    const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
    const [insumoSelecionado, setInsumoSelecionado] = useState(null);

    const insumos = [
        { nome: "Chocolate ao leite Callebaut 80g", lote: "LT-0421", quantidade: "52", minimo: "15", validade: "12/08/2026", custo: "R$ 78.50", status: "ok", categoria: "Cacau e chocolates" },
        { nome: "Farinha de trigo especial 300g", lote: "LT-0425", quantidade: "2", minimo: "6", validade: "30/11/2026", custo: "R$ 142.00", status: "repor", categoria: "Farinhas e massas" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0414", quantidade: "104", minimo: "60", validade: "20/01/2027", custo: "R$ 8.90", status: "ok", categoria: "Laticínios" },
        { nome: "Ovos brancos tipo extra 12unid", lote: "LT-0428", quantidade: "1053", minimo: "1200", validade: "02/06/2026", custo: "R$ 0.55", status: "repor", categoria: "Ovos e derivados" },
        { nome: "Fermento químico 10g", lote: "LT-0410", quantidade: "28", minimo: "30", validade: "15/09/2026", custo: "R$ 36.00", status: "repor", categoria: "Fermentos" },
        { nome: "Creme de leite UHT 400ml", lote: "LT-0416", quantidade: "82", minimo: "80", validade: "18/12/2026", custo: "R$ 4.20", status: "ok", categoria: "Laticínios" },
        { nome: "Açúcar refinado 2kg", lote: "LT-0419", quantidade: "27", minimo: "8", validade: "05/03/2027", custo: "R$ 98.00", status: "ok", categoria: "Outros" },
        { nome: "Manteiga sem sal 1kg", lote: "LT-0422", quantidade: "19", minimo: "20", validade: "25/07/2026", custo: "R$ 52.00", status: "repor", categoria: "Gorduras/óleos" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0426", quantidade: "104", minimo: "60", validade: "11/09/2026", custo: "R$ 8.90", status: "ok", categoria: "Laticínios" },
        { nome: "Chocolate ao leite Callebaut 80g", lote: "LT-0421", quantidade: "52", minimo: "15", validade: "12/08/2026", custo: "R$ 78.50", status: "ok", categoria: "Cacau e chocolates" },
        { nome: "Farinha de trigo especial 300g", lote: "LT-0425", quantidade: "2", minimo: "6", validade: "30/11/2026", custo: "R$ 142.00", status: "repor", categoria: "Farinhas e massas" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0414", quantidade: "104", minimo: "60", validade: "20/01/2027", custo: "R$ 8.90", status: "ok", categoria: "Laticínios" },
        { nome: "Ovos brancos tipo extra 12unid", lote: "LT-0413", quantidade: "1053", minimo: "1200", validade: "02/06/2026", custo: "R$ 0.55", status: "repor", categoria: "Ovos e derivados" },
        { nome: "Fermento químico 10g", lote: "LT-0410", quantidade: "28", minimo: "5", validade: "15/09/2026", custo: "R$ 36.00", status: "repor", categoria: "Fermentos" },
        { nome: "Creme de leite UHT 400ml", lote: "LT-0416", quantidade: "82", minimo: "80", validade: "18/12/2026", custo: "R$ 4.20", status: "ok", categoria: "Laticínios" },
        { nome: "Açúcar refinado 2kg", lote: "LT-0419", quantidade: "27", minimo: "8", validade: "05/03/2027", custo: "R$ 98.00", status: "ok", categoria: "Outros" },
        { nome: "Manteiga sem sal 1kg", lote: "LT-0422", quantidade: "19", minimo: "20", validade: "25/07/2026", custo: "R$ 52.00", status: "repor", categoria: "Gorduras/óleos" },
        { nome: "Leite condensado Moça 395g", lote: "LT-0426", quantidade: "104", minimo: "60", validade: "11/09/2026", custo: "R$ 8.90", status: "ok", categoria: "Laticínios" },
    ];
>>>>>>> b5fc5d4 (POP-UP ESTOQUE)

    const abrirDetalhes = (insumo) => {
        setInsumoSelecionado(insumo);
        setModalDetalhesAberto(true);
    };

    return (
<<<<<<< HEAD
        <div className="tudoEstoque"> 

            <Sidebar paginaAtiva="Estoque" /> 

            <div className="tudoMenosSidebar"> 

                <Header nomeIndustria="Sweet Sunset" /> 

                <div className="conteudoEstoque conteudoEstoque2"> 
=======
        <div className="tudoEstoque">
            <Sidebar paginaAtiva="Estoque" />

            <div className="tudoMenosSidebar">
                <Header nomeIndustria="Sweet Sunset" />
>>>>>>> b5fc5d4 (POP-UP ESTOQUE)

                <div className="conteudoEstoque conteudoEstoque2">
                    <h1 className="tituloEstoque">Estoque de insumos</h1>
                    <p className="subtituloEstoque">Controle por lote e validade — sistema PEPS (usar primeiro o mais antigo)</p>

                    <div className="barraFiltros">
                        <div className="ladoEsquerdoFiltros">
                            <div className="buscaComIcone">
<<<<<<< HEAD
                                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search">
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
                                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert-icon lucide-triangle-alert">
=======
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#870B22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search">
                                    <path d="m21 21-4.34-4.34"/>
                                    <circle cx="11" cy="11" r="8"/>
                                </svg>
                                <Input placeholder="Buscar insumo.." required={false} />
                            </div>

                            <div className="avisoMinimo">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert-icon lucide-triangle-alert">
>>>>>>> b5fc5d4 (POP-UP ESTOQUE)
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
                                    <path d="M12 9v4"/>
                                    <path d="M12 17h.01"/>
                                </svg>
<<<<<<< HEAD
                                {abaixoMinimo} abaixo do mínimo
=======
                                8 abaixo do mínimo
>>>>>>> b5fc5d4 (POP-UP ESTOQUE)
                            </div>
                        </div>

                        <div className="ladoDireitoFiltros">
<<<<<<< HEAD
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
                                    "Frutas" ,
                                    "Confeitos e finalizações",
                                    "Essências e aromatizantes",
                                    "Corantes",
                                    "Embalagens",
                                    "Decorações",
                                    "Outros"
                                ]}
                                onChange={(e) => setCategoriaSelecionada(e.target.value)}
=======
                            <Select id="selectFiltroInsumo" options={[
                                "Farinhas e massas", "Cacau e chocolates", "Laticínios",
                                "Ovos e derivados", "Gorduras/óleos", "Fermentos",
                                "Frutas" , "Confeitos e finalizações", "Essências e aromatizantes",
                                "Corantes", "Embalagens", "Decorações", "Outros"]}
>>>>>>> b5fc5d4 (POP-UP ESTOQUE)
                            />

                            <button type="button" onClick={() => setModalNovoInsumoAberto(true)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
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
<<<<<<< HEAD
                            {carregando && (
                                <tr>
                                    <td colSpan="7">Carregando estoque...</td>
                                </tr>
                            )}

                            {erro && (
                                <tr>
                                    <td colSpan="7">{erro}</td>
                                </tr>
                            )}

                            {!carregando && !erro && insumosFiltrados.length === 0 && (
                                <tr>
                                    <td colSpan="7">Nenhum insumo encontrado.</td>
                                </tr>
                            )}

                            {!carregando && !erro && insumosFiltrados.map((insumo, index) => (
                                <tr key={insumo.id || index}>
                                    <td>
                                        <Link to="/estoque/detalhes" className="botaoDetalhesInsumo">
                                            {insumo.nome}
                                        </Link>
=======
                            {insumos.map((insumo, index) => (
                                <tr key={index}>
                                    <td>
                                        
                                        <span 
                                            onClick={() => abrirDetalhes(insumo)} 
                                            className="botaoDetalhesInsumo" 
                                            style={{ cursor: "pointer" }}
                                        >
                                            {insumo.nome}
                                        </span>
>>>>>>> b5fc5d4 (POP-UP ESTOQUE)
                                    </td>
                                    <td className="loteInsumo">{insumo.lote}</td>
                                    <td>{insumo.quantidade}</td>
                                    <td>{insumo.minimo}</td>
<<<<<<< HEAD
                                    
                                    {/* CORREÇÃO DA DATA: Mostra DD/MM/AAAA redondinho */}
                                    <td>{formatarDataBR(insumo.validade)}</td>

                                    <td>R$ {Number(insumo.custo).toFixed(2)}</td>

                                    <td>
                                        {/* CONCATENAÇÃO ORIGINAL MANTIDA: Força minúsculo no CSS para ler a bolinha e a cor */}
                                        <span className={"statusReposicao " + insumo.status?.toLowerCase()}>
                                            {insumo.status}
=======
                                    <td>{insumo.validade}</td>
                                    <td>{insumo.custo}</td>
                                    <td>
                                        <span className={"statusReposicao " + insumo.status}>
                                            {insumo.status === "ok" ? "OK" : "Repor"}
>>>>>>> b5fc5d4 (POP-UP ESTOQUE)
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/*pop-up registrar novo insumo*/}
            {modalNovoInsumoAberto && (
                <div className="modalOverlay">
                    <div className="modalConteudo">
                        <div className="modalCabecalho">
                            <h2>Registrar novo insumo</h2>
                            <button className="botaoFecharModal" onClick={() => setModalNovoInsumoAberto(false)}>&times;</button>
                        </div>
                        <div className="modalCorpo">
                            <form className="formModalInsumo" onSubmit={(e) => { e.preventDefault(); setModalNovoInsumoAberto(false); }}>
                                <div className="modalGridLinha1">
                                    <div className="campoRegistrar">
                                        <label>Nome do insumo</label>
                                        <Input placeholder="Digite o nome..." required={true} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Validade</label>
                                        <div className="inputComIcone">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                                <path d="M3 10h18M8 3v4M16 3v4" />
                                            </svg>
                                            <Input id="inputValidade" placeholder="DD/MM/AAAA" required={true} />
                                        </div>
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Lote</label>
                                        <Input placeholder="LT-0000" required={true} />
                                    </div>
                                </div>

                                <div className="modalGridLinha2">
                                    <div className="campoRegistrar">
                                        <label>Categoria</label>
                                        <Select id="selectRegistrarInsumo" required={true} options={[
                                            "Farinhas e massas", "Cacau e chocolates", "Laticínios", 
                                            "Ovos e derivados", "Gorduras/óleos", "Fermentos", 
                                            "Frutas", "Confeitos e finalizações", "Essências", 
                                            "Corantes", "Embalagens", "Decorações", "Outros" 
                                        ]} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Custo un.</label>
                                        <Input placeholder="R$ 0,00" required={true} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Quantidade</label>
                                        <Input placeholder="0" required={true} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Mínimo</label>
                                        <Input placeholder="0" required={true} />
                                    </div>
                                </div>

                                <div className="modalRodopedioBotoes">
                                    <div onClick={() => setModalNovoInsumoAberto(false)} style={{ cursor: "pointer" }}>
                                        <Button texto="Cancelar" className="modalBotaoCancelar" />
                                    </div>
                                    <Button texto="Registrar" className="modalBotaoSalvar" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* pop-up detalhes do insumo*/}
            {modalDetalhesAberto && insumoSelecionado && (
                <div className="modalOverlay">
                    <div className="modalConteudo">
                        <div className="modalCabecalho">
                            <h2>Detalhes do insumo</h2>
                            <button className="botaoFecharModal" onClick={() => setModalDetalhesAberto(false)}>&times;</button>
                        </div>
                        <div className="modalCorpo">
                            <div className="formModalInsumo">
                                <div className="modalGridLinha1">
                                    <div className="campoRegistrar">
                                        <label>Nome do insumo</label>
                                        <Input value={insumoSelecionado.nome} disabled={true} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Validade</label>
                                        <div className="inputComIcone">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="5" width="18" height="16" rx="2" />
                                                <path d="M3 10h18M8 3v4M16 3v4" />
                                            </svg>
                                            <Input id="inputValidade" value={insumoSelecionado.validade} disabled={true} />
                                        </div>
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Lote</label>
                                        <Input value={insumoSelecionado.lote} disabled={true} />
                                    </div>
                                </div>

                                <div className="modalGridLinha2">
                                    <div className="campoRegistrar">
                                        <label>Categoria</label>
                                        <Select id="selectRegistrarInsumo" value={insumoSelecionado.categoria} disabled={true} options={[
                                            "Farinhas e massas", "Cacau e chocolates", "Laticínios", 
                                            "Ovos e derivados", "Gorduras/óleos", "Fermentos", 
                                            "Frutas", "Confeitos e finalizações", "Essências", 
                                            "Corantes", "Embalagens", "Decorações", "Outros" 
                                        ]} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Custo un.</label>
                                        <Input value={insumoSelecionado.custo} disabled={true} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Quantidade</label>
                                        <Input value={insumoSelecionado.quantidade} disabled={true} />
                                    </div>
                                    <div className="campoRegistrar">
                                        <label>Mínimo</label>
                                        <Input value={insumoSelecionado.minimo} disabled={true} />
                                    </div>
                                </div>

                                <div className="modalRodopedioBotoes">
                                    <div onClick={() => setModalDetalhesAberto(false)} style={{ cursor: "pointer" }}>
                                        <Button texto="Excluir" className="modalBotaoCancelar" />
                                    </div>
                                    <Button texto="Editar" className="modalBotaoSalvar" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Estoque;