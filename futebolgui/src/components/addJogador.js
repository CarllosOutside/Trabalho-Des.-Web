import React, { Component } from "react";
import JogadorDataServices from "../services/jogadorDataServices";

export default class AddJogador extends Component {

    constructor(props) {
        super(props);
        //detecta eventos de mudança no estado
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.saveJogador = this.saveJogador.bind(this);
        this.newJogador = this.newJogador.bind(this);    
        //default estado
        this.state = {
            id: null,
            nome: "",
            email: "", 
            datanasc: "",
            submitted: false
          };
    }
    //detecção de mudanças + atualização do estado
    onChangeNome(e) {
        this.setState({
          nome: e.target.value
        });
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }

      onChangeData(e) {
        this.setState({
          datanasc: e.target.value
        });
      }

      //função salvaJson
      saveJogador() {
          //Json a ser salvo
        var data = {
          nome: this.state.nome,
          email: this.state.email,
          datanasc: this.state.datanasc
        };
        //chama função create(POST para Json criado)
        JogadorDataServices.create(data)
          .then(response => {
            this.setState({ //ao criar Json, atualiza estado atual
              id: response.data.id,
              nome: response.data.nome,
              email: response.data.email,
              datanasc: response.data.datanasc,
              submitted: true //submitted recebe true se Json foi inserido com sucesso usando POST
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      //função para criar novo jogador(reseta estado)
    newJogador() {
        this.setState({
          id: null,
          nome: "",
          email: "",
          datanasc: "",
          submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                { this.state.submitted ? ( //if(estado.submitted=true) -> reseta estado chamando funcao newjogador
                              <div>
                              <h4>Jogador cadastrado!</h4> 
                              <button className="btn btn-success" onClick={this.newJogador}>  
                                Adicionar outro jogador
                              </button>
                            </div>
                  
                ) : (//else
                    <div>
                    <div className="form-group">
                      <label htmlFor="nome"><strong>Nome</strong></label>
                      <input //campo do form para entrar com nome do joagdor
                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={this.state.nome}
                        onChange={this.onChangeNome} //atualiza estado ao detectar mudanças no campo nome
                        name="nome"
                      />
                    </div>
        
                    <div className="form-group">
                      <label htmlFor="resumo"><strong>Email</strong></label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        name="email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="resumo"><strong>Data de Nascimento</strong></label>
                      <input
                        type="date"
                        className="form-control"
                        id="datanasc"
                        required
                        value={this.state.datanasc}
                        onChange={this.onChangeData}
                        name="datanasc"
                      />
                    </div>
                   <p></p>
            
                    <button onClick={this.saveJogador} className="btn btn-success">
                      Cadastrar 
                    </button> 
                  </div> //o botao acima chama a funcao saveJogador, que faz POST na api enviando uma Json preenchdia no fromulario
                )}
            </div>
        )
    } 
}