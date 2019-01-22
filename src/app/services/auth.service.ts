import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";

export class EmailPasswordCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  public userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
      this.user = _firebaseAuth.authState;

      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          } else {
            this.userDetails = null;
          }
        }
      );
  }


  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }


  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
    .catch((err => {
      console.log(err);
      if (err.code === "auth/user-not-found") {
        return this.emailSignUp(email, password);
      }
    }));
  }


  emailSignUp(email, password): any {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("success");
        return this._firebaseAuth.auth.currentUser.sendEmailVerification().then(() => true);

      })
      .catch(error => console.error(error));
  }

  isLoggedIn() {
  if (this.userDetails == null || !this.userDetails.emailVerified) {
      return false;
    } else {
      return true;
    }
  }


  logout() {
    this._firebaseAuth.auth.signOut()
    .then((res) => this.router.navigate(["/"]));
  }
}
