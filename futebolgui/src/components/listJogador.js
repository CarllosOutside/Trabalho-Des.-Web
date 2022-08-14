import React, { Component } from "react";
import jogadorDataServices from "../services/jogadorDataServices";
import { Link } from "react-router-dom";


export default class ListJogador extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome= this.onChangeSearchNome.bind(this);
    this.retrieveJogadores = this.retrieveJogadores.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setJogadorSelected = this.setJogadorSelected.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.searchNome = this.searchNome.bind(this);
//estado default
    this.state = {
      jogadores: [], //guarda lista de jogadores do banco de dados
      jogadorSelected: null, //guarda um jogador selecionado(para imprimir detalhes)
      indice: -1, 
      nomebusca: "" //guarda nome de um jogador para ser buscado na caixa de pesquisa
    };
  }

  componentDidMount() {
    this.retrieveJogadores();
  }
//detecta caixa de pesquisa contendo nome
  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      nomebusca: searchNome
    });
  }
//get retorna lista de json pela api
  retrieveJogadores() {
    jogadorDataServices.getAll()
      .then(response => {
        this.setState({
          jogadores: response.data //{/* armazena na variavel jogadores lista de jsons vindo de um get consumido da api */}
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
//função de refresh, re-executa retrieveJogadores
  refreshList() {
    this.retrieveJogadores();
    this.setState({
      jogadorSelected: null,
      indice: -1
    });
  }
//função recebe jogador como parâmetro e o atribui à variavel selected do state
  setJogadorSelected(jogador, index) {
    this.setState({
      jogadorSelected: jogador,
      indice: index
    });
  }
//função consome delete() da api
  removeAll() {
    jogadorDataServices.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList(); //atauliza lista de jogadores
      })
      .catch(e => {
        console.log(e);
      });
  }
//função consome get jogador/nome da api e retorna um jogador com o nome especificado
  searchNome() {
    this.setState({
      jogadorSelected: null,
      indice: -1
    });
    
    jogadorDataServices.findByNome(this.state.nomebusca) //o nome especificado esta na variavel nomebusca do estado
      .then(response => {
        this.setState({
          jogadores: response.data //a lista de jogadores com o nome buscado
        });
        console.log(response.data);
        if(this.state.nomebusca == ""){this.retrieveJogadores();} //se a caixa de busca estiver vazia, mostra todos os players
      })
      .catch(e => {
        console.log(e);
      });
  }

  //renderiza a UI
  render() {
    const { nomebusca, jogadores, jogadorSelected, indice } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome do jogador"
              value={nomebusca}
              onChange={this.onChangeSearchNome} //atualiza nomebusca
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome} //atualiza <lista>jogadores
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Jogadores</h4>
        {/**LISTAGEM DE JOGADORES(ou JOGADOR) */}
          <ul className="list-group"> {/**cria uma lista */}
            {jogadores &&
              jogadores.map((jogador, index) => ( //mapeia jsons jogadores -> index do json na lista
                <li //itens da lista
                  className={
                    "list-group-item " +
                    (index === indice ? "active" : "") //se o indice do estado=index de um jogador na lista, deixa o jogador selecionado ativo
                   }
                  onClick={() => this.setJogadorSelected(jogador, index)} //um item ao ser clicado atualiza indice e jogadorselected em estado
                  key={index}
                >
                  {jogador.nome} {/**imprime nome do jogador */}
                </li>
              ))}
          </ul>
{/**BOTAO DE EXCLUSAO */}
          <button
            className="m-1 btn btn-sm btn-danger"
            onClick={this.removeAll}>Excluir todos
          </button>
        </div>
        {/**DETALHES DE UM JOGADOR SELECIONADO */}
        <div className="col-md-6">
          {jogadorSelected ? ( //se nao for null
            <div>
              <h4>&nbsp;</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {jogadorSelected.nome}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {jogadorSelected.email}
              </div>
              <div>
                <label>
                  <strong>Data de Nascimento:</strong>
                </label>{" "}
                {jogadorSelected.datanasc}
              </div>

              <Link
                to={"/jogador/" + jogadorSelected.cod_jogador}
                className="btn btn-sm btn-warning"
                role="button"
                >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <h4>&nbsp;</h4>
              
              <p><i>Para detalhes, selecionar um jogador.</i></p>
            </div>
          )}
        </div>
      </div>
    );
  }
}