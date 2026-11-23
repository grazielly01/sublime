import { useState } from "react";
import "./calendario.css";
import "./registrarEvento.css";
import "./detalhesEvento.css";
import "./apagarEvento.css";
import Input from "../../componentes/Input/Input.jsx";
import Button from "../../componentes/Button/Button.jsx";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import Select from "../../componentes/Select/Select.jsx";

function Calendario() {
 const hoje = new Date();
const [mesAtual, setMesAtual] = useState(hoje.getMonth());
const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());

  // Estado do pop-up Registrar Novo Evento
  const [modalNovoEventoAberto, setModalNovoEventoAberto] = useState(false);
  const [novoEventoForm, setNovoEventoForm] = useState({
    titulo: "",
    categoria: "Produção",
    prazo: "",
    descricao: "",
  });

  // Estados do pop-up Detalhes do Evento
  const [modalDetalhesEventoAberto, setModalDetalhesEventoAberto] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [editandoEvento, setEditandoEvento] = useState(false);

  // Estado do pop-up Confirmar Exclusão do Evento
  const [modalConfirmarExclusaoAberto, setModalConfirmarExclusaoAberto] = useState(false);

  const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const nomesDiasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  const [eventos, setEventos] = useState([
    {
      id: 1,
      dia: 1,
      mes: 4,
      ano: 2026,
      titulo: "Manutenção banheiro",
      categoria: "outro",
      descricao: "Conserto preventivo na torneira e encanamento do banheiro.",
    },
    {
      id: 2,
      dia: 4,
      mes: 4,
      ano: 2026,
      titulo: "Compra chocolate",
      categoria: "compra",
      descricao: "Pedido de 10kg de Chocolate Callebaut ao leite com fornecedor.",
    },
    {
      id: 3,
      dia: 5,
      mes: 4,
      ano: 2026,
      titulo: "45 Cupcake Red Velvet",
      categoria: "producao",
      descricao: "Produzir 45 cupcakes red velvet para encomenda da semana.",
    },
    {
      id: 4,
      dia: 13,
      mes: 4,
      ano: 2026,
      titulo: "20 Copo Felicidade Sen...",
      categoria: "producao",
      descricao: "Produção de 20 Copos da Felicidade sabor Sensação.",
    },
    {
      id: 5,
      dia: 16,
      mes: 4,
      ano: 2026,
      titulo: "45 Cupcake Red Velvet",
      categoria: "entrega",
      descricao: "Produzir 45 cupcakes red velvet e entregar para a Padaria KiPao Gostoso",
    },
  ]);

  const mapearClasseCategoria = (categoriaTexto) => {
    const mapa = {
      "Produção": "producao",
      "Entrega": "entrega",
      "Compra": "compra",
      "Pagamento": "pagamento",
      "Outro": "outro",
    };
    return mapa[categoriaTexto] || "outro";
  };

  const mapearNomeCategoria = (classeCategoria) => {
    const mapa = {
      producao: "Produção",
      entrega: "Entrega",
      compra: "Compra",
      pagamento: "Pagamento",
      outro: "Outro",
    };
    return mapa[classeCategoria] || "Outro";
  };

  const formatarDataISO = (dia, mes, ano) => {
    const mesStr = String(mes + 1).padStart(2, "0");
    const diaStr = String(dia).padStart(2, "0");
    return `${ano}-${mesStr}-${diaStr}`;
  };

  // Abre o modal de Detalhes do Evento preenchido
  const abrirDetalhesEvento = (evento) => {
    setEventoSelecionado({
      id: evento.id,
      titulo: evento.titulo,
      categoria: mapearNomeCategoria(evento.categoria),
      prazo: formatarDataISO(evento.dia, evento.mes, evento.ano),
      descricao: evento.descricao || "",
    });
    setEditandoEvento(false);
    setModalDetalhesEventoAberto(true);
  };

  // Salva alterações feitas no modal de detalhes
  const salvarEdicaoEvento = () => {
    if (!eventoSelecionado) return;

    let diaAtualizado = 1;
    let mesAtualizado = mesAtual;
    let anoAtualizado = anoAtual;

    if (eventoSelecionado.prazo && eventoSelecionado.prazo.includes("-")) {
      const [anoStr, mesStr, diaStr] = eventoSelecionado.prazo.split("-");
      anoAtualizado = Number(anoStr);
      mesAtualizado = Number(mesStr) - 1;
      diaAtualizado = Number(diaStr);
    }

    setEventos((prev) =>
      prev.map((ev) =>
        ev.id === eventoSelecionado.id
          ? {
              ...ev,
              titulo: eventoSelecionado.titulo,
              categoria: mapearClasseCategoria(eventoSelecionado.categoria),
              dia: diaAtualizado,
              mes: mesAtualizado,
              ano: anoAtualizado,
              descricao: eventoSelecionado.descricao,
            }
          : ev
      )
    );
    setEditandoEvento(false);
  };

  // Abre o pop-up de confirmação de exclusão
  const solicitarExclusaoEvento = () => {
    setModalDetalhesEventoAberto(false);
    setModalConfirmarExclusaoAberto(true);
  };

  // Remove o evento definitivamente do calendário
  const confirmarExclusaoEvento = () => {
    if (eventoSelecionado) {
      setEventos((prev) => prev.filter((ev) => ev.id !== eventoSelecionado.id));
    }
    setModalConfirmarExclusaoAberto(false);
    setEventoSelecionado(null);
  };

  const handleRegistrarEvento = (e) => {
    e.preventDefault();

    let diaEvento = 1;
    let mesEvento = mesAtual;
    let anoEvento = anoAtual;

    if (novoEventoForm.prazo) {
      if (novoEventoForm.prazo.includes("-")) {
        const [anoStr, mesStr, diaStr] = novoEventoForm.prazo.split("-");
        anoEvento = Number(anoStr);
        mesEvento = Number(mesStr) - 1;
        diaEvento = Number(diaStr);
      } else if (novoEventoForm.prazo.includes("/")) {
        const [diaStr, mesStr, anoStr] = novoEventoForm.prazo.split("/");
        diaEvento = Number(diaStr);
        mesEvento = Number(mesStr) - 1;
        anoEvento = Number(anoStr);
      }
    }

    const novoItem = {
      id: Date.now(),
      dia: diaEvento,
      mes: mesEvento,
      ano: anoEvento,
      titulo: novoEventoForm.titulo,
      categoria: mapearClasseCategoria(novoEventoForm.categoria),
      descricao: novoEventoForm.descricao,
    };

    setEventos((prev) => [...prev, novoItem]);
    setMesAtual(mesEvento);
    setAnoAtual(anoEvento);
    setNovoEventoForm({ titulo: "", categoria: "Produção", prazo: "", descricao: "" });
    setModalNovoEventoAberto(false);
  };

 const anos = [];
