import "./Sidebar.css";
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <div className="divSidebar">
      <nav className="sidebar">
        <Link to="/minhaConta" className="itemMenu topoSidebar">
          <span className="iconeItem">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-circle-user-round">
              <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
              <circle cx="12" cy="11" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </span>
          <span id="idMinhaConta" className="textoItem">Minha conta</span>
        </Link>

        <hr className="divisor" />

        <div className="listaMenu">
             {/* Visão geral */}
          <Link to="/visaogeral" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-home">
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9v-6h6v6h2.5a1 1 0 0 0 1-1V10" />
              </svg>
            </span>
            <span className="textoItem">Visão geral</span>
          </Link>

            <Link to="/dashboard" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-chart-column-increasing">
                <path d="M13 17V9" />
                <path d="M18 17V5" />
                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                <path d="M8 17v-3" />
              </svg>
            </span>
            <span className="textoItem">Dashboard</span>
          </Link>

          <Link to="/fluxocaixa" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-wallet">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
            </span>
            <span className="textoItem">Fluxo de caixa</span>
          </Link>
          
          
          <Link to="/estoque" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-box">
                <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
                <path d="M3 8l9 5 9-5M12 13v8" />
              </svg>
            </span>
            <span className="textoItem">Estoque</span>
          </Link>

          <Link to="/producao" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-chef-hat">
                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
                <path d="M6 17h12" />
              </svg>
            </span>
            <span className="textoItem">Produção</span>
          </Link>

          <Link to="/calendario" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-calendar">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
            </span>
            <span className="textoItem">Calendário</span>
          </Link>

          <Link to="/pedidos" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-shopping-bag">
                <path d="M16 10a4 4 0 0 1-8 0" />
                <path d="M3.103 6.034h17.794" />
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
              </svg>
            </span>
            <span className="textoItem">Pedidos</span>
          </Link>

          <Link to="/produtos" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-cake-slice">
                <path d="M16 13H3" />
                <path d="M16 17H3" />
                <path d="m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6" />
                <circle cx="9" cy="7" r="2" />
              </svg>
            </span>
            <span className="textoItem">Produtos</span>
          </Link>

            {/* Alertas */}
          <Link to="/alertas" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-alert-triangle">
                <path d="M10.3 4.3a2 2 0 0 1 3.4 0l7.6 13.2a2 2 0 0 1-1.7 3H4.4a2 2 0 0 1-1.7-3l7.6-13.2Z" />
                <path d="M12 9.5v4" />
                <path d="M12 17h.01" />
              </svg>
            </span>
            <span className="textoItem">Alertas</span>
          </Link>
        </div>


        <div className="rodapeSidebar">
          {/* Configurações */}
          <Link to="/configuracoes" className="itemMenu">
            <span className="iconeItem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-settings">
                <circle cx="12" cy="12" r="3" />
                <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2L10 21h4l.6-2.6c.7-.3 1.4-.7 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" />
              </svg>
            </span>
            <span className="textoItem">Configurações</span>
          </Link>

           
          {/* Sair */}
        <Link to="/sair" className="itemMenu">
         <span className="iconeItem">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-log-out">
           <path d="M15 4H6v16h9" />
          <path d="M10 12h11m0 0-3-3m3 3-3 3" />
         </svg>
         </span>
           <span className="textoItem">Sair</span>
        </Link>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;



//sidebar antigo sofia 



/* import "./Sidebar.css"; /*Importando CSS base do Sidebar*/

//  function Sidebar({ /*criando o componente como function*/
 //   paginaAtiva = "Visão geral", /*nome da pagina em que o user está agora, pra deixar esse item mais clarinho; "Visão geral" fica como padrão*/
 //   onClicarItem, /*função executada quando o user clica em algum item do menu (ex: trocar de página); ainda não pode ser usada por nao ter backend e as rotas.*/
