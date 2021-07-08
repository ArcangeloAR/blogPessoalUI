import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idDoTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      // alert('Sua seção expirou. Por favor, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    let idDaPostagem = this.route.snapshot.params['id_postagem']
    this.findByIdPostagem(idDaPostagem)
    this.findAllTemas()

  }

  findByIdPostagem(idDaPostagem: number) {
    this.postagemService.getByIdPostagem(idDaPostagem).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idDoTema).subscribe((resp: Tema)=> {
      this.tema = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[])=> {
      this.listaTemas = resp
    })
  }

  atualizar() {
    this.tema.idTema = this.idDoTema
    this.postagem.novoTema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=> {
      this.postagem = resp
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
