import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/app-mime/user/services/auth.service';
import { Constants } from 'src/app/global/constants';
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
  private urlApi: string = Constants.API_MIME;

  constructor(private http: HttpClient, private aus: AuthService) { }

  /**
   * Inicaliza prámetros: 
   * Productos - Agentes
   * Direcciones - Ubicaciones
   * Datos de vehículo
   */
  initParameters() {

    // Valida si está logueado
    this.aus.isLogged$()
      .subscribe({
        next: (value) => {
          if (value) {

            // Obtiene productos localstorage
            const p: string = Crypto.decryptAES(localStorage.getItem('prodagents'));
            this.prodagents = (p === undefined || p === null) ? null : <IProducts[]>JSON.parse(p);

            if (this.prodagents === undefined || this.prodagents === null) {

              // Suscribe para obtener los productos / agentes
              this.getProductsAgents()
                .subscribe((proudcts: IProducts[]) => {
                  this.prodagents = proudcts;
                  console.log('prodagents', proudcts);
                  // Guardar productos localstorage
                  localStorage.setItem('prodagents', Crypto.encryptAES(JSON.stringify(p)));
                });
            }
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
    console.log('Inicio', this.getProductsAgents.name);

    return this.http.get<IProducts[]>(`${this.urlApi}/productsagents`);
  }
}
