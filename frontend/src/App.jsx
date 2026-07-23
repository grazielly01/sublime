/*import { useState } from 'react'
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

import './App.css'
import Input from "./componentes/Input/Input.jsx";
import Button from "./componentes/Button/Button.jsx";
import Card from "./componentes/Card/Card.jsx";
import Textarea from "./componentes/TextArea/TextArea.jsx";
import Select from "./componentes/Select/Select.jsx";
import Header from './componentes/Header/Header.jsx';
import Alert from "./componentes/Alerts/Alerts.jsx";
import Sidebar from "./componentes/Sidebar/Sidebar.jsx";

function App() {
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
      </div>

      <br /> <br />
      <Sidebar paginaAtiva="Visão geral" />

    </div>
  );
}

export default App;