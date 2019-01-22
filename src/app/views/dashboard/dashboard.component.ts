import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Todo, TodoService } from "../../services/todo.service";
import {  LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

  todos: Todo[];
  todo: Todo = {
    task: "",
    createdAt: new Date().getTime(),
    priority: 1,
    userID : ""
  };

  constructor(public authService: AuthService,
    private todoService: TodoService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Item Saved",
      buttons: ["OK"]
    });

    await alert.present();
  }


  async saveTodo() {

    const loading = await this.loadingController.create({
      message: "Saving Todo.."
    });
    await loading.present();

    this.todo.userID = this.authService.userDetails.uid;

    this.todoService.addTodo(this.todo).then(() => {
      loading.dismiss();
      this.presentAlert();
    });

  }

}
