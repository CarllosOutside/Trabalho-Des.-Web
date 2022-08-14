import http from "../http-common";

class jogadorDataService {
  getAll() {
    return http.get("/jogador");
  }

  get(id) {
    return http.get(`/jogador/${id}`);
  }

  create(data) {
    return http.post("/jogador", data);
  }

  update(id, data) {
    return http.put(`/jogador/${id}`, data);
  }

  delete(id) {
    return http.delete(`/jogador/${id}`);
  }

  deleteAll() {
    return http.delete(`/jogador`);
  }

  findByNome(data) {
    return http.get(`/jogador?nome=${data}`);
  }
}

export default new jogadorDataService();