//}) {  */

    /*lista com os itens do menu (cada item tem nome e seu ícone em SVG); igual fizemos no Select com as options*/
   // const itensMenu = [  /*criando um array pra armnazenar os itens do menu*/

       /* { nome: "Visão geral", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9v-6h6v6h2.5a1 1 0 0 0 1-1V10" />
            </svg>
            /*essas tags <svg> e <path> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
        // )}, 

       /* { nome: "Dashboard", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column-increasing-icon lucide-chart-column-increasing">
                <path d="M13 17V9"/>
                <path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                <path d="M8 17v-3"/>
            </svg>*/
            /*essas tags <svg> e <path> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
      //  )}, 

      /*  { nome: "Fluxo de caixa", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
            </svg>
            /*essas tags <svg> e <path> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
      //  )}, 

       /* { nome: "Estoque", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
                <path d="M3 8l9 5 9-5M12 13v8" />
            </svg>
            /*essas tags <svg> e <path> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
        //  )},

      /*  { nome: "Produção", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chef-hat-icon lucide-chef-hat">
                <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/>
                <path d="M6 17h12"/>
            </svg>
            /*essas tags <svg> e <path> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
      //  )},

      /*  { nome: "Calendário", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            /*essas tags <svg> e <path> e <rect> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
     //   )},

    /*    { nome: "Pedidos", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag">
                <path d="M16 10a4 4 0 0 1-8 0"/>
                <path d="M3.103 6.034h17.794"/>
                <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/>
            </svg>
            /*essas tags <svg> e <path> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
    //    )},

     /*   { nome: "Produtos", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cake-slice-icon lucide-cake-slice">
                <path d="M16 13H3"/>
                <path d="M16 17H3"/>
                <path d="m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6"/>
                <circle cx="9" cy="7" r="2"/>
            </svg>
            /*essas tags <svg> e <path> e <circle> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
     //   )},

      /*  { nome: "Alertas", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.3 4.3a2 2 0 0 1 3.4 0l7.6 13.2a2 2 0 0 1-1.7 3H4.4a2 2 0 0 1-1.7-3l7.6-13.2Z" />
                <path d="M12 9.5v4M12 17h.01" />
            </svg>
            /*essas tags <svg> e <path> acima eu só copiei e colei do site do lucide react pra aplicar aqui o ícone*/
      //  )},
 //   ];

 //   return (
        /*Essa div abaixo só serve como uma caixinha pra guardar esse componente Sidebar*/
      //  <div className="divSidebar">

       //     <nav className="sidebar"> {/*aqui é nav ao invés de div, pq o nav é uma div de navegação (ideal pra esse menu lateral)*/}

             //   {/*abaixo temos uma div para "Minha conta" que sempre fica sozinha no topo*/}
            //   <div className={"itemMenu topoSidebar" + (paginaAtiva === "Minha conta" ? " itemAtivo" : "")} onClick={() => onClicarItem && onClicarItem("Minha conta")}>  {/*EXPLICAÇÃO DESSA PARTE NO FINAL DO CÓDIGO*/}
              //      <span className="iconeItem"> {/*todo icone vai ter seu className como iconeItem*/}
               //     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M17.925 20.056a6 6 0 0 0-11.851.001"/><circle cx="12" cy="11" r="4"/><circle cx="12" cy="12" r="10"/></svg> {/*SVG copiado do site do lucide react*/}
               //     </span>
               //     <span className="textoItem" id="textoMinhaConta">Minha conta</span> {/*Todo texto para nome do item vai ter seu className como textoItem*/}
             //   </div>  

           //     <hr className="divisor" /> {/*linha separando "Minha conta" do resto do menu*/} 

            //    {/*abaixo temos uma div para o resto dos itens do menu, um item pra cada posição da lista itensMenu (a const la em cima)*/}
             /*   <div className="listaMenu">
                    {itensMenu.map((item) => ( /*itensMenu.map: o .map percorre o array itensMenu, e para cada item, cria uma div*/
                    //    <div key={item.nome} className={"itemMenu" + (paginaAtiva === item.nome ? " itemAtivo" : "")} onClick={() => onClicarItem && onClicarItem(item.nome)}> {/*EXPLICAÇÃO DESSA PARTE NO FINAL DO CÓDIGO*/}
                  //          <span className="iconeItem">{item.icone}</span>
                   //         <span className="textoItem">{item.nome}</span> 
                //        </div> 
       //             ))}
           //     </div>

         //       {/*abaixo temos uma div do rodapé do menu: Configurações e Sair*/}
            //    <div className="rodapeSidebar">

              //      <div className={"itemMenu" + (paginaAtiva === "Configurações" ? " itemAtivo" : "")} onClick={() => onClicarItem && onClicarItem("Configurações")}> {/*EXPLICAÇÃO DESSA PARTE NO FINAL DO CÓDIGO*/}
               //         <span className="iconeItem">
               //             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2L10 21h4l.6-2.6c.7-.3 1.4-.7 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" /></svg>  {/*SVG copiado do site do lucide react*/}
                //        </span>
             //           <span className="textoItem">Configurações</span> {/*o textinho escrito "Configurações*/}
            //        </div>

          //          {/*"Sair" ainda não faz nada de verdade (sem backend/login por enquanto), só deixei o visual pronto*/}
            //        <div className="itemMenu"> {/*denovo a div para o item*/}
            //            <span className="iconeItem"> {/*denovo o icone*/}
           //                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 4H6v16h9" /><path d="M10 12h11m0 0-3-3m3 3-3 3" /></svg> {/*SVG copiado do site do lucide react*/}
           //             </span>
           //             <span className="textoItem">Sair</span> {/*denovo o textinho com o nome do item*/}
          /*          </div>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar; 



/*                                                                     !!!!!!!!!!!  EXPLICAÇÃO DA 1ª PARTE CONFUSA  !!!!!!!!!!!
  (o className da div q abriga "Minha conta"):
  <div className={"itemMenu topoSidebar" + (paginaAtiva === "Minha conta" ? " itemAtivo" : "")} onClick={() => onClicarItem && onClicarItem("Minha conta")}>

- <div: abrindo uma div
- className={: oq tá dentro do className tá entre {} pq é código javaScript. então, após o =, dentro de {}, temos código javaScript formando alguma lógica...
  esse código dentro dos {} é:  "itemMenu topoSidebar" + (paginaAtiva === "Minha conta" ? " itemAtivo" : "")
- itemMenu topoSidebar: o className possui 2 classes CSS dentro da msm String, pois o HTML permite. Elas estão concatenadas (pois estao uma do ladinho da outra separadas por espaço)
- +: o operador de somar entre duas strings as junta uma na outra.
  então sobra só: (paginaAtiva === "Minha conta" ? " itemAtivo" : "").
  isso é um operador ternário: uma forma de fazer if e else numa linha só. sua estrutura é sempre: condição ? valorSeVerdadeiro : valorSeFalso
- paginaAtiva: é a var q guarda em qual pág o user está agora
- ===: três operadores de igualdade comparam valor e tipo das vars
- Minha conta: o texto q estamos comparando com paginaAtiva
- ?: se verdadeiro, então...
- itemAtivo: ...use isso
- : senão, então...
- "": ...use isso (string vazia)

- OU SEJA: se paginaAtiva for exatamente "Minha conta", o resultado final do className (da div q abriga "Minha conta") vira "itemMenu topoSidebar itemAtivo". Se não for, vira só "itemMenu topoSidebar". 
É assim que o item fica "clarinho" (classe itemAtivo aplicando aquele CSS de fundo mais claro) só quando é a página ativa.


agora na parte:
onClick={() => onClicarItem && onClicarItem("Minha conta")}>

- onClick: o evento q acontece quando o user clicar
- { }: oq tem dentro é javaScript, nao texto
- () =>: isso é uma arrow function (função anônima), por isso ta vazio os (). ela só tá aí pra usar depois. a gente coloca esse () => pq se não o react executaria imediatamente o onClick, mas nao pode, tem q esperar O USER CLICAR pra mudar de pág, aí por isso a gnt deixa esse () => pra por dentro uma função q muda de pág quando o user clica
- onClicarItem: primeiro o react acaba verificando pra ver se essa var existe, se tem algum valor dentro, ou ta undefined,...
- &&: operador "E", olha pro esquerdo primeiro: se for falso, nem olha pro direito; só roda se o lado esquerdo passar nesse teste/for verdadeiro (se a função existir)
  o && é uma trava d segurança: por nao ter backend, a função ainda nao existe, aí o react reclamaria dizendo q a function nao existe. mas com o &&, ele fica aguardando a function existir.
- ("Minha conta"): informa q foi o item "Minha conta" q foi clicado

!!!!!!RESUMO DE TUDO:!!!!!!!
coloca a classe CSS certa dependendo de qual página tá ativa, e prepara um clique que só dispara a função de navegação se ela tiver sido passada pra esse Sidebar.
*/






