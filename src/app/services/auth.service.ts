import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { AppConfigService } from './app-config.service';
import { Security } from '../models/security';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
      private router: Router,
      @Inject('env') private ENV)
      {
        this.SECURITY_API = this.ENV.APIS.SECURITY;
      }

    private CONFIG = AppConfigService.settings;
    private SECURITY_API: string;
    private EXPIRE_TIME_IN_MILLISECOND = Number(AppConfigService.settings.security.sessionExpireTimeInMinutes) * 60000;
    public security: Security = null;

    private securitySubject = new BehaviorSubject(this.security);
    private securityObservable: Observable<Security> = this.securitySubject.asObservable();

    getSecurity() {
      if ( sessionStorage.getItem('security')) {
        this.setSecurity(JSON.parse(sessionStorage.getItem('security')));
      }
      return this.security;
    }

    /**
     * Cierra la sesión del usuario limpiando todos los datos.
     * @param returnPath Ruta a la que se redirecciona despues de hacer login.
     * Si no se especifica se usara la variable de configuración `security.onLoginOkRedirectTo`
     * en caso de estar activa por el flag `security.onLoginOkRedirect`.
     */
    closeSession(returnPath?: string, redirect?: string) {
      // Limpiar estados y variables de session
      this.security = {
        name: '',
        expireTime: 0,
        rol: {},
        token: '',
        isAuth: false,
      };
      this.setSecurity(this.security);
      sessionStorage.clear();
      localStorage.clear();
      // this.navigateTo([AppConfigService.settings.coreConfig.security.ngPaths.login], returnPath);
      const params = returnPath ? { queryParams: { return: returnPath } } : undefined;
      if(redirect) {
        this.router.navigate([redirect]);
      } else {
        this.router.navigate(['/login'], params);
      }
      return this.security;
    }


    login(username: string, pass: string): Observable<any> {

      // AppConfigService.settings.coreConfig.security.ws.loginCredentials.body

      this.addHeaders(AppConfigService.settings.security.ws.loginCredentials.headers);

      return this.http.post(
        this.SECURITY_API + AppConfigService.settings.security.ws.loginCredentials.path,
        { user: username, password: pass },
        this.addSecurityHeaders({}, 'application/json'));
    }


    logout(): Observable<any> {
      sessionStorage.clear();
      return this.http.get(
        this.SECURITY_API + AppConfigService.settings.security.ws.logout.path,
        this.addSecurityHeaders({}, 'application/json'));
    }

    setSecurity(security: Security) {
      this.security = security;
      sessionStorage.setItem('security', JSON.stringify(this.security));
      this.securitySubject.next(this.security);
    }

    /**
     * TODO almacenar datos correctos del servicio de login
     * @param sessionData Datos de la session obtenidos del servicio de login.
     */
    saveSession(sessionData: any): Security {
      // console.log(' # SECURITY - saveSession:', sessionData);
      if (sessionData) {
        this.security = {
          name: sessionData.name,
          rol: sessionData.rol,
          expireTime: new Date().getTime() + this.EXPIRE_TIME_IN_MILLISECOND,
          token: sessionData.token,
          isAuth: (sessionData && sessionData.token !== ''),
        };
        this.setSecurity(this.security);
        // this.router.navigate(['/']);
        return this.security;
      } else {
        alert('ERROR AL GUARDAR LA SESION');
      }
    }

    isSessionExpired() {
      // console.log('EXPIRE TIME:', expireStorage, now, (expireStorage === 0 || now > expireStorage));
      return ( this.security && (this.security.expireTime === 0 || new Date().getTime() > this.security.expireTime ));
    }

    isValidSession() {
      this.security = this.getSecurity();
      // console.log(this.security, 'PRUEBA SECURITY SESSION VALID')
      return this.security && (this.security.token || sessionStorage.getItem('token')) && this.security.isAuth && !this.isSessionExpired();
    }

    addSecurityHeaders(httpOptions?: any, mimeType?: string) {
      if (!httpOptions) {
        httpOptions = {};
      }
      if (!httpOptions.headers) {
        httpOptions.headers = {};
      }
      let httpHeaders = new HttpHeaders(httpOptions.headers);
      httpHeaders = httpHeaders
        .set('Access-Control-Allow-Headers',
          'Accept,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Authorization')
        // 'Cache-Control': 'no-cache, must-revalidate',
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');

      if (this.isValidSession()) {
        httpHeaders = httpHeaders.set('Authorization',  'Bearer '  + this.security.token);
      }
      if (mimeType) {
        httpHeaders = httpHeaders.set('Content-Type', mimeType);
        httpHeaders = httpHeaders.set('Accept', mimeType);
      }
      // console.log(' # SECURITY - HttpOptions: ', httpHeaders);
      httpOptions.headers = httpHeaders;
      return httpOptions;
    }

    private addHeaders(headersObject: any, httpOptions?: any) {
      // instanciamos el objeto options
      httpOptions = this.initHttpOptions(httpOptions);
      // instanciamos el objeto headers
      const httpHeaders = new HttpHeaders(httpOptions.headers);

      // iteramos listado de headers para añadirlos
      for(const key in headersObject) {
        console.log(' # SECURITY - addHeaders: ', key, headersObject[key]);
        httpHeaders.set(key, headersObject[key]);
      }

      // seteamos el objeto dentro del options
      httpOptions.headers = httpHeaders;
      return httpOptions;
    }

    private initHttpOptions(httpOptions?: any): any {
      // si no existe el options se crea
      if (!httpOptions) {
        httpOptions = {};
      }
      // si existe options pero no headers se crean
      if (!httpOptions.headers) {
        httpOptions.headers = {};
      }
      return httpOptions;
    }

}
