import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";

import ListJogador from "./components/listJogador";
import AddJogador from "./components/addJogador";
import Jogador from "./components/jogador";


class App extends Component {
  render() {
      return (
              <div>
                <BrowserRouter>
                  <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container">
                      <Link to={"/"} className="navbar-brand">
                        <b><i>Futebol</i></b>
                      </Link>
                      <div className="navbar-nav mr-auto">
                        <li className="nav_item">
                          <Link to={"/list"} className="nav-link">
                            Listar
                          </Link>
                        </li>
                        <li className="nav_item">
                          <Link to={"/add"} className="nav-link">
                            Adicionar
                          </Link>
                        </li>
                      </div>
                    </div>
                  </nav>
                
                  <div className="container mt-3"> 
                   {/*Abaixo sao definidas as rotas dos links definidos acima*/} 
                    <Routes>
                      <Route element={<ListJogador />} path="/" />
                      <Route element={<ListJogador />} path="/list" />
                      <Route element={<AddJogador />} path="/add" /> {/*o link /add chama o componente addJogador, que é um form onde salvamos jogadores*/}
                      <Route element={<Jogador />} path="/jogador/:id" />
                    </Routes>
                  </div>
                </BrowserRouter>
              </div>
             );
  }
}
export default App;