/*                                                                     !!!!!!!!!!!  EXPLICAÇÃO DA 2ª PARTE CONFUSA  !!!!!!!!!!!
<div key={item.nome} className={"itemMenu" + (paginaAtiva === item.nome ? " itemAtivo" : "")} onClick={() => onClicarItem && onClicarItem(item.nome)}>

MESMA LÓGICA de antes. O className funciona idêntico (monta a string "itemMenu" + a classe "itemAtivo" só se for a página ativa), e o onClick também segue o mesmo esquema de 
arrow function + && pra só chamar a funçao de navegação se ela existir e nn travar o app.

OQ É DIFERENTE:
-a comparação do ternário mudou de alvo: antes era "paginaAtiva === "Minha conta"" (comparando com um texto fixo, escrito a mao, porque só existe um item "Minha conta" naquela div). Agora é 
"paginaAtiva === item.nome": comparando com "item.nome", que é um valor que mudda a cada volta do ".map()". Isso faz sentido porque essa <div> não representa um item só (como no caso de Minha conta), 
ela representa qualquer um dos itens da lista "itensMenu" (Visão geral, Dashboard, Estoque, etc.). O React usa esse mesmo pedaço de codigo várias vezes, uma pra cada objeto dentro do array, e em 
cada repetição o item é um objeto diferente da lista. ENTÃO FICA: 
"a pagina ativa é igual ao nome desse item especifico que eu to "colocando" agora?"

-o argumento do clique tbm mudou pelo mesmo motivo: antes era "onClicarItem("Minha conta")", um texto fixo. Agora é "onClicarItem(item.nome)": pega o nome do item atual do loop e manda ele 
como informação de qual item foi clicaado. Se aí fosse texto fixo, todos os itens do menu (Dashboard, Estoque, Pedidos...) avisariam sempre "Minha conta" quando clicados, aí estaria errado.

-E o "key={item.nome}" é um plus: nn tem nada a ver com CSS nem com clique: é uma exigência do próprio React. Toda vez q usamos ".map()" pra criar uma lista de elementos JSX, o React obriga a 
colocar uma prop key em cada item gerado. É assim q o React consegue "rastrear" cada item individualmente por trás, sem precisar redesenhar a lista toda, do zero, toda vez. então usei 
"item.nome" como key (em vez de um número como no Select q usa index) pq aq cada nome ja é único por natureza
*/






