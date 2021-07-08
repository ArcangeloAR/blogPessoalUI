import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getByIdUser(id_usuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(`https://blogpessoalapiarcangeloar.herokuapp.com/usuarios/${id_usuario}`, this.token)
  }
}
