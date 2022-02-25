import { AppConfig } from './../models/appConfig';
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

    static settings: AppConfig;

    constructor(
        private http: HttpClient,
        @Inject('env') private ENV,
    ) {}

    loadConfig() {
      const jsonFile = this.ENV.CORE_CONFIG.CONFIG_FILEPATH;
      AppConfigService.settings = {
          env: {
              name: ''
          },
          logging: {
              console: true,
              appInsights: true
          },
          security: {
                  sessionExpireTimeInMinutes: 15,
                  ws:{
                      loginCredentials: {
                          path: '',
                          headers: {
                              Authorization: '',
                              ContentType: '',
                              grant_type: ''
                          },
                          body: ''
                      },
                      logout: {
                          path: '',
                          headers: {
                          },
                          body: ''
                      }
                  }
                }

      };
      return new Promise<void>((resolve, reject) => {
          this.http.get(jsonFile).toPromise().then((response : AppConfig) => {
              //console.log(` + CORE - ConfigService: File load succesfully '${jsonFile}'`, response);
              AppConfigService.settings = response as AppConfig;
              //console.log(` + CORE - ConfigService: File load succesfully '${jsonFile}'`, response);
             resolve();
          }).catch((response: any) => {
             console.error(` + CORE - ConfigService: Could not load file '${jsonFile}': ${JSON.stringify(response)}`, response);
             reject(` + CORE - ConfigService: Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
          });
      });
  }


}
