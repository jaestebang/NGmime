import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Crypto } from 'src/app/global/crypto';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'user-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.scss']
})
export class UnlockComponent implements OnInit {

  form: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private _aus: AuthService,
    private _route: Router,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<UnlockComponent>
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      pass: ['', [Validators.required, Validators.minLength(5), this.whiteSpace]]
    })
  }

  login(e: Event) {
    e.preventDefault();

    //Obtiene datos del form
    let user: string = "prueba";
    let pass: string = this.form.get("pass").value;

    //Encripta credenciales
    user = Crypto.encryptAES(user.trim());
    pass = Crypto.encryptAES(user.trim());

    //Suscribe al método login
    if (this.form.valid) {
      this._aus.login(user, pass, false)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (value) => {
            if (value) {
              this._snackBar.open("Has iniciado sesión", "Hecho", { duration: 20000 });
              this._dialogRef.close();
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