import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/app-mime/user/services/auth.service';
import { Crypto } from 'src/app/global/crypto';
import { IProducts } from '../interfaces/iproducts';

@Injectable({
  providedIn: 'root',
})

/**
 * Servicio de pre-carga cotizaciones
 */
export class ProviderQuoteService {
  private prodagents: IProducts[];

  constructor(private _http: HttpClient, private _aus: AuthService) { }

  /**
   * Inicaliza prámetros: 
   * Productos - Agentes
   * Direcciones - Ubicaciones
   * Datos de vehículo
   */
  initParameters() {

    //Valida si está logueado
    this._aus.isLogged$()
      .subscribe({
        next: (value) => {
          if (value) {

            //Obtiene productos localstorage
            const p: string = Crypto.decryptAES(localStorage.getItem("prodagents"));
            this.prodagents = (p === undefined || p === null) ? null : <IProducts[]>JSON.parse(p);

            if (this.prodagents === undefined || this.prodagents === null) {

              //Suscribe para obtener los productos / agentes
              this.getProductsAgents()
                .subscribe((p: IProducts[]) => {
                  this.prodagents = p;
                  console.log("prodagents", p);
                  //Guardar productos localstorage
                  localStorage.setItem("prodagents", Crypto.encryptAES(JSON.stringify(p)));
                });
            };
          }
        }
      }
      );
  }

  /**
 * Obtiene productos / agentes
 * @returns Observable de tipo IQuestions[]
 */
  getProductsAgents(): Observable<IProducts[]> {
    console.log("Inicio", this.getProductsAgents.name);

    return this._http.get<IProducts[]>("/productsagents");
  }
}
