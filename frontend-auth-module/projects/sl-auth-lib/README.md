# SlAuthLib

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.



--------------------------------------------------------------------------------------


**Fallow all the steps below to get fully functional library.

## After installation, import library modules in AppModule.


1. Import "LIBRARY_CONFIG, SlAuthLibModule, HttpClientModule and HttpClient" from authentication_frontend_library and
@angular/common in AppModule.


import { LIBRARY_CONFIG, SlAuthLibModule } from 'authentication_frontend_library';
import { HttpClient, HttpClientModule } from '@angular/common/http';


and in NgModule.


imports: [
HttpClientModule,
SlAuthLibModule
]



------------------------------------------------------------------------------------



2. Add the library element tag "lib-sl-auth-lib" in "app.component.html".





------------------------------------------------------------------------------------



## creating and import of "library-config.json" file in AppModule.


1. Create a "library-config.json" file in you assets folder with below json data

{
"projectName": "your projectName",
"landingPageTitle": "Create account to connect, solve & share.",
"baseUrl": "https://yourBaseUrl.com",
"redirectRouteOnLoginSuccess": "home",
"loginApiPath": "/user/v1/account/login",
"signUpApiPath": "/user/v1/account/signup",
"resetPasswordApiPath": "/v2/account/reser-password",
"otpValidationApiPath": "/v2/account/otp-validation",
"supportEmail":"mentoredtest1@yopmail.com",
"privacyPolicyUrl":"https://www.privacyploicy.com",
"termOfUseUrl":"https://www.termsofuse.com"
}


   
   

-----------------------------------------------------------------------------------


2. Navigate to "app.module.ts" and past below code in providers array.

providers: [
{
provide: LIBRARY_CONFIG,
useFactory: configFactory,
deps: [HttpClient]
}
]


------------------------------------------------------------------------------------


3. Then past the below code after the export class of AppModule.


export class AppModule { } ---> "After the export class of AppModule"



export function configFactory(http: HttpClient): any {
return http.get('assets/config/library-config.json');
}


---------------------------------------------------------------------------------------


## To achive routing of "login" page.

1. In "app-routing.module.ts" create a empty path and in loadChildren import the module as below.



const routes: Routes = [
{ path: '', loadChildren: () => import('authentication_frontend_library').then(m => m.SlRoutingRoutingModule) }
]


--------------------------------------------------------------------------------------



## To work all the css as required add below code in global css file such as "styles.css" or "global.scss"


@import '~@angular/material/prebuilt-themes/indigo-pink.css';

.mdc-text-field--filled {
background-color: white !important;
}

.mat-mdc-form-field-focus-overlay{
opacity: 0 !important;
}


--------------------------------------------------------------------------------------


## Add below angular material icons link in "index.html" file

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


-------------------------------------------------------------------------------------


## Now Enjoy the authentication_frontend_library functionality.

By adding the path in browser "https://localhost:4200/login", you will be navigated to login page.