/*                                                                     !!!!!!!!!!!  EXPLICAÇÃO DA 3ª PARTE CONFUSA  !!!!!!!!!!!
<div className={"itemMenu" + (paginaAtiva === "Configurações" ? " itemAtivo" : "")} onClick={() => onClicarItem && onClicarItem("Configurações")}>

-msma lógica do "Minha conta": className monta "itemMenu" + "itemAtivo", só qnd paginaAtiva bate com o texto fixo comparado, e o onClick dispara "onClicarItem" com "&&" na frente p nao travar 
caso a function não tenha sido passada ainda

-OQ MUDA: ao inves de "Minha conta", aq é "Configurações"; tanto no "paginaAtiva === "Configurações"" (p saber se deve ficar com a classe "itemAtivo"), quanto no "onClicarItem("Configurações")"
(pra avisar, se o usuário clicar, que foi especificamente o item "Configurações" q foi escolhido). 
E na classe tbm tem algo diferente: aqui é só "itemMenu" sem o "topoSidebar" que tinha no "Minha conta": pois aquele "topoSidebar" era uma classe extra só pra deixar aquele item específico com 
ícone em cima e texto embaixo no CSS; "Configurações" segue o layout padrão dos outros itens, ícone e texto lado a lado, então nn precisa dessa classe a mais
*/