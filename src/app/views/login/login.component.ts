import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Platform } from "@ionic/angular";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

import { GooglePlus } from "@ionic-native/google-plus/ngx";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: ""
  };

  signedup: Boolean = false;

  constructor(private authService: AuthService,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private router: Router) {
  }


  signInWithGoogle() {

      if (this.platform.is("cordova")) {
        console.log("native");
        this.nativeGoogleLogin();
      } else {
        this.webGoogleLogin();
      }
  }

  webGoogleLogin() {
    this.authService.signInWithGoogle()
    .then((res) => {
      this.router.navigate(["dashboard"]);
    })
    .catch((err) => console.log(err));

  }

  async nativeGoogleLogin() {
    try {

      const gplusUser = await this.gplus.login({
        "webClientId": "371791543705-99hu6ru60hnga6eu8hq9q437qqk7mteo.apps.googleusercontent.com",
        "offline": true,
        "scopes": "profile email"
      }).catch( (err) => console.log(err));
      console.log("gplusUser", gplusUser);
      const res = await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));
      if (res) {
        this.router.navigate(["dashboard"]);
      }

    } catch (err) {
      console.log(err);
    }
  }


  signInWithEmail() {

    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        console.log("signInWithEmail", res);
        this.signedup = res;
          this.router.navigate(["dashboard"]);
      })
      .catch((err) => console.log("error: " + err));
  }



  ngOnInit() {
  }

}
