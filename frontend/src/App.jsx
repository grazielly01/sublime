import './App.css';
import Sidebar from "./componentes/Sidebar/Sidebar.jsx";
import { Routes, Route, useLocation } from "react-router-dom";

// Importando páginas
import Login from "./pages/login/login.jsx";
import Estoque from "./pages/estoque/estoque.jsx";
import Pedidos from "./pages/pedidos/pedidos.jsx";
import Produtos from "./pages/produtos/produtos.jsx";
import Alertas from "./pages/alertas/alertas.jsx";
import MinhaConta from "./pages/minhaConta/minhaConta.jsx";
import Calendario from "./pages/calendario/calendario.jsx";
import Producao from "./pages/producao/producao.jsx";
import Sair from "./pages/sair/sair.jsx"; 
import Configuracoes from "./pages/configuracoes/configuracoes.jsx";

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

  // Verifica se está na tela de login
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="Fundo" style={{ padding: "0px" }}>
      {/* Sidebar só aparece se não estiver na tela de login */}
      {!isLoginPage && <Sidebar />}

      <div className={isLoginPage ? "conteudoLogin" : "tudoMenosSidebar"}>
        <Routes>
          <Route path="/login" element={<Login />} />

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

          {/* Outras páginas */}
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/minhaConta" element={<MinhaConta />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/producao" element={<Producao />} />
         <Route path="/sair" element={<Sair />} />
          <Route path="/configuracoes" element={<Configuracoes />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;













//app.jsx antigo da sofia 


/*import { useState } from "react"; /*useState guarda uma informação que pode mudar (aqui: qual tela mostrar) e redesenha a tela sozinho quando ela muda*/
/*import './App.css'
import Input from "./componentes/Input/Input.jsx";
import Button from "./componentes/Button/Button.jsx";
import Card from "./componentes/Card/Card.jsx";
import Textarea from "./componentes/TextArea/TextArea.jsx";
import Select from "./componentes/Select/Select.jsx";
import Header from './componentes/Header/Header.jsx';
import Alert from "./componentes/Alerts/Alerts.jsx";
import Sidebar from "./componentes/Sidebar/Sidebar.jsx";
import Login from "./pages/login/login.jsx"; /*importando function da página de Login só pra poder visualizar ela por essa gambiarra temporária*/
//import Estoque from "./pages/estoque/estoque.jsx"; /*importando function da página de Estoque só pra poder visualizar ela por essa gambiarra temporária*/
//import Cadastro from "./pages/cadastro/cadastro.jsx"; /*importando function da página de Cadastro só pra poder visualizar ela por essa gambiarra temporária*/
//import RegistrarInsumo from "./pages/estoque/registrarInsumo.jsx";  /*importando function da página de Registrar insumo só pra poder visualizar ela por essa gambiarra temporária*/
//import DetalhesInsumo from "./pages/estoque/detalhesInsumo.jsx"; /*importando function da página de Detalhes do insumo só pra poder visualizar ela por essa gambiarra temporária*/
//import ApagarInsumo from "./pages/estoque/apagarInsumo.jsx"; /*importando function da página de Apagar insumo só pra poder visualizar ela por essa gambiarra temporária*/
//import MinhaConta from "./pages/minhaConta/minhaConta.jsx"; /*importando function da página Minha conta só pra poder visualizar ela por essa gambiarra temporária*/
//import Alertas from "./pages/alertas/alertas.jsx"; /*importando function da página de Alertas só pra poder visualizar ela por essa gambiarra temporária*/
//import Pedidos from "./pages/pedidos/pedidos.jsx"; /*importando function da página de Pedidos số pra poder visualizar ela por essa gambiarra temporária*/
//import RegistrarPedido from "./pages/pedidos/registrarPedido.jsx"; /*importando function da página de Registrar pedido số pra poder visualizar ela por essa gambiarra temporária*/
//import DetalhesPedido from "./pages/pedidos/detalhesPedido.jsx"; /*importando function da página de Detalhes do pedido số pra poder visualizar ela por essa gambiarra temporária*/
//import ApagarPedido from "./pages/pedidos/apagarPedido.jsx"; /*importando function da página de Apagar pedido số pra poder visualizar ela por essa gambiarra temporária*/
//import Produtos from "./pages/produtos/produtos.jsx"; /*importando function da página de Produtos số pra poder visualizar ela por essa gambiarra temporária*/
//import Calendario from "./pages/calendario/calendario.jsx"; /*importando function da página de Calendario(so pra poder visualizar ela por essa gambiarra temporária)*/ 

 /**ESSA FUNCTION ABAIXO, Q USA useState, TAMBEM É TEMPORÁRIA: É GAMBIARRA PRA EU VISUALIZAR AS PAGINAS Q TO CRIANDO QUANDO CLICO NOS BUTTONS */
//function App() {

  //const [telaAtual, setTelaAtual] = useState("app");
  /*telaAtual começa como "app" (mostra a tela normal de testes); setTelaAtual é quem troca esse valor*/

  /*se telaAtual for "login", mostra só a página de Login e para por aqui, nem chega a olhar o resto do código abaixo*/
  /*if (telaAtual === "login") {
    return <Login />;
  }

  /*se telaAtual for "cadastro", mostra só a página de Estoque e para por aqui, nem chega a olhar o resto do código abaixo*/
  /*if (telaAtual === "cadastro") {
    return <Cadastro />;
  }

  /*se telaAtual for "ESTOQUE", mostra só a página de Estoque e para por aqui, nem chega a olhar o resto do código abaixo*/
  /*if (telaAtual === "estoque") {
    return <Estoque />;
  }

  /*se telaAtual for "cadastro", mostra só a página de Estoque e para por aqui, nem chega a olhar o resto do código abaixo*/
 /* if (telaAtual === "registrarInsumo") {
    return <RegistrarInsumo />;
  }

  if (telaAtual === "detalhesInsumo") {
    return <DetalhesInsumo />;
  }

  if (telaAtual === "apagarInsumo") {
    return <ApagarInsumo />;
  }

  if (telaAtual === "minhaConta") {
    return <MinhaConta />;
  }

  if (telaAtual === "alertas") {
    return <Alertas />;
  }

  if (telaAtual === "pedidos") {
    return <Pedidos />;
  }

  if (telaAtual === "registrarPedido") {
    return <RegistrarPedido />;
  }

  if (telaAtual === "detalhesPedido") {
    return <DetalhesPedido />;
  }

  if (telaAtual === "apagarPedido") {
    return <ApagarPedido />;
  }

  if (telaAtual === "produtos") {
    return <Produtos />;
  }

  if (telaAtual === "calendario") {
    return <Calendario />;
  }

  return (
    <div className="Fundo" style={{ padding: "0px" }}>

      <div className="tudoMenosSidebar">

        <br /> <br /> <br /> <br /> <br /> <br />

        <h1>ESSA É A PÁGINA PRINCIPAL Q O REACT DEIXA DEPOIS Q BAIXA TUDO. COMENTEI OS CODIGOS DAQUELA PÁGINA BONITINHA DO REACT E TESTEI OS COMPONENTES AQUI :D</h1>

        <br /> <br />

        <Input placeholder="Digite seu nome"/>
    
        <br /> <br />

        <Button texto="Cadastrar insumo" />

        <br /> <br />

        <Card></Card>

        <br /> <br />

        <Textarea placeholder="Digite aqui a descrição da saída" />

        <br /> <br />

        <Select options={[
          "Doces finos",
          "Bolos",
          "Tortas",
          "Sazonais",
          "Mousses e cremosos",
          "Pavês e gelados",
          "Outros" 
        ]}
        />

        <br /> <br />

        <Header nomeIndustria="Sweet Sunset" />

        <br /> <br />

        <Alert
          titulo="Estoque de farinha baixo"
          descricao="A farinha de trigo deve acabar em aproximadamente 2 dias."
          prioridade="alta"
        />

        <br />

        <Alert
          titulo="Pedido próximo do prazo"
          descricao="O pedido #125 deve ser entregue amanhã."
          prioridade="media"
        />

        <br />

        <Alert
          titulo="Backup recomendado"
          descricao="O último backup foi realizado há 10 dias."
          prioridade="baixa"
        />

       <br /> <br />

       <h3>Esses buttons abaixo são só improvisados para eu visualizar as páginas. Depois eu farei as rotas ao clicar no menu lateral.</h3>

        <Button texto="Login" onClick={() => setTelaAtual("login")} />
        <Button texto="Cadastro" onClick={() => setTelaAtual("cadastro")} />  

        <br />

        <Button texto="Estoque" onClick={() => setTelaAtual("estoque")} />
        <Button texto="Registrar insumo" onClick={() => setTelaAtual("registrarInsumo")} />
        <Button texto="Detalhes do insumo" onClick={() => setTelaAtual("detalhesInsumo")} />
        <Button texto="Apagar insumo" onClick={() => setTelaAtual("apagarInsumo")} />

        <br />

        <Button texto="Minha conta" onClick={() => setTelaAtual("minhaConta")}/>

        <br />

        <Button texto="Alertas" onClick={() => setTelaAtual("alertas")}/>

        <br />

        <Button texto="Pedidos" onClick={() => setTelaAtual("pedidos")}/>
        <Button texto="Registrar pedido" onClick={() => setTelaAtual("registrarPedido")} />
        <Button texto="Detalhes do pedido" onClick={() => setTelaAtual("detalhesPedido")} />
        <Button texto="Apagar pedido" onClick={() => setTelaAtual("apagarPedido")} />

        <br />

        
        <Button texto="Produtos" onClick={() => setTelaAtual("produtos")} />

        <br />

        <Button texto="Calendário" onClick={() => setTelaAtual("calendario")} />

      </div>

      <br /> <br />

      <Sidebar paginaAtiva="Visão geral" />

    </div>
  );
}

export default App;










/*  !!!!!!!!!!!  ESSE CÓDIGO COMENTADO É O Q O REACT CRIA DEPOIS Q INSTALAMOS ELE E AS DEPENDENCIAS  !!!!!!!!!!!

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Input from "./componentes/Input/Input.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
*/
