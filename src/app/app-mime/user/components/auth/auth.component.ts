import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Crypto } from 'src/app/global/crypto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private _aus: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this._aus.init();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(5), this.whiteSpace]],
      pass: ['', [Validators.required, Validators.minLength(5), this.whiteSpace]]
    })
  }

  login(e: Event) {
    e.preventDefault();

    //Obtiene datos del form
    let user: string = this.form.get("user").value;
    let pass: string = this.form.get("pass").value;

    //Encripta credenciales
    user = Crypto.encryptAES(user.trim());
    pass = Crypto.encryptAES(user.trim());

    //Suscribe al método login
    if (this.form.valid) {
      this._aus.login(user, pass)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (value) => {
            if (value) {
              this._router.navigate(['']);
              this._snackBar.open("Has iniciado sesión", "Hecho", { duration: 20000 });
            }
          }
        })
    }
  }

  whiteSpace(control: AbstractControl): ValidationErrors | null {
    const s: String = control.value;
    if (s.trim().length === 0) return { required: true }
    return null;
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
