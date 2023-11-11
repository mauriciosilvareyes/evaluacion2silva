import { Component, OnInit } from '@angular/core';
// Mauricio Silva
import { UsuarioLogeado } from '../modelos/UsuarioLogeado';
import { AuthService } from '../servicio/auth.service';
import { ViewWillEnter, ViewDidEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements ViewWillEnter, ViewDidEnter {

  // -------------------------
  public usuarioActivo: UsuarioLogeado | null = null;
  private suscripcion: Subscription | null = null;

  // -------------------------
  constructor(
    private auth: AuthService
  ) { }

  // -------------------------
  ionViewWillEnter(): void {
    this.suscripcion = this.auth.$usuarioActivo.subscribe(usuario => {
      this.usuarioActivo = usuario;
    })
  }
  // -------------------------
  ionViewDidEnter(): void {
    this.suscripcion?.unsubscribe();
  }

  ngOnInit() {
  }

}
