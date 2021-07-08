import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { UsuarioService } from '../service/usuario.service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idDoTema: number

  user: Usuario = new Usuario()
  idDoUsuario = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      // alert('Sua seção expirou. Por favor, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllPostagens()

  }

  getAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idDoTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser() {
    this.usuarioService.getByIdUser(this.idDoUsuario).subscribe((resp: Usuario)=> {
      this.user = resp
    })
  }

  publicar() {

    this.tema.idTema = this.idDoTema
    this.postagem.novoTema = this.tema
    
    console.log(this.postagem)
    
    this.user.idUsuario = this.idDoUsuario
    this.postagem.novoUsuario = this.user
    
    console.log(this.postagem)
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

}
