import * as CryptoJS from 'crypto-js';
import { Constants } from './constants';

export class Crypto {

    constructor() { }

    /**
     *              Encripta en formato AES
     * @param s     Cadena a encriptar    
     */
    static encryptAES(s: string): string {
        const str: string = CryptoJS.AES.encrypt(s, Constants.privateKey).toString();
        return str;
    }

    /**
     *              Decripta en formato AES
     * @param s     Cadena a encriptar 
     */
    static decryptAES(s: string) {
        if (!s) return null;
        return CryptoJS.AES.decrypt(s, Constants.privateKey).toString(CryptoJS.enc.Utf8);
    }

}
