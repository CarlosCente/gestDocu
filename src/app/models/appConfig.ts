export interface AppConfig {
  env: {
    name: string;
  };
  logging: {
    console: boolean;
    appInsights: boolean;
  };
  security: {
    sessionExpireTimeInMinutes: 15,
    ws:{
        loginCredentials: {
            path: string,
            headers: {
                Authorization: string,
                ContentType: string,
                grant_type: string
            },
            body: string
        },
        logout: WsConfig
    }
  }
}

interface WsConfig {
  path: string;
  headers: {};
  body: string;
}
