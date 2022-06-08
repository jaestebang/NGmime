import { Time } from '@angular/common';
import { environment } from '../../environments/environment';

/**
 * Constantes de la aplicación
 */
export class Constants {

    /**
     * Minutos expiración cookies
     */
    static timeExpireCookie: number = (30 / 1440);

    /**
     * Llave privada crypto
     */
    static privateKey: string = "mime@ng";

    //URL Aplicación
    static API_MIME: string = environment.api_mime;

}
