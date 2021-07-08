import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http:HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://blogpessoalapiarcangeloar.herokuapp.com/postagens', this.token)
  }

  getByIdPostagem(id_postagem: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://blogpessoalapiarcangeloar.herokuapp.com/postagens/${id_postagem}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://blogpessoalapiarcangeloar.herokuapp.com/postagens', postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>('https://blogpessoalapiarcangeloar.herokuapp.com/postagens', postagem, this.token)
  }

  deletePostagem(id_postagem: number) {
    return this.http.delete<Postagem>(`https://blogpessoalapiarcangeloar.herokuapp.com/postagens/${id_postagem}`, this.token)
  }

}