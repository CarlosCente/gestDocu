export const environment = {
  production: false,
  name: 'dev',
  API: 'http://localhost:8080/',
  APIS: {
    SECURITY: 'http://localhost:3000/'
  },
  CORE_CONFIG: {
    /** Ruta del fichero de configuración necesario para que arranque la aplicación */
    CONFIG_FILEPATH: 'assets/config.dev.json',
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
