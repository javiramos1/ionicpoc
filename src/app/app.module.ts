import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./views/login/login.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { AppRoutingModule } from "./app-routing.module";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/auth-guard.service";
import { FormsModule } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     FormsModule,
     AngularFireModule.initializeApp(environment.firebase, "angular-auth-firebase"),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production })],
  providers: [
    AuthService, AuthGuard, AngularFirestore,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
