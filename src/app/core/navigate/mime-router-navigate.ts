import { Router } from '@angular/router';

/**
 * Clase abstracta de navegación
 */
export abstract class MimeRouterNavigate {

    /**
     * Navega por la ruta principal
     * @param router Router 
     * @param route Ruta
     */
    static navigateByMimeRouting(router: Router, route: string = null) {
        router.navigate(['mime', (route) ? { outlets: { 'snavoutlet': [route] } } : {}]);
    }
}
