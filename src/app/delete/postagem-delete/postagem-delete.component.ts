import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()

  idDoPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua seção expirou. Por favor, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.idDoPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idDoPost)
  
    this.postagemService.refreshToken()
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
      console.log(this.postagem)
    })
  }

  apagar() {
    this.postagemService.deletePostagem(this.idDoPost).subscribe(()=> {
      this.alertas.showAlertSuccess('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
