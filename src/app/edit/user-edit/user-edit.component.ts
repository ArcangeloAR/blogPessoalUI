import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idDoUsuario: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua seção expirou. Por favor, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.idDoUsuario = this.route.snapshot.params['id']
    this.findByIdUser(this.idDoUsuario)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão diferentes. Por favor, verifique.')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSuccess('Usuario atualizado com sucesso! Faça login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number) {
    this.usuarioService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}
