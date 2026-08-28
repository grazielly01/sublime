import { useState } from "react"; /*useState para: guardar o mês e o ano que estão sendo exibidos, e troca esse valor quando o user clica nas setinhas*/
import "./calendario.css";
import { Link } from "react-router-dom";
import Button from "../../componentes/Button/Button.jsx";   /*Importando o componente button da pasta componentes*/
import Sidebar from "../../componentes/Sidebar/Sidebar.jsx";  /*Importando o componente sidebar da pasta componentes*/
import Header from "../../componentes/Header/Header.jsx";  /*Importando o componente header da pasta componentes*/
import Select from "../../componentes/Select/Select.jsx";  /*Importando o componente Select da pasta componentes*/

function Calendario() {

    /* -mesAtual guarda o número do mês mostrado (0 = Janeiro, 1 = Fevereiro, ..., 11 = Dezembro; começando em 0 pq no mundo na programação esses negocios começam em 0)
       -anoAtual guarda o ano mostrado.
       -Começa em maio (índice 4) de 2026, como no protótipo*/
    
    const [mesAtual, setMesAtual] = useState(4);
    const [anoAtual, setAnoAtual] = useState(2026);

    /*nomes dos meses, na ordem certa*/
    const nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    /*nomes dos dias da semana, na ordem certa tb*/
    const nomesDiasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

    /*Lista de eventos do calendário (é um exemplo só pra gente visualizar a tela).
    quando o backend existir, essa lista vai vir do banco de dados.
    "mes" segue a mesma contagem do javaScript: 0 = Janeiro, 4 = Maio,......*/
    const eventos = [
        { dia: 1, mes: 4, ano: 2026, titulo: "Manutenção banheiro", categoria: "outro" },
        { dia: 4, mes: 4, ano: 2026, titulo: "Compra chocolate", categoria: "compra" },
        { dia: 5, mes: 4, ano: 2026, titulo: "45 Cupcake Red Velvet", categoria: "producao" },
        { dia: 13, mes: 4, ano: 2026, titulo: "20 Copo Felicidade Sen...", categoria: "producao" },
        { dia: 16, mes: 4, ano: 2026, titulo: "45 Cupcake Red Velvet", categoria: "entrega" },];

    /*lista de anos pro Select (2026 até 2076), montada com um for comum*/
    const anos = [];
    for (let ano = 2026; ano <= 2076; ano++) {
        anos.push(ano.toString());  /*.toString() pq o Select espera um texto em cada option, nao um número puro*/
    }

    /*função chamada ao clicar na seta da esquerda: volta um mês. se o mês atual já for Janeiro (0), volta pra Dezembro (11) do ano anterior.*/
    function mesAnterior() {
        if (mesAtual === 0) {
            setMesAtual(11);
            setAnoAtual(anoAtual - 1);
        } else {
            setMesAtual(mesAtual - 1);
        }
    }

    /*função chamada ao clicar na seta da direita: avança um mês. se o mês atual já for Dezembro (11), avança pra janeiro (0) do ano seguinte.*/
    
    function proximoMes() {
        if (mesAtual === 11) {
            setMesAtual(0);
            setAnoAtual(anoAtual + 1);
        } else {
            setMesAtual(mesAtual + 1);
        }
    }

    /*função chamada quando o user escolhe um ano diferente no Select*/
    function mudarAno(evento) {
        setAnoAtual(Number(evento.target.value)); /*Number() pq o value do select sempre vem como texto, e a gente guarda o ano como número*/
    }

    /*Montando a grade de dias do mês atual:
    1- "primeiroDiaSemana" descobre em qual dia da semana cai o dia 1 desse mês (0 = domingo, 6 = sábado): o javaScript calcula isso sozinho;
    2- "totalDiasMes" descobre quantos dias esse mês tem (28, 29, 30 ou 31): a manha é pedir o "dia 0" do mês seguinte, que sempre é o último dia do mês atual;
    3- "celulas" é a lista de tudo que vai aparecer na grade: primeiro alguns espaços vazios (null), pra empurrar o dia 1 pro dia da semana certo, depois um número pra 
    cada dia do mês, e dps mais espaços vazios pra completar a última linha da grade.*/
    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    const totalDiasMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

    const celulas = [];

    for (let i = 0; i < primeiroDiaSemana; i++) {
        celulas.push(null); /*espaço vazio antes do dia 1*/
    }
    

    for (let dia = 1; dia <= totalDiasMes; dia++) {
        celulas.push(dia);
    }

    while (celulas.length % 7 !== 0) {
        celulas.push(null); /*completa a ultima linha da grade com espaços vazios*/
    }

    return (
        <div className="tudoCalendario">  {/*Div q abriga tudo*/}

            <Sidebar paginaAtiva="Calendário" /> {/*Menu lateral, coloquei "Calendário" como página ativa para "Calendário" no menu lateral ficar clarinho*/}

            <div className="tudoMenosSidebar tudoMenosSidebarCalendario"> {/*Tudo menos o sidebar q ta acima*/}

                <Header nomeIndustria="Sweet Sunset" /> {/*componente header*/}

                <div className="conteudoCalendario"> {/*Div com o conteúdo da página*/}
                <div></div>

                    {/*linha de cima: título + subtítulo*/}
                    <div className="topoCalendario">
                        <h1 className="tituloCalendario">Calendário</h1>
                        <p className="subtituloCalendario">Planejamento de produção, compras, entregas e pagamentos.</p>
                    </div>

                    {/*"janela" branca com o calendário em si*/}
                    <div className="janelaCalendario">

                        {/*cabeçalho: seta esquerda, mês + ano, seta direita*/}
                        <div className="cabecalhoCalendario">

                            <button className="setaMes" onClick={mesAnterior}>
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

                            <button className="setaMes" onClick={proximoMes}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>

                        </div>

                        {/*linha com os nomes dos dias da semana*/}
                        <div className="linhaDiasSemana">
                            {nomesDiasSemana.map((nomeDia) => (
                                <div className="diaSemana" key={nomeDia}>{nomeDia}</div>
                            ))}
                        </div>

                        {/*grade com os dias do mês; .map() percorre  "celulas" e cria uma caixinha p cada uma*/}
                        <div className="gradeCalendario">
                            {celulas.map((dia, index) => {

                                /*procura se existe algum evento cadastrado nesse dia específico (do mês e ano atuais)*/
                                const eventoDoDia = eventos.find((evento) =>
                                    evento.dia === dia && evento.mes === mesAtual && evento.ano === anoAtual
                                );

                                return (
                                    <div className="celulaDia" key={index}>
                                        {dia !== null && ( /*so mostra conteúdo se a célula nn for um espaço vazio*/
                                            <div className="conteudoCelula">
                                                <span className="numeroDia">{dia}</span>
                                                {eventoDoDia && (
                                                    <Link to="/calendario/detalhes" className="botaoDetalhesEvento">
                                                        <span className={"tagEvento " + eventoDoDia.categoria}>
                                                            {  eventoDoDia.titulo}
                                                        </span>
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="rodapeCalendario">
                            {/*legenda das categorias*/}
                            <div className="legendaCategorias">
                                <span className="tagEvento producao">Produção</span>
                                <span className="tagEvento entrega">Entrega</span>
                                <span className="tagEvento compra">Compra</span>
                                <span className="tagEvento pagamento">Pagamento</span>
                                <span className="tagEvento outro">Outro</span>
                            </div>

                            {/* botao de add evento*/}
                            <div className="divBotaoNovoEvento">
                                <Link to="/calendario/registrar" className="botaoNovoEvento">
                                    <Button texto="+ Novo evento" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendario;