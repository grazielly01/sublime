import "./estoque.css";
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
                                    "Frutas" ,
                                    "Confeitos e finalizações",
                                    "Essências e aromatizantes",
                                    "Corantes",
                                    "Embalagens",
                                    "Decorações",
                                    "Outros"
                                ]}
                                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                            />

                            <Link to="/estoque/registrar" className="botaoNovoInsumo">
                                <Button texto="+ Novo insumo"></Button>
                            </Link>
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
                                    </td>
                                    <td className="loteInsumo">{insumo.lote}</td>
                                    <td>{insumo.quantidade}</td>
                                    <td>{insumo.minimo}</td>
                                    
                                    {/* CORREÇÃO DA DATA: Mostra DD/MM/AAAA redondinho */}
                                    <td>{formatarDataBR(insumo.validade)}</td>

                                    <td>R$ {Number(insumo.custo).toFixed(2)}</td>

                                    <td>
                                        {/* CONCATENAÇÃO ORIGINAL MANTIDA: Força minúsculo no CSS para ler a bolinha e a cor */}
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
        </div>
    );
}

export default Estoque;
