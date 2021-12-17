import { ESex, ERole } from '../../../core/enum/enum-mime';

/**
 * Interfaz de usuario
 */
export interface IUser{
    user: string,
    name: string,
    sex: ESex,
    email: string,
    idiom: string,
    role:  ERole
}
