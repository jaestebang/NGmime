import { ESexo, ERol } from '../../../core/enum/enum-mime';

/**
 * Interfaz de usuario
 */
export interface IUser{
    user: string,
    nombre: string,
    sexo: ESexo,
    email: string,
    idioma: string,
    rol:  ERol
}
