import "./estoque.css";
import "./detalhesInsumo.css";
import "./apagarInsumo.css";
import Input from "../../componentes/Input/Input.jsx";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Select from "../../componentes/Select/Select.jsx";
import { useState, useEffect } from "react";

const API_ESTOQUE = "http://localhost:3000/estoque";

function Estoque() {
  const [insumos, setInsumos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Filtros
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [filtrarAbaixoMinimo, setFiltrarAbaixoMinimo] = useState(false);

  // Pop-up Novo Insumo
  const [modalNovoInsumoAberto, setModalNovoInsumoAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [validade, setValidade] = useState("");
  const [lote, setLote] = useState("");
  const [categoria, setCategoria] = useState("");
  const [custo, setCusto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [minimo, setMinimo] = useState("");

  // Pop-up Detalhes do Insumo
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [insumoSelecionado, setInsumoSelecionado] = useState(null);
  const [editandoInsumo, setEditandoInsumo] = useState(false);
  const [formDetalhes, setFormDetalhes] = useState({
    nome: "",
    validade: "",
    lote: "",
    categoria: "Outros",
    custo: "",
    quantidade: "",
    minimo: "",
  });

  // Reposição dentro do pop-up de Detalhes
  const [repondoInsumo, setRepondoInsumo] = useState(false);
  const [qtdReposicao, setQtdReposicao] = useState("");

  // Pop-up Confirmação de Exclusão (apagarInsumo)
  const [modalApagarAberto, setModalApagarAberto] = useState(false);
  const [excluindoInsumo, setExcluindoInsumo] = useState(false);

  useEffect(() => {
    carregarEstoque();
  }, []);


  const normalizarDataParaISO = (textoData) => {
  const limpo = String(textoData || "").trim();
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(limpo)) {
    const [dia, mes, ano] = limpo.split("/");
    return `${ano}-${mes}-${dia}`;
  }
  return limpo;
};

  const carregarEstoque = () => {
    setCarregando(true);
    setErro("");
    fetch(API_ESTOQUE)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error("Erro ao buscar os insumos");
        }
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados?.data)) {
          setInsumos(dados.data);
        } else if (Array.isArray(dados)) {
          setInsumos(dados);
        } else {
          setInsumos([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setErro("Não foi possível carregar o estoque.");
      })
      .finally(() => {
        setCarregando(false);
      });
  };

  const parseMoeda = (valor) => {
    if (typeof valor === "number") return Number.isFinite(valor) ? valor : 0;
    const limpo = String(valor ?? "0")
      .replace(/R\$/gi, "")
      .replace(/\s+/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const num = Number(limpo);
    return Number.isFinite(num) ? num : 0;
  };

  const formatarDataBR = (dataIso) => {
    if (!dataIso) return "";
    const partes = String(dataIso).split("T")[0].split("-");
    if (partes.length !== 3) return dataIso;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const formatarDataInput = (dataValor) => {
    if (!dataValor) return "";
    const texto = String(dataValor).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(texto)) {
      return formatarDataBR(texto);
    }
    return texto;
  };

  const precisaReporItem = (item) => {
    if (!item) return false;
    const statusLower = String(item.status || "").toLowerCase();
    return statusLower === "repor" || Number(item.quantidade) <= Number(item.minimo);
  };

  const handleRegistrarInsumo = (e) => {
    e.preventDefault();

    const qtdNum = Number(quantidade) || 0;
    const minNum = Number(minimo) || 0;

    const novoInsumo = {
      nome,
      validade,
      lote,
      categoria: categoria || "Outros",
      custo: parseMoeda(custo),
      quantidade: qtdNum,
      minimo: minNum,
      status: qtdNum <= minNum ? "Repor" : "OK",
    };

    fetch(API_ESTOQUE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoInsumo),
    })
      .then((res) => {
        if (res.ok) {
          setModalNovoInsumoAberto(false);
          setNome("");
          setValidade("");
          setLote("");
          setCategoria("");
          setCusto("");
          setQuantidade("");
          setMinimo("");
          carregarEstoque();
        } else {
          alert("Erro ao salvar insumo.");
        }
      })
      .catch((err) => console.error(err));
  };

  const abrirDetalhes = (insumo) => {
    setInsumoSelecionado(insumo);
    setFormDetalhes({
      nome: insumo.nome || "",
      validade: formatarDataInput(insumo.validade),
      lote: insumo.lote || "",
      categoria: insumo.categoria || "Outros",
      custo: Number(insumo.custo || 0).toFixed(2).replace(".", ","),
      quantidade: String(insumo.quantidade ?? 0),
      minimo: String(insumo.minimo ?? 0),
    });

    const diferencaMinimo = Math.max(
      1,
      Number(insumo.minimo || 0) - Number(insumo.quantidade || 0)
    );
    setQtdReposicao(String(diferencaMinimo));
    setRepondoInsumo(false);
    setEditandoInsumo(false);
    setModalDetalhesAberto(true);
  };

  const fecharDetalhes = () => {
    setModalDetalhesAberto(false);
    setInsumoSelecionado(null);
    setEditandoInsumo(false);
    setRepondoInsumo(false);
  };

  const persistirAtualizacaoInsumo = async (id, payloadAtualizado) => {
    if (!id) {
      setInsumos((prev) =>
        prev.map((item) =>
          item === insumoSelecionado ? { ...item, ...payloadAtualizado } : item
        )
      );
      setInsumoSelecionado((prev) => (prev ? { ...prev, ...payloadAtualizado } : prev));
      return true;
    }

    const res = await fetch(`${API_ESTOQUE}/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadAtualizado),
    });

    if (!res.ok) {
      throw new Error("Erro ao atualizar insumo.");
    }

    await carregarEstoque();
    setInsumoSelecionado((prev) => (prev ? { ...prev, ...payloadAtualizado } : prev));
    return true;
  };

  const handleSalvarDetalhes = async () => {
    if (!insumoSelecionado) return;
    const qtdNum = Number(formDetalhes.quantidade) || 0;
    const minNum = Number(formDetalhes.minimo) || 0;

    const payload = {
      ...insumoSelecionado,
      nome: formDetalhes.nome.trim(),
      validade: formDetalhes.validade.trim(),
      lote: formDetalhes.lote.trim(),
      categoria: formDetalhes.categoria || "Outros",
      custo: parseMoeda(formDetalhes.custo),
      quantidade: qtdNum,
      minimo: minNum,
      status: qtdNum <= minNum ? "Repor" : "OK",
    };

    try {
      await persistirAtualizacaoInsumo(insumoSelecionado.id, payload);
      setEditandoInsumo(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmarReposicao = async (e) => {
    e.preventDefault();
    if (!insumoSelecionado) return;

    const adicionarQtd = Number(qtdReposicao) || 0;
    if (adicionarQtd <= 0) {
      alert("Informe uma quantidade válida para repor.");
      return;
    }

    const novaQuantidade = Number(insumoSelecionado.quantidade || 0) + adicionarQtd;
    const minNum = Number(insumoSelecionado.minimo || 0);
    const novoStatus = novaQuantidade <= minNum ? "Repor" : "OK";

    const payload = {
      ...insumoSelecionado,
      quantidade: novaQuantidade,
      status: novoStatus,
    };

    try {
      await persistirAtualizacaoInsumo(insumoSelecionado.id, payload);
      setFormDetalhes((prev) => ({ ...prev, quantidade: String(novaQuantidade) }));
      setRepondoInsumo(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleConfirmarExclusao = async () => {
    if (!insumoSelecionado) return;
    setExcluindoInsumo(true);

    try {
      if (insumoSelecionado.id) {
        const res = await fetch(
          `${API_ESTOQUE}/${encodeURIComponent(insumoSelecionado.id)}`,
          { method: "DELETE" }
        );
        if (!res.ok && res.status !== 404) {
          throw new Error("Erro ao excluir insumo.");
        }
        await carregarEstoque();
      } else {
        setInsumos((prev) => prev.filter((item) => item !== insumoSelecionado));
      }

      setModalApagarAberto(false);
      fecharDetalhes();
    } catch (err) {
      alert(err.message);
    } finally {
      setExcluindoInsumo(false);
    }
  };

  const insumosFiltrados = Array.isArray(insumos)
    ? insumos.filter((insumo) => {
        const correspondeCategoria =
          !categoriaSelecionada ||
          categoriaSelecionada === "Todos" ||
          categoriaSelecionada === "Selecione uma opção" ||
          insumo.categoria === categoriaSelecionada;

        const correspondeBusca =
          !busca || insumo.nome?.toLowerCase().includes(busca.toLowerCase());

        const correspondeMinimo =
          !filtrarAbaixoMinimo || precisaReporItem(insumo);

        return correspondeCategoria && correspondeBusca && correspondeMinimo;
      })
    : [];

  const abaixoMinimo = Array.isArray(insumos)
    ? insumos.filter((insumo) => precisaReporItem(insumo)).length
    : 0;

  return (
    <div className="tudoEstoque">
      <Sidebar paginaAtiva="Estoque" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoEstoque conteudoEstoque2">
          <h1 className="tituloEstoque">Estoque de insumos</h1>
          <p className="subtituloEstoque">
            Controle por lote e validade — sistema PEPS (usar primeiro o mais antigo)
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
                  className="lucide lucide-search"
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

              <button
                type="button"
                className={`avisoMinimo ${filtrarAbaixoMinimo ? "ativo" : ""}`}
                aria-pressed={filtrarAbaixoMinimo}
                onClick={() => setFiltrarAbaixoMinimo((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-triangle-alert"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>

                {abaixoMinimo} abaixo do mínimo
              </button>
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
                  "Outros",
                ]}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
              />

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
              {!carregando &&
                !erro &&
                insumosFiltrados.map((insumo, index) => (
                  <tr key={insumo.id || index}>
                    <td>
                      <button
                        type="button"
                        className="botaoDetalhesInsumo"
                        onClick={() => abrirDetalhes(insumo)}
                      >
                        {insumo.nome}
                      </button>
                    </td>
                    <td className="loteInsumo">{insumo.lote}</td>
                    <td>{insumo.quantidade}</td>
                    <td>{insumo.minimo}</td>
                    <td>{formatarDataBR(insumo.validade)}</td>
                    <td>R$ {Number(insumo.custo || 0).toFixed(2)}</td>
                    <td>
                      <span
                        className={
                          "statusReposicao " + (insumo.status || "").toLowerCase()
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

      {/* =====================================================
         POP-UP MODAL: DETALHES DO INSUMO (detalhesInsumo)
      ===================================================== */}
      {modalDetalhesAberto && insumoSelecionado && (
        <div
          className="modalOverlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) fecharDetalhes();
          }}
        >
          <div className="modalConteudo modalDetalhesPopup">
            <div className="modalCabecalho">
              <div className="tituloESetinha">
                <button
                  type="button"
                  className="botaoVoltarPopup"
                  aria-label="Voltar para o estoque"
                  onClick={fecharDetalhes}
                >
                  <svg
                    className="svgSetinha"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#870B22"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8L2 12L6 16" />
                    <path d="M2 12H22" />
                  </svg>
                </button>
                <h2 className="tituloDetalhesInsumo">Detalhes do insumo</h2>
              </div>

              <button
                type="button"
                className="botaoFecharModal"
                onClick={fecharDetalhes}
                aria-label="Fechar detalhes"
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <div className="janelaDetalhesInsumo">
                <div className="linhaDetalhes1">
                  <div className="campoDetalhe campoNome">
                    <label>Nome do insumo</label>
                    <Input
                      value={formDetalhes.nome}
                      disabled={!editandoInsumo}
                      required={false}
                      onChange={(e) =>
                        setFormDetalhes((prev) => ({ ...prev, nome: e.target.value }))
                      }
                    />
                  </div>

                  <div className="campoDetalhe campoValidade">
                    <label>Validade</label>
                    <div className="inputComIcone">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M3 10h18M8 3v4M16 3v4" />
                      </svg>
                      <Input
                        id="inputValidade"
                        value={formDetalhes.validade}
                        disabled={!editandoInsumo}
                        required={false}
                        onChange={(e) =>
                          setFormDetalhes((prev) => ({ ...prev, validade: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="campoDetalhe campoLote">
                    <label>Lote</label>
                    <Input
                      value={formDetalhes.lote}
                      disabled={!editandoInsumo}
                      required={false}
                      onChange={(e) =>
                        setFormDetalhes((prev) => ({ ...prev, lote: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="linhaDetalhes2">
                  <div className="campoDetalhe campoCategoria">
                    <label>Categoria</label>
                    <Select
                      id="selectDetalhesInsumo"
                      value={formDetalhes.categoria}
                      disabled={!editandoInsumo}
                      required={false}
                      options={[
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
                        "Outros",
                      ]}
                      onChange={(e) =>
                        setFormDetalhes((prev) => ({
                          ...prev,
                          categoria: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="campoDetalhe campoValor">
                    <label>Custo unitário</label>
                    <Input
                      value={formDetalhes.custo}
                      disabled={!editandoInsumo}
                      required={false}
                      onChange={(e) =>
                        setFormDetalhes((prev) => ({ ...prev, custo: e.target.value }))
                      }
                    />
                  </div>

                  <div className="campoDetalhe campoValor">
                    <label>Quantidade</label>
                    <Input
                      value={formDetalhes.quantidade}
                      disabled={!editandoInsumo}
                      required={false}
                      onChange={(e) =>
                        setFormDetalhes((prev) => ({
                          ...prev,
                          quantidade: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="campoDetalhe campoValor">
                    <label>Quantidade mínima</label>
                    <Input
                      value={formDetalhes.minimo}
                      disabled={!editandoInsumo}
                      required={false}
                      onChange={(e) =>
                        setFormDetalhes((prev) => ({ ...prev, minimo: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Caixa rápida de reposição quando o item precisa repor */}
                {precisaReporItem(insumoSelecionado) && repondoInsumo && (
                  <form className="boxReporInsumo" onSubmit={handleConfirmarReposicao}>
                    <div className="infoReporInsumo">
                      <strong>Repor estoque de {insumoSelecionado.nome}</strong>
                      <span>
                        Atual: {insumoSelecionado.quantidade} · Mínimo:{" "}
                        {insumoSelecionado.minimo}
                      </span>
                    </div>
                    <div className="acoesReporInsumo">
                      <input
                        type="number"
                        min="1"
                        className="inputQtdRepor"
                        placeholder="Qtd. a adicionar"
                        value={qtdReposicao}
                        onChange={(e) => setQtdReposicao(e.target.value)}
                        required
                      />
                      <button type="submit" className="botaoConfirmarRepor">
                        Confirmar reposição
                      </button>
                      <button
                        type="button"
                        className="botaoCancelarRepor"
                        onClick={() => setRepondoInsumo(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="botoesDetalhesInsumo">
                <div className="botaoContorno">
                  <button
                    type="button"
                    className="button botaoApagarInsumo"
                    onClick={() => setModalApagarAberto(true)}
                  >
                    Excluir
                  </button>
                </div>

                {precisaReporItem(insumoSelecionado) && (
                  <button
                    type="button"
                    className="button botaoReporInsumo"
                    onClick={() => setRepondoInsumo((prev) => !prev)}
                  >
                    Repor
                  </button>
                )}

                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    if (editandoInsumo) {
                      handleSalvarDetalhes();
                    } else {
                      setEditandoInsumo(true);
                    }
                  }}
                >
                  {editandoInsumo ? "Salvar" : "Editar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* nodal confirmar exclusao*/}
      {modalApagarAberto && insumoSelecionado && (
        <div
          className="modalOverlayConfirmacao"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !excluindoInsumo) {
              setModalApagarAberto(false);
            }
          }}
        >
          <div
            className="janelaConfirmacaoPopup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="tituloConfirmarExclusaoInsumo"
          >
            <button
              type="button"
              className="botaoFecharModal"
              disabled={excluindoInsumo}
              onClick={() => setModalApagarAberto(false)}
              aria-label="Fechar confirmação"
            >
              &times;
            </button>

            <div className="iconeAlertaConfirmacao" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>

            <h2 id="tituloConfirmarExclusaoInsumo" className="tituloApagarInsumo">
              Excluir insumo?
            </h2>

            <p className="perguntaConfirmacao">
              Tem certeza que deseja excluir o insumo{" "}
              <strong>{insumoSelecionado.nome || "este insumo"}</strong>?
            </p>

            <p className="subtextoConfirmacao">
              Esta ação não poderá ser desfeita e o item será removido do estoque.
            </p>

            <div className="botoesConfirmacao">
              <div className="botaoContorno">
                <button
                  type="button"
                  className="button"
                  disabled={excluindoInsumo}
                  onClick={() => setModalApagarAberto(false)}
                >
                  Cancelar
                </button>
              </div>
              <button
                type="button"
                className="button"
                disabled={excluindoInsumo}
                onClick={handleConfirmarExclusao}
              >
                {excluindoInsumo ? "Excluindo..." : "Sim, excluir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
         POP-UP MODAL: REGISTRAR NOVO INSUMO
      ===================================================== */}
      {modalNovoInsumoAberto && (
        <div className="modalOverlay">
          <div
            className="modalConteudo"
            style={{ maxWidth: "900px", width: "90%", padding: "32px" }}
          >
            <div
              className="modalCabecalho"
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  color: "#870B22",
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                }}
              >
                Registrar novo insumo
              </h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalNovoInsumoAberto(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "26px",
                  cursor: "pointer",
                  color: "#870B22",
                }}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <form
                onSubmit={handleRegistrarInsumo}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontWeight: 600, fontSize: "14px" }}>Nome do insumo</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite aqui o nome do insumo..."
                      required
                      style={{
                        height: "46px",
                        padding: "0 14px",
                        border: "1px solid #870B22",
                        borderRadius: "10px",
                        outline: "none",
                      }}
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
                      style={{
                        height: "46px",
                        padding: "0 14px",
                        border: "1px solid #870B22",
                        borderRadius: "10px",
                        outline: "none",
                      }}
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
                      style={{
                        height: "46px",
                        padding: "0 14px",
                        border: "1px solid #870B22",
                        borderRadius: "10px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: "16px" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label style={{ fontWeight: 600, fontSize: "14px" }}>Categoria</label>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      required
                      style={{
                        height: "46px",
                        padding: "0 12px",
                        border: "1px solid #870B22",
                        borderRadius: "10px",
                        background: "#fff",
                        outline: "none",
                      }}
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
                      style={{
                        height: "46px",
                        padding: "0 14px",
                        border: "1px solid #870B22",
                        borderRadius: "10px",
                        outline: "none",
                      }}
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
                      style={{
                        height: "46px",
                        padding: "0 14px",
                        border: "1px solid #870B22",
                        borderRadius: "10px",
                        outline: "none",
                      }}
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
                      style={{
                        height: "46px",
                        padding: "0 14px",
                        border: "1px solid #870B22",
                        borderRadius: "10px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    marginTop: "16px",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setModalNovoInsumoAberto(false)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "999px",
                      border: "1px solid #870B22",
                      background: "#fff",
                      color: "#870B22",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: "12px 28px",
                      borderRadius: "999px",
                      border: "none",
                      background: "#870B22",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
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