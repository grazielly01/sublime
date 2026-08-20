import "./detalhesmeta.css";
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";
import Header from "../../componentes/Header/Header.jsx";
import { useParams, useNavigate } from "react-router-dom";

function DetalhesMeta() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dados simulados
  const metas = [
    {
      id: 1,
      titulo: "Zerar alertas em uma semana",
      prazo: "09/09/2025",
      descricao: "Resolver todos os alertas em uma semana",
      quantidade: "-",
    },
    {
      id: 2,
      titulo: "Produzir 200 bolos de cenoura",
      prazo: "18/09/2025",
      descricao: "Produzir 200 bolos de cenoura até o final da semana",
      quantidade: "200",
    },
  ];

  const meta = metas.find((m) => m.id.toString() === id) || metas[0];

  if (!meta) {
    return <p>Meta não encontrada</p>;
  }

  return (
    <div className="tudoDetalhesMeta">
      <Sidebar paginaAtiva="Visão Geral" />

      <div className="tudoMenosSidebar">
        <Header nomeIndustria="Sweet Sunset" />

        <main className="conteudoDetalhesMeta">
          {/* Cabeçalho com botão voltar e título */}
          <div className="headerTituloMeta">
            <button 
              className="botaoVoltar" 
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7A0C22" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <h1 className="tituloDetalhesMeta">Detalhes da meta</h1>
          </div>

          {/* Card Principal Ocupando Toda a Largura */}
          <div className="cardDetalhesMeta">
            {/* Linha 1: Título (Esquerda) e Prazo (Direita) */}
            <div className="grupoCampo campoTitulo">
              <label>Título da meta</label>
              <div className="campoDisplay">{meta.titulo}</div>
            </div>

            <div className="grupoCampo campoPrazo">
              <label>Prazo da meta</label>
              <div className="campoDisplay campoComIcone">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{meta.prazo}</span>
              </div>
            </div>

            {/* Linha 2: Descrição (Esquerda) e Quantidade (Direita) */}
            <div className="grupoCampo campoDescricao">
              <label>Descrição</label>
              <div className="campoDisplay areaDescricao">{meta.descricao}</div>
            </div>

            <div className="grupoCampo campoQuantidade">
              <label>Quantidade a ser produzida</label>
              <div className="campoDisplay">{meta.quantidade}</div>
            </div>
          </div>

          {/* Botões Alinhados à Direita no Rodapé do Card */}
          <div className="acoesDetalhesMeta">
            <button
  className="botaoExcluir"
  onClick={() => navigate(`/excluirmeta/${id}`)}
>
  Excluir
</button>

            <button
              className="botaoEditar"
              onClick={() => navigate("/registrarmeta")}
            >
              Editar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DetalhesMeta;