/**
 * Menú
 */
export interface ISidenav {
    codigo: string,
    nombre: string,
    submenu: ISubMenu[],
    app: IApp[]
}

/**
 * SubMenú
 */
export interface ISubMenu {
    codigo: string,
    nombre: string,
    app: IApp[]
}

/**
 * Interfaz de aplicación
 */
export interface IApp {
    codigo: string,
    nombre: string,
    modo: EOperation
}

/**
 * Enumeración modo de aplicación
 */
export enum EOperation {
    full = 0,
    query = 1
}
