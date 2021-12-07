import { Router } from '@angular/router'

/**
 * Clase abstracta de navegación
 */
export abstract class MimeRouterNavigate {

    /**
     * Navega por la ruta principal
     * @param _route Router 
     * @param route Ruta
     */
    static navigateByMimeRouting(_router: Router, route: string = null) {
        _router.navigate(['mime', (route) ? { outlets: { 'snavoutlet': [route] } } : {}]);
    }
}
