import React, { Component } from "react";
import jogadorDataServices from "../services/jogadorDataServices";

import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

// Para obter parâmetros passados via Router v6
// Ex.: (em) this.props.match.params.id
export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }

class Jogador extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.getJogador = this.getJogador.bind(this);
    this.updateJogador = this.updateJogador.bind(this);
    this.deleteJogador = this.deleteJogador.bind(this);

    this.state = {
      jogadorAtual: {
        cod_jogador: null,
        nome: "",
        email: "",
        datanasc: ""
      },
      mensagem: "",
      submitted: false
    };
  }
  
  componentDidMount() {

    this.getJogador(this.props.match.params.id);
  }
//atualiza json
  onChangeNome(e) {
    const newnome = e.target.value;

    this.setState(function(prevState) {
      return {
        jogadorAtual: {
          ...prevState.jogadorAtual,
          nome: newnome
        }
      };
    });
  }
//atualiza json jogador
  onChangeEmail(e) {
    const nemail = e.target.value;
    
    this.setState(prevState => ({
        jogadorAtual: {
        ...prevState.jogadorAtual,
        email: nemail
      }
    }));
  }
  //atualiza datanasc do json
  onChangeData(e) {
    const ndata = e.target.value;
    
    this.setState(prevState => ({
        jogadorAtual: {
        ...prevState.jogadorAtual,
        datanasc: ndata
      }
    }));
  }
//consome get(jogador/id) da api
  getJogador(id) {
    jogadorDataServices.get(id)
      .then(response => {
        this.setState({
          jogadorAtual: response.data //state recebe jogador com id especificado
        });
        console.log(response.data);
      })
      .catch(e => {
        
        console.log("Erro: "+e);
      });
  }
//consome metodo put da api
  updateJogador() {
    jogadorDataServices.update(
      this.state.jogadorAtual.cod_jogador, //nossa api recebe id e a nova json
      this.state.jogadorAtual
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          mensagem: "Jogador atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
//consome delete da api
  deleteJogador() {    
    jogadorDataServices.delete(this.state.jogadorAtual.cod_jogador)
      .then(response => {
        console.log(response.data);
        this.setState({
            submitted: true
          });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { jogadorAtual } = this.state;

    return (
        //IMPRIME DETALHES DO JOGADOR ATUAL E CHAMA FUNCOES DE ALTERACAO EM CASO DE MUDANÇAS
      <div>
        {jogadorAtual && !this.state.submitted? (
          <div className="edit-form">
            <h4>Jogador</h4>
            <form>
              <div className="form-group">
                <label htmlFor="titulo"><strong>Nome</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  value={jogadorAtual.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="resumo"><strong>Email</strong></label>
                <input
                  type="text"
                  className="form-control"
                  id="resumo"
                  value={jogadorAtual.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="data"><strong>Data de nascimento</strong></label>
                <input
                  type="date"
                  className="form-control"
                  id="data"
                  value={jogadorAtual.datanasc}
                  onChange={this.onChangeData}
                />
              </div>
            </form>
{/**BOTAO PARA FUNCAO DE EXCLUSAO */}
            <button
              className="m-2 btn btn-sm btn-danger mr-2"
              onClick={this.deleteJogador}
            >
              Excluir
            </button>
{/** BOTAO PARA EXECUTAR FUNCAO DE UPDATE(put request)*/}
            <button
              type="submit"
              className="m-2 btn btn-sm btn-success"
              onClick={this.updateJogador}
            >
              Atualizar
            </button>
            <p>{this.state.mensagem}</p>
          </div>
        ) : (
          <div>
            <br />
            <p><i>Jogador deletado com sucesso.</i></p>
            <Link to={"/list"}>
                Voltar
              </Link>
          </div>
          
        )}
      </div>
    );
  }
}
export default withRouter(Jogador);