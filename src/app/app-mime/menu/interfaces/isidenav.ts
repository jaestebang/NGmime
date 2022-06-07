import { EOperation } from '../../../core/enum/enum-mime';

/**
 * Interfaz Menú
 */
export interface ISidenav {
    codigo: string,
    nombre: string,
    params?: string[],
    route?: boolean,
    icon?: boolean,
    modo?: EOperation,
    app?: ISidenav[],
}