for (let ano = hoje.getFullYear() - 5; ano <= hoje.getFullYear() + 50; ano++) {
  anos.push(ano.toString());
}

  function mesAnterior() {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  }

  function proximoMes() {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  }

  function mudarAno(evento) {
    setAnoAtual(Number(evento.target.value));
  }

  const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
  const totalDiasMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

  const celulas = [];
  for (let i = 0; i < primeiroDiaSemana; i++) {
    celulas.push(null);
  }
  for (let dia = 1; dia <= totalDiasMes; dia++) {
    celulas.push(dia);
  }
  while (celulas.length % 7 !== 0) {
    celulas.push(null);
  }

  return (
    <div className="tudoCalendario">
      <Sidebar paginaAtiva="Calendário" />

      <div className="tudoMenosSidebar tudoMenosSidebarCalendario">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoCalendario conteudoCalendario2">
          <div></div>

          {/* linha de cima: título + subtítulo */}
          <div className="topoCalendario">
            <h1 className="tituloCalendario">Calendário</h1>
            <p className="subtituloCalendario">
              Planejamento de produção, compras, entregas e pagamentos.
            </p>
          </div>

          {/* janela branca com o calendário */}
          <div className="janelaCalendario">
            {/* cabeçalho */}
            <div className="cabecalhoCalendario">
              <button className="setaMes" onClick={mesAnterior} type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="seletorMesAno">
                <span className="nomeMes">{nomesMeses[mesAtual].toUpperCase()}</span>
                <Select
                  id="selectAnoCalendario"
                  value={anoAtual.toString()}
                  onChange={mudarAno}
                  options={anos}
                  required={false}
                />
              </div>

              <button className="setaMes" onClick={proximoMes} type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* linha com os nomes dos dias da semana */}
            <div className="linhaDiasSemana">
              {nomesDiasSemana.map((nomeDia) => (
                <div className="diaSemana" key={nomeDia}>{nomeDia}</div>
              ))}
            </div>

            {/* grade com os dias do mês */}
            <div className="gradeCalendario">
              {celulas.map((dia, index) => {
                const eventosDoDia = eventos.filter(
                  (evento) =>
                    evento.dia === dia && evento.mes === mesAtual && evento.ano === anoAtual
                );

                const ehHoje =
                        dia === hoje.getDate() &&
                           mesAtual === hoje.getMonth() &&
                           anoAtual === hoje.getFullYear();

                return (
                 <div className={"celulaDia" + (ehHoje ? " hoje" : "")} key={index}>
                    {dia !== null && (
                      <div className="conteudoCelula">
                        <span className="numeroDia">{dia}</span>
                        {eventosDoDia.map((eventoDoDia) => (
                          <div
                            key={eventoDoDia.id}
                            className="botaoDetalhesEvento"
                            onClick={() => abrirDetalhesEvento(eventoDoDia)}
                          >
                            <span className={"tagEvento " + eventoDoDia.categoria}>
                              {eventoDoDia.titulo}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="rodapeCalendario">
              {/* legenda das categorias */}
              <div className="legendaCategorias">
                <span className="tagEvento producao">Produção</span>
                <span className="tagEvento entrega">Entrega</span>
                <span className="tagEvento compra">Compra</span>
                <span className="tagEvento pagamento">Pagamento</span>
                <span className="tagEvento outro">Outro</span>
              </div>

              {/* botão de add evento abrindo o pop-up */}
              <div className="divBotaoNovoEvento">
                <div
                  className="botaoNovoEvento"
                  onClick={() => setModalNovoEventoAberto(true)}
                >
                  <Button texto="+ Novo evento" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* pop up 1 detalhes do evento */}
      {modalDetalhesEventoAberto && eventoSelecionado && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "740px" }}>
            <div className="modalCabecalho">
              <h2>Detalhes do evento</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalDetalhesEventoAberto(false)}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <div className="formDetalhesEventoModal">
                <div className="linhaDetalhes1">
                  <div className="campoDetalhe campoTitulo">
                    <label>Título do evento</label>
                    <Input
                      value={eventoSelecionado.titulo}
                      disabled={!editandoEvento}
                      required={false}
                      onChange={(e) =>
                        setEventoSelecionado({
                          ...eventoSelecionado,
                          titulo: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="campoDetalhe campoCategoriaEvento">
                    <label>Categoria</label>
                    <Select
                      id="selectCategoriaDetalhesEvento"
                      value={eventoSelecionado.categoria}
                      disabled={!editandoEvento}
                      required={false}
                      onChange={(e) =>
                        setEventoSelecionado({
                          ...eventoSelecionado,
                          categoria: e.target.value,
                        })
                      }
                      options={[
                        "Produção",
                        "Entrega",
                        "Compra",
                        "Pagamento",
                        "Outro",
                      ]}
                    />
                  </div>
                </div>

                <div className="linhaDetalhes2">
                  <div className="campoDetalhe campoPrazoEvento">
                    <label>Prazo</label>
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
                      <input
                        type="date"
                        id="inputPrazo"
                        value={eventoSelecionado.prazo}
                        disabled={!editandoEvento}
                        onChange={(e) =>
                          setEventoSelecionado({
                            ...eventoSelecionado,
                            prazo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="campoDetalhe campoDescricaoEvento">
                    <label>Descrição</label>
                    <Input
                      value={eventoSelecionado.descricao}
                      disabled={!editandoEvento}
                      required={false}
                      onChange={(e) =>
                        setEventoSelecionado({
                          ...eventoSelecionado,
                          descricao: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="botoesDetalhesEvento">
                  <div
                    className="botaoContorno"
                    onClick={solicitarExclusaoEvento}
                  >
                    <Button type="button" texto="Excluir" />
                  </div>

                  <div
                    onClick={() => {
                      if (editandoEvento) {
                        salvarEdicaoEvento();
                      } else {
                        setEditandoEvento(true);
                      }
                    }}
                  >
                    <Button
                      type="button"
                      texto={editandoEvento ? "Salvar" : "Editar"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* pop up 2, exlusao do evento */}
      {modalConfirmarExclusaoAberto && eventoSelecionado && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "460px" }}>
            <div
              className="modalCabecalho"
              style={{ borderBottom: "none", marginBottom: 0, paddingBottom: 0 }}
            >
              <span />
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => {
                  setModalConfirmarExclusaoAberto(false);
                  setModalDetalhesEventoAberto(true);
                }}
              >
                &times;
              </button>
            </div>

            <div className="conteudoConfirmacaoApagarEvento">
              <div className="iconeAlertaApagarEvento">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="tituloConfirmacaoApagarEvento">
                Excluir evento do calendário?
              </h3>

              <p className="textoConfirmacaoApagarEvento">
                Tem certeza de que deseja excluir{" "}
                <strong>{eventoSelecionado.titulo}</strong>?
              </p>

              <p className="subtextoConfirmacaoApagarEvento">
                Esta ação não poderá ser desfeita e o evento será removido do planejamento.
              </p>

              <div className="botoesConfirmacaoEvento">
                <button
                  type="button"
                  className="botaoCancelarEvento"
                  onClick={() => {
                    setModalConfirmarExclusaoAberto(false);
                    setModalDetalhesEventoAberto(true);
                  }}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="botaoConfirmarApagarEvento"
                  onClick={confirmarExclusaoEvento}
                >
                  Sim, excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/*pop up registrar novo evento*/}
      {modalNovoEventoAberto && (
        <div className="modalOverlay">
          <div className="modalConteudo" style={{ maxWidth: "740px" }}>
            <div className="modalCabecalho">
              <h2>Registrar novo evento</h2>
              <button
                type="button"
                className="botaoFecharModal"
                onClick={() => setModalNovoEventoAberto(false)}
              >
                &times;
              </button>
            </div>

            <div className="modalCorpo">
              <form className="formRegistrarEventoModal" onSubmit={handleRegistrarEvento}>
                <div className="linha1">
                  <div className="campoRegistrar campoTitulo">
                    <label>
                      Título do evento <span>*</span>
                    </label>
                    <Input
                      placeholder="Escreva aqui o título..."
                      required={true}
                      value={novoEventoForm.titulo}
                      onChange={(e) =>
                        setNovoEventoForm({ ...novoEventoForm, titulo: e.target.value })
                      }
                    />
                  </div>

                  <div className="campoRegistrar campoCategoriaEvento">
                    <label>
                      Categoria <span>*</span>
                    </label>
                    <Select
                      id="selectCategoriaEvento"
                      required={true}
                      value={novoEventoForm.categoria}
                      onChange={(e) =>
                        setNovoEventoForm({ ...novoEventoForm, categoria: e.target.value })
                      }
                      options={[
                        "Produção",
                        "Entrega",
                        "Compra",
                        "Pagamento",
                        "Outro",
                      ]}
                    />
                  </div>
                </div>

                <div className="linha2">
                  <div className="campoRegistrar campoPrazoEvento">
                    <label>
                      Prazo <span>*</span>
                    </label>
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
                      <input
                        type="date"
                        id="inputPrazo"
                        required
                        value={novoEventoForm.prazo}
                        onChange={(e) =>
                          setNovoEventoForm({ ...novoEventoForm, prazo: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="campoRegistrar campoDescricaoEvento">
                    <label>
                      Descrição <span>*</span>
                    </label>
                    <Input
                      placeholder="Escreva aqui a descrição..."
                      required={true}
                      value={novoEventoForm.descricao}
                      onChange={(e) =>
                        setNovoEventoForm({ ...novoEventoForm, descricao: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="botoesRegistrarEvento">
                  <div
                    className="botaoContorno"
                    onClick={() => setModalNovoEventoAberto(false)}
                  >
                    <Button type="button" texto="Cancelar" />
                  </div>
                  <Button type="submit" texto="Registrar" />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendario;