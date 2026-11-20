import "./configuracoes.css";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useNavigate } from "react-router-dom";

const colaboradoresIniciais = [
  {
    id: "c1",
    nome: "João Carvalho Moraes",
    cargo: "Gerente de produção",
    salario: "R$ 5.500,00",
    dias: "Seg à Sex",
    horario: "Seg à Sex: 7:00 - 16:00",
  },
  {
    id: "c2",
    nome: "Amanda Ferreira Fenix",
    cargo: "Auxiliar de limpeza",
    salario: "R$ 2.800,00",
    dias: "Seg à Sex",
    horario: "Seg à Sex: 7:00 - 16:00",
  },
  {
    id: "c3",
    nome: "Sebastião Pinheiro Santos",
    cargo: "Confeiteiro",
    salario: "R$ 4.700,00",
    dias: "Seg à Sex",
    horario: "Seg à Sex: 7:00 - 13:00",
  },
  {
    id: "c4",
    nome: "Lívia Stenberg Amorim",
    cargo: "Gerente de estoque",
    salario: "R$ 6.300,00",
    dias: "Seg à Sex",
    horario: "Seg à Sex: 7:00 - 14:00",
  },
  {
    id: "c5",
    nome: "Pedro da Silva Guimarães",
    cargo: "Gerente de pedidos",
    salario: "R$ 5.700,00",
    dias: "Seg à Sex",
    horario: "Seg à Sex: 7:00 - 15:00",
  },
];

function formatarMoedaInput(valor) {
  const digits = String(valor || "").replace(/\D/g, "");
  if (!digits) return "";
  const numero = Number(digits) / 100;
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarHoraSimples(hora24) {
  if (!hora24) return "";
  const [h, m] = hora24.split(":");
  return `${Number(h)}:${m || "00"}`;
}

function parseHorario(horarioStr = "", diasPadrao = "Seg à Sex") {
  const match = horarioStr.match(/^([^:]+):\s*(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/);
  if (!match) {
    return { dias: diasPadrao, inicio: "07:00", fim: "16:00" };
  }
  const padHora = (h) => {
    const [hh, mm] = h.split(":");
    return `${String(hh).padStart(2, "0")}:${mm || "00"}`;
  };
  return {
    dias: match[1].trim() || diasPadrao,
    inicio: padHora(match[2]),
    fim: padHora(match[3]),
  };
}

function ModalRegistrarColaborador({ onSalvar, onFechar }) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [dias, setDias] = useState("Seg à Sex");
  const [horaInicio, setHoraInicio] = useState("07:00");
  const [horaFim, setHoraFim] = useState("16:00");
  const [erro, setErro] = useState("");

  const primeiroInputRef = useRef(null);

  useEffect(() => {
    primeiroInputRef.current?.focus();

    const aoPressionarEsc = (e) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", aoPressionarEsc);
    return () => document.removeEventListener("keydown", aoPressionarEsc);
  }, [onFechar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim() || !cargo.trim() || !salario.trim()) {
      setErro("Preencha nome, cargo e salário.");
      return;
    }

    const salarioFormatado = salario.trim().startsWith("R$")
      ? salario.trim()
      : formatarMoedaInput(salario) || salario.trim();

    const novoColaborador = {
      id: "col-" + Date.now(),
      nome: nome.trim(),
      cargo: cargo.trim(),
      salario: salarioFormatado,
      dias,
      horario: `${dias}: ${formatarHoraSimples(horaInicio)} - ${formatarHoraSimples(horaFim)}`,
    };

    onSalvar(novoColaborador);
    onFechar();
  };

  return (
    <div
      className="mcOverlaySuperior"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      <div
        className="mcJanelaForm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tituloModalRegistrarCol"
      >
        <div className="mcCabecalho">
          <h2 id="tituloModalRegistrarCol" className="mcTitulo">
            Registrar novo colaborador
          </h2>
          <button
            type="button"
            className="mcBotaoX"
            onClick={onFechar}
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <form className="mcForm" onSubmit={handleSubmit}>
          {erro && <p className="mcErro">{erro}</p>}

          <label>
            Nome do colaborador: *
            <input
              ref={primeiroInputRef}
              type="text"
              placeholder="Escreva aqui o nome..."
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (erro) setErro("");
              }}
            />
          </label>

          <label>
            Cargo: *
            <input
              type="text"
              placeholder="Escreva aqui o cargo..."
              value={cargo}
              onChange={(e) => {
                setCargo(e.target.value);
                if (erro) setErro("");
              }}
            />
          </label>

          <label>
            Salário (mês): *
            <input
              type="text"
              placeholder="R$ 00,00"
              value={salario}
              onChange={(e) => {
                setSalario(formatarMoedaInput(e.target.value));
                if (erro) setErro("");
              }}
            />
          </label>

          <label>
            Dias:
            <select value={dias} onChange={(e) => setDias(e.target.value)}>
              <option value="Seg à Sex">Seg à Sex</option>
              <option value="Seg à Sáb">Seg à Sáb</option>
              <option value="Dom à Dom">Dom à Dom</option>
            </select>
          </label>

          <label>
            Horário:
            <div className="mcHorarioInputs">
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
              <span>às</span>
              <input
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
              />
            </div>
          </label>

          <div className="mcAcoesForm">
            <button
              type="button"
              className="mcBotaoCancelar"
              onClick={onFechar}
            >
              Cancelar
            </button>
            <button type="submit" className="mcBotaoPrimario">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalEditarColaborador({ colaborador, onSalvar, onFechar }) {
  const horarioInicial = parseHorario(colaborador.horario, colaborador.dias || "Seg à Sex");

  const [nome, setNome] = useState(colaborador.nome || "");
  const [cargo, setCargo] = useState(colaborador.cargo || "");
  const [salario, setSalario] = useState(colaborador.salario || "");
  const [dias, setDias] = useState(horarioInicial.dias);
  const [horaInicio, setHoraInicio] = useState(horarioInicial.inicio);
  const [horaFim, setHoraFim] = useState(horarioInicial.fim);
  const [erro, setErro] = useState("");

  const primeiroInputRef = useRef(null);

  useEffect(() => {
    primeiroInputRef.current?.focus();

    const aoPressionarEsc = (e) => {
      if (e.key === "Escape") onFechar();
    };
    document.addEventListener("keydown", aoPressionarEsc);
    return () => document.removeEventListener("keydown", aoPressionarEsc);
  }, [onFechar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim() || !cargo.trim() || !salario.trim()) {
      setErro("Preencha nome, cargo e salário.");
      return;
    }

    const salarioFormatado = salario.trim().startsWith("R$")
      ? salario.trim()
      : formatarMoedaInput(salario) || salario.trim();

    onSalvar({
      ...colaborador,
      nome: nome.trim(),
      cargo: cargo.trim(),
      salario: salarioFormatado,
      dias,
      horario: `${dias}: ${formatarHoraSimples(horaInicio)} - ${formatarHoraSimples(horaFim)}`,
    });
    onFechar();
  };

  return (
    <div
      className="mcOverlaySuperior"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      <div
        className="mcJanelaForm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tituloModalEditarCol"
      >
        <div className="mcCabecalho">
          <h2 id="tituloModalEditarCol" className="mcTitulo">
            Editar colaborador
          </h2>
          <button
            type="button"
            className="mcBotaoX"
            onClick={onFechar}
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>

        <form className="mcForm" onSubmit={handleSubmit}>
          {erro && <p className="mcErro">{erro}</p>}

          <label>
            Nome do colaborador: *
            <input
              ref={primeiroInputRef}
              type="text"
              placeholder="Escreva aqui o nome..."
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                if (erro) setErro("");
              }}
            />
          </label>

          <label>
            Cargo: *
            <input
              type="text"
              placeholder="Escreva aqui o cargo..."
              value={cargo}
              onChange={(e) => {
                setCargo(e.target.value);
                if (erro) setErro("");
              }}
            />
          </label>

          <label>
            Salário (mês): *
            <input
              type="text"
              placeholder="R$ 00,00"
              value={salario}
              onChange={(e) => {
                setSalario(formatarMoedaInput(e.target.value));
                if (erro) setErro("");
              }}
            />
          </label>

          <label>
            Dias:
            <select value={dias} onChange={(e) => setDias(e.target.value)}>
              <option value="Seg à Sex">Seg à Sex</option>
              <option value="Seg à Sáb">Seg à Sáb</option>
              <option value="Dom à Dom">Dom à Dom</option>
            </select>
          </label>

          <label>
            Horário:
            <div className="mcHorarioInputs">
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
              <span>às</span>
              <input
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
              />
            </div>
          </label>

          <div className="mcAcoesForm">
            <button
              type="button"
              className="mcBotaoCancelar"
              onClick={onFechar}
            >
              Cancelar
            </button>
            <button type="submit" className="mcBotaoPrimario">
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalGerenciarColaboradores({ aberto, onFechar }) {
  const [colaboradores, setColaboradores] = useState(colaboradoresIniciais);
  const [modalRegistrarAberto, setModalRegistrarAberto] = useState(false);
  const [colaboradorEditando, setColaboradorEditando] = useState(null);

  const temSubModalAberto = modalRegistrarAberto || Boolean(colaboradorEditando);

  useEffect(() => {
    if (!aberto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const aoPressionarEsc = (e) => {
      if (e.key === "Escape" && !temSubModalAberto) {
        onFechar();
      }
    };
    document.addEventListener("keydown", aoPressionarEsc);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoPressionarEsc);
    };
  }, [aberto, temSubModalAberto, onFechar]);

  if (!aberto) return null;

  const adicionarColaborador = (novo) => {
    setColaboradores((prev) => [...prev, novo]);
  };

  const atualizarColaborador = (editado) => {
    setColaboradores((prev) =>
      prev.map((item) => (item.id === editado.id ? editado : item))
    );
  };

  return createPortal(
    <>
      <div
        className="mcOverlay"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget && !temSubModalAberto) {
            onFechar();
          }
        }}
      >
        <div
          className="mcJanela"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tituloGerenciarColaboradores"
        >
          <div className="mcCabecalho">
            <h2 id="tituloGerenciarColaboradores" className="mcTitulo">
              Gerenciar colaboradores
            </h2>
            <button
              type="button"
              className="mcBotaoX"
              onClick={onFechar}
              aria-label="Fechar"
            >
              &times;
            </button>
          </div>

          <div className="mcCorpo">
            <div className="mcToolbar">
              <button
                type="button"
                className="mcBotaoRegistrarCol"
                onClick={() => setModalRegistrarAberto(true)}
              >
                + Registrar colaborador
              </button>
            </div>

            <div className="mcTabelaWrap">
              <table className="mcTabela">
                <thead>
                  <tr>
                    <th>Colaborador</th>
                    <th>Cargo</th>
                    <th>Salário</th>
                    <th>Horário</th>
                    <th className="mcColAcoes">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {colaboradores.map((col) => {
                    const inicial = col.nome.trim().charAt(0).toUpperCase() || "C";
                    return (
                      <tr key={col.id}>
                        <td>
                          <div className="mcPessoa">
                            <span className="mcAvatarLetra">{inicial}</span>
                            <span>{col.nome}</span>
                          </div>
                        </td>
                        <td>{col.cargo}</td>
                        <td>{col.salario}</td>
                        <td>{col.horario}</td>
                        <td className="mcColAcoes">
                          <button
                            type="button"
                            className="mcBotaoEditarCol"
                            onClick={() => setColaboradorEditando(col)}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mcRodape">
            <button type="button" className="mcBotaoFechar" onClick={onFechar}>
              Fechar
            </button>
          </div>
        </div>
      </div>

      {modalRegistrarAberto && (
        <ModalRegistrarColaborador
          onSalvar={adicionarColaborador}
          onFechar={() => setModalRegistrarAberto(false)}
        />
      )}

      {colaboradorEditando && (
        <ModalEditarColaborador
          colaborador={colaboradorEditando}
          onSalvar={atualizarColaborador}
          onFechar={() => setColaboradorEditando(null)}
        />
      )}
    </>,
    document.body
  );
}

function Configuracoes() {
  const navigate = useNavigate();
  const [modalEquipeAberto, setModalEquipeAberto] = useState(false);

  return (
    <div className="tudoConfiguracoes">
      <Sidebar paginaAtiva="Configurações" />

      <div className="tudoMenosSidebar tudoMenosSidebarConfiguracoes">
        <Header nomeIndustria="Sweet Sunset" />

        <div className="conteudoConfiguracoes conteudoConfiguracoes2">
          <div className="topoConfiguracoes">
            <h1 className="tituloConfiguracoes">Configurações</h1>
            <p className="subtituloConfiguracoes">
              Preferências da indústria e do sistema.
            </p>
          </div>

          {/* Cards de configuração */}
          <div className="cardsConfiguracoes">
            <div
              className="cardConfiguracao"
              onClick={() => navigate("/dadosconfig")}
              style={{ cursor: "pointer" }}
            >
              <h2>Dados da Indústria</h2>
              <p>Razão social, CNPJ, IE, Endereço...</p>
            </div>

            <div
              className="cardConfiguracao"
              onClick={() => setModalEquipeAberto(true)}
              style={{ cursor: "pointer" }}
            >
              <h2>Equipe</h2>
              <p>Colaboradores, Funcionários, Equipes...</p>
            </div>

            <div
              className="cardConfiguracao"
              onClick={() => navigate("/sistemaconfig")}
              style={{ cursor: "pointer" }}
            >
              <h2>Sistema</h2>
              <p>Idioma, Backup, Aparência do sistema...</p>
            </div>

            <div
              className="cardConfiguracao"
              onClick={() => navigate("/segurancaconfig")}
              style={{ cursor: "pointer" }}
            >
              <h2>Segurança</h2>
              <p>
                Login e autenticação, Controle de acesso, Histórico de
                atividades, Backup e recuperação...
              </p>
            </div>
          </div>
        </div>
      </div>

      <ModalGerenciarColaboradores
        aberto={modalEquipeAberto}
        onFechar={() => setModalEquipeAberto(false)}
      />
    </div>
  );
}

export default Configuracoes;