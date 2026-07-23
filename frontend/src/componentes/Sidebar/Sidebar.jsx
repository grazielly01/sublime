/*
ESSE ARQUIVO É PARA A CRIAÇÃO DO COMPONENTE SIDEBAR (MENU LATERAL, USADO EM TODAS AS PÁGINAS DO SISTEMA):
Utilizado para o usuário navegar entre as páginas do sistema (Visão geral, Dashboard, Estoque, etc.).
Fica fechado (só ícones) por padrão, e abre (ícones + texto) quando o usuário passa o mouse em cima.
Isso é feito só com CSS (:hover), não precisa de estado (useState) aqui no JS.

OBS: os ícones aqui são SVG direto (colados no próprio código), sem usar nenhuma biblioteca externa.
Isso evita problemas de instalação/versão -- e assim como os outros componentes, fica tudo dentro desse arquivo só.
*/

import "./Sidebar.css"; /*Importando CSS base do Sidebar*/

function Sidebar({ /*criando o componente como function*/
    paginaAtiva = "Visão geral", /*nome da página em que o user está agora, pra deixar esse item clarinho; "Visão geral" fica como padrão*/
    onClicarItem, /*função executada quando o user clica em algum item do menu (ex: trocar de página); ainda sem backend/rota, então por enquanto pode nem ser usada*/
}) {

    /*lista com os itens do menu (cada item tem nome e seu ícone em SVG); igual fizemos no Select com as options*/
    const itensMenu = [
        { nome: "Visão geral", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11.5 12 4l9 7.5" />
                <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9v-6h6v6h2.5a1 1 0 0 0 1-1V10" />
            </svg>
        )},
        { nome: "Dashboard", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column-increasing-icon lucide-chart-column-increasing"><path d="M13 17V9"/><path d="M18 17V5"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M8 17v-3"/></svg>
        )},
        { nome: "Fluxo de caixa", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet-icon lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
        )},
        { nome: "Estoque", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
                <path d="M3 8l9 5 9-5M12 13v8" />
            </svg>
        )},
        { nome: "Produção", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chef-hat-icon lucide-chef-hat"><path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/></svg>
        )},
        { nome: "Calendário", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
        )},
        { nome: "Pedidos", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg>
        )},
        { nome: "Produtos", icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cake-slice-icon lucide-cake-slice"><path d="M16 13H3"/><path d="M16 17H3"/><path d="m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6"/><circle cx="9" cy="7" r="2"/></svg>
        )},
        { nome: "Alertas", icone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.3 4.3a2 2 0 0 1 3.4 0l7.6 13.2a2 2 0 0 1-1.7 3H4.4a2 2 0 0 1-1.7-3l7.6-13.2Z" />
                <path d="M12 9.5v4M12 17h.01" />
            </svg>
        )},
    ];

    return (
        /*Essa div abaixo só serve como uma caixinha pra guardar esse componente Sidebar*/
        <div className="divSidebar">

            <nav className="sidebar">

                {/*"Minha conta", sempre fica sozinha no topo*/}
                <div
                    className={"itemMenu topoSidebar" + (paginaAtiva === "Minha conta" ? " itemAtivo" : "")}
                    onClick={() => onClicarItem && onClicarItem("Minha conta")} /*"&&" só chama a função se ela existir; assim não quebra caso ninguém passe essa prop*/
                >
                    <span className="iconeItem">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" /></svg>
                    </span>
                    <span className="textoItem">Minha conta</span>
                </div>

                <hr className="divisor" /> {/*linha separando "Minha conta" do resto do menu*/}

                {/*resto dos itens do menu, um item pra cada posição da lista itensMenu*/}
                <div className="listaMenu">
                    {itensMenu.map((item) => (
                        <div
                            key={item.nome}
                            className={"itemMenu" + (paginaAtiva === item.nome ? " itemAtivo" : "")}
                            onClick={() => onClicarItem && onClicarItem(item.nome)}
                        >
                            <span className="iconeItem">{item.icone}</span>
                            <span className="textoItem">{item.nome}</span>
                        </div>
                    ))}
                </div>

                {/*rodapé do menu: Configurações e Sair*/}
                <div className="rodapeSidebar">

                    <div
                        className={"itemMenu" + (paginaAtiva === "Configurações" ? " itemAtivo" : "")}
                        onClick={() => onClicarItem && onClicarItem("Configurações")}
                    >
                        <span className="iconeItem">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14 3h-4l-.6 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2 1.2L10 21h4l.6-2.6c.7-.3 1.4-.7 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" /></svg>
                        </span>
                        <span className="textoItem">Configurações</span>
                    </div>

                    {/*"Sair" ainda não faz nada de verdade (sem backend/login por enquanto), só deixamos o visual pronto*/}
                    <div className="itemMenu">
                        <span className="iconeItem">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 4H6v16h9" /><path d="M10 12h11m0 0-3-3m3 3-3 3" /></svg>
                        </span>
                        <span className="textoItem">Sair</span>
                    </div>

                </div>

            </nav>

        </div>
    );
}

export default Sidebar;