import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/types/todo';
import { uid } from 'src/assets/js/uid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  todoTile: string = "";

  todos: Todo[] = [];

  errorInName: Boolean = false;

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
    ) { }

  // getAll(): Promise<Todo[]> {
  //   return fetch('https://jsonplaceholder.typicode.com/todos')
  //           .then(response =>  response.json())
  // }

  ngOnInit(): void {
    // this.getAll().then(res => this.todos = res);
    
    this.todoService.getAll()
      .then(result => this.todos = result)
      .catch(err => {
        this.toastr.error(
          'No se han podido cargar las tareas',
          'Error',
           {
             progressBar: true,
             closeButton: true
           })
      })
  }

  async addNewTask() {

    if(this.todoTile !== ""){

        this.todoService.saveTodo({
          title: this.todoTile,
          completed: false,
          createdAt: Date.now()
        })
        .then(newTodo => {
          this.todos.push(newTodo as Todo)    
          this.todoTile = "";

          this.errorInName = false;
          
          this.toastr.success(
            'La tarea se ha añadido a la lista correctamente',
            "Añadida",
             {
               progressBar: true,
               closeButton: true
             })
        })
        .catch(error => {  

          if( error.response.status === 500 ){

            if(error?.response?.data?.errors?.title){

              this.errorInName = true;

              this.toastr.error(
                error?.response?.data?.errors?.title.message,
                "Error 500",
                 {
                   progressBar: true,
                   closeButton: true
                 })
            } 
          }
        })
    }
  }

  completeTodo(_id: string | undefined){

    const encontrado = this.todos.find(todo => todo._id === _id as string) as Todo;

    this.todoService.patchTodo({
      _id: _id,
      completed: !encontrado.completed
    }).then(res => {
        encontrado.completed = !encontrado.completed;
      })
  }

  deleteTodo(_id: string | undefined) {
    
    this.todoService.deleteTodo(_id as string)
      .then(res => {
        this.todos = this.todos.filter(todo => todo._id != _id)
      })
  }
}
