import { Component, OnInit } from '@angular/core';
// Mauricio Silva
import { ProductosService } from '../servicio/productos.service';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements ViewDidEnter {

  // -----------
  constructor(
    public pServ : ProductosService
  ) { }


  ionViewDidEnter(): void {
    this.pServ.consultarProductos();
  }

  ngOnInit() {
  }

}
