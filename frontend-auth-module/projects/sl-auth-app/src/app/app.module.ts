import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlAuthLibModule } from "../../../sl-auth-lib/src/lib/sl-auth-lib.module";
import { LIBRARY_CONFIG, LibraryConfig } from 'projects/sl-auth-lib/src/lib/config/LibraryConfig';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { SolutionComponent } from './components/solution/solution.component';
import { ObservationComponent } from './components/observation/observation.component';
import { HttpClient } from '@angular/common/http';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        SolutionComponent,
        ObservationComponent
    ],
    providers: [
        {
            provide: LIBRARY_CONFIG,
            useFactory: configFactory,
            deps: [HttpClient]
          }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SlAuthLibModule
    ]
})
export class AppModule { }

export function configFactory(http: HttpClient): any {
    return http.get('assets/config/library-config.json');
  }
