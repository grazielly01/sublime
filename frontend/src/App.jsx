import { useEffect } from "react";
import './App.css';
import Sidebar from "./componentes/Sidebar/Sidebar.jsx";
import { Routes, Route, useLocation } from "react-router-dom";

// Importando páginas
import Login from "./pages/login/login.jsx";
import Cadastro from "./pages/cadastro/cadastro.jsx";
import EsqueciSenha from "./pages/login/esqueciSenha.jsx";
import Estoque from "./pages/estoque/estoque.jsx";
import Pedidos from "./pages/pedidos/pedidos.jsx";
import Produtos from "./pages/produtos/produtos.jsx";
import Alertas from "./pages/alertas/alertas.jsx";
import MinhaConta from "./pages/minhaConta/minhaConta.jsx";
import Calendario from "./pages/calendario/calendario.jsx";
import Sair from "./pages/sair/sair.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";

import FluxoCaixa from "./pages/fluxocaixa/FluxoCaixa.jsx";
import FluxoCaixaRegistrar from "./pages/fluxocaixa/fluxocaixaRegistrar.jsx";
import FluxoCaixaEntrada from "./pages/fluxocaixa/fluxocaixaEntrada.jsx";
import FluxoCaixaMovimentacao from "./pages/fluxocaixa/fluxocaixaMovimentacao.jsx";
import FluxoCaixaDespesa from "./pages/fluxocaixa/fluxocaixadespesa.jsx";
import FluxoCaixaDetalhes from "./pages/fluxocaixa/fluxocaixaDetalhes.jsx";
import FluxoCaixaSaida from "./pages/fluxocaixa/fluxocaixaSaida.jsx";
import FluxoCaixaExcluir1 from "./pages/fluxocaixa/fluxocaixaExcluir1.jsx";

import Configuracoes from "./pages/configuracoes/configuracoes.jsx";
import EquipeConfig from "./pages/configuracoes/equipeConfig.jsx";
import DadosConfig from "./pages/configuracoes/dadosConfig.jsx";
import SistemaConfig from "./pages/configuracoes/sistemaConfig.jsx";
import SegurancaConfig from "./pages/configuracoes/segurancaConfig.jsx";
import RegistrarConfig from "./pages/configuracoes/registrarConfig.jsx";

import Producao from "./pages/Producao/Producao.jsx";
import RegistrarProducao from "./pages/Producao/registrarProducao.jsx";
import DetalhesOrdem from "./pages/Producao/detalhesOrdem.jsx";
import ExcluirOrdem from "./pages/Producao/excluirOrdem.jsx";

import VisaoGeral from "./pages/visaogeral/visaogeral.jsx";
import MetaVisaoGeral from "./pages/visaogeral/metavisaogeral.jsx";
import RegistrarMeta from "./pages/visaogeral/registrarmeta.jsx";
import DetalhesMeta from "./pages/visaogeral/detalhesmeta.jsx";
import ExcluirMeta from "./pages/visaogeral/excluirmeta.jsx";

import RegistrarPedido from "./pages/pedidos/registrarPedido.jsx";
import DetalhesPedido from "./pages/pedidos/detalhesPedido.jsx";
import ApagarPedido from "./pages/pedidos/apagarPedido.jsx";

import RegistrarInsumo from "./pages/estoque/registrarInsumo.jsx";
import DetalhesInsumo from "./pages/estoque/detalhesInsumo.jsx";
import ApagarInsumo from "./pages/estoque/apagarInsumo.jsx";

import RegistrarProduto from "./pages/produtos/registrarProduto.jsx";
import DetalhesProduto from "./pages/produtos/detalhesProduto.jsx";
import ApagarProduto from "./pages/produtos/apagarProduto.jsx";

import RegistrarEvento from "./pages/calendario/registrarEvento.jsx";
import DetalhesEvento from "./pages/calendario/detalhesEvento.jsx";
import ApagarEvento from "./pages/calendario/apagarEvento.jsx";

function App() {
  const location = useLocation();

  // Verifica se está em uma tela de autenticação (sem Sidebar)
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/cadastro" ||
    location.pathname === "/esqueci-senha";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    document
      .querySelectorAll(".tudoMenosSidebar, .conteudoLogin")
      .forEach((el) => {
        el.scrollTop = 0;
      });
  }, [location.pathname]);

  return (
    <div className="Fundo" style={{ padding: "0px" }}>
      {/* Sidebar só aparece fora das telas de autenticação */}
      {!isAuthPage && <Sidebar />}

      <div className={isAuthPage ? "conteudoLogin" : "tudoMenosSidebar"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/" element={<VisaoGeral />} />

          {/* Estoque */}
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/estoque/registrar" element={<RegistrarInsumo />} />
          <Route path="/estoque/detalhes/" element={<DetalhesInsumo />} />
          <Route path="/estoque/apagar/" element={<ApagarInsumo />} />

          {/* Pedidos */}
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/registrar" element={<RegistrarPedido />} />
          <Route path="/pedidos/detalhes/:id" element={<DetalhesPedido />} />
          <Route path="/pedidos/apagar/" element={<ApagarPedido />} />

          {/* Produtos */}
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/registrar" element={<RegistrarProduto />} />
          <Route path="/produtos/detalhes" element={<DetalhesProduto />} />
          <Route path="/produtos/apagar" element={<ApagarProduto />} />

          {/* Calendário */}
          <Route path="/calendario/registrar" element={<RegistrarEvento />} />
          <Route path="/calendario/detalhes" element={<DetalhesEvento />} />
          <Route path="/calendario/apagar" element={<ApagarEvento />} />
          <Route path="/calendario" element={<Calendario />} />

          {/* Outras páginas */}
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/minhaConta" element={<MinhaConta />} />
          <Route path="/sair" element={<Sair />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Fluxo de caixa */}
          <Route path="/fluxocaixa" element={<FluxoCaixa />} />
          <Route path="/fluxocaixaregistrar" element={<FluxoCaixaRegistrar />} />
          <Route path="/fluxocaixaentrada" element={<FluxoCaixaEntrada />} />
          <Route path="/fluxocaixamovimentacao" element={<FluxoCaixaMovimentacao />} />
          <Route path="/fluxocaixadespesa" element={<FluxoCaixaDespesa />} />
          <Route path="/fluxocaixadetalhes" element={<FluxoCaixaDetalhes />} />
          <Route path="/fluxocaixasaida" element={<FluxoCaixaSaida />} />
          <Route path="/fluxocaixaexcluir1" element={<FluxoCaixaExcluir1 />} />

          {/* Visão geral */}
          <Route path="/visaogeral" element={<VisaoGeral />} />
          <Route path="/metavisaogeral" element={<MetaVisaoGeral />} />
          <Route path="/registrarmeta" element={<RegistrarMeta />} />
          <Route path="/detalhesmeta/:id" element={<DetalhesMeta />} />
          <Route path="/excluirmeta/:id" element={<ExcluirMeta />} />

          {/* Produção */}
          <Route path="/producao" element={<Producao />} />
          <Route path="/registrarproducao" element={<RegistrarProducao />} />
          <Route path="/detalhesordem/:id" element={<DetalhesOrdem />} />
          <Route path="/excluirordem/:id" element={<ExcluirOrdem />} />

          {/* Configurações */}
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/equipeconfig" element={<EquipeConfig />} />
          <Route path="/dadosconfig" element={<DadosConfig />} />
          <Route path="/sistemaconfig" element={<SistemaConfig />} />
          <Route path="/segurancaconfig" element={<SegurancaConfig />} />
          <Route path="/registrarconfig" element={<RegistrarConfig />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;