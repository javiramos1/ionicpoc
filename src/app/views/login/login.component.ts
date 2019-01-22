import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

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

  constructor(private authService: AuthService, private router: Router) {
  }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(["dashboard"]);
      })
      .catch((err) => console.log(err));
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
