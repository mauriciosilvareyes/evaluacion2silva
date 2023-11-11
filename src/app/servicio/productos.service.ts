import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto, RespuestaProducto } from '../modelos/Productos';
import { LoadingController } from '@ionic/angular';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private readonly URL_PRODUCTO = "https://dummyjson.com/products?skip="
  public productos : Producto [] = [];
  private skip = 0;
  private limit = 30;

  // ---------------
  constructor(
    private http : HttpClient,
    private loading : LoadingController
  ) { }

  // ---------------------------
  public async consultarProductos(){
    const control = await this.loading.create({
      message: "Estamos cargando sus productos..."
    });
    control.present();
    this.http.get<RespuestaProducto>(`${this.URL_PRODUCTO}${this.skip}`)
    .pipe(delay(1000))
    .subscribe(respuesta => {
      control.dismiss();
      this.productos = respuesta.products;
      this.skip = this.skip + this.limit;
    })
  }

   // ---------
  public cargarProductosAnteriores() {
    this.skip = Math.max(0, this.skip - this.limit);
    this.consultarProductos();
  }


}
