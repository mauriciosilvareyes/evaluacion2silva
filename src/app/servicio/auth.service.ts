import { Injectable } from '@angular/core';
// Mauricio Silva
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, delay } from 'rxjs';
import { UsuarioLogeado } from '../modelos/UsuarioLogeado';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // -------------------------
  private cargando: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public $cargando = this.cargando.asObservable();
  // -------------------------
  private usuarioActivo: BehaviorSubject<UsuarioLogeado | null> = new BehaviorSubject<UsuarioLogeado | null>(null);
  public $usuarioActivo = this.usuarioActivo.asObservable();

  // Peticion
  private readonly URL_LOGIN = "https://dummyjson.com/auth/login";


  // -------------------------
  constructor(
    private http: HttpClient,
    private router : Router

  ) { }

  // Método para intentar logear
  public logearse(username: string, password: string){

    this.cargando.next(true);
    this.http.post<UsuarioLogeado>(
      this.URL_LOGIN, JSON.stringify({
        username: username,
        password: password
      }),
      {
        headers:{ "Content-type":"application/json"}
      }
      ) // fin this.http.post()
      .pipe(delay(2000))
      .subscribe( resultado =>{
        this.usuarioActivo.next(resultado);
        this.cargando.next(false);
        this.router.navigate(['perfil']);
      })
    }   // -------------------------


}
