export const environment = {
  production: true,
  name: 'prod',
  API: '',
  APIS: {
    SECURITY: ''
  },
  CORE_CONFIG: {
    /** Ruta del fichero de configuración necesario para que arranque la aplicación */
    CONFIG_FILEPATH: 'assets/config.prod.json',
    /** Añade a la url del proyecto el siguiente path */
    BASE_URL: '/',
    SECURITY: {
      EXPIRE_TIME_IN_MINUTES: 15,
      WS_LOGIN: {
        LDAP: 'accesoLdap/',
      },
      WS_LOGOUT: 'logout/',
    },
  },
  SAVEPREFIX: '',
};
