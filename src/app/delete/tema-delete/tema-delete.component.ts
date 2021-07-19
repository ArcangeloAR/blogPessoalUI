import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idDoTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua seção expirou. Por favor, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.idDoTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idDoTema)
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar() {
    this.temaService.deleteTema(this.idDoTema).subscribe(() => {
      this.alertas.showAlertSuccess('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }
}
