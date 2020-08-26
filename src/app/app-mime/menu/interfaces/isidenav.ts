/**
 * Interfaz Menú
 */
export interface ISidenav {
    codigo: string,
    nombre: string,
    route?: boolean,
    icon?: boolean,
    modo?: EOperation,
    app?: ISidenav[]
}

/**
 * Enumeración modo de aplicación
 */
export enum EOperation {
    full = 0,
    query = 1
}
