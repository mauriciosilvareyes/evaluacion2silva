import { Component, OnInit } from '@angular/core';
// Mauricio Silva
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicio/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formularioLogin : FormGroup;

  // -------------------------
  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService
  ) {
    this.formularioLogin = formBuilder.group({

      username: ['',
               [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(10)
               ]],
      password: ['',
              [Validators.required,
              Validators.minLength(3),
              Validators.maxLength(10)
      ]]
    })
  }

  // Método
  public logearse(){
    if(!this.formularioLogin.valid){
      alert("Error: Usuario no registrado.")
      this.formularioLogin.controls['username'].setValue("");
      this.formularioLogin.controls['password'].setValue("");
      this.formularioLogin.clearValidators
      return
    }
      this.auth.logearse(
      this.formularioLogin.controls["username"].value,
      this.formularioLogin.controls["password"].value,
    );
  }
  // -------------------------

  ngOnInit() {
  }

}
