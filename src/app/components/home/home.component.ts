import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/types/todo';
import { uid } from 'src/assets/js/uid';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  todoTile: string = "";

  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  // getAll(): Promise<Todo[]> {
  //   return fetch('https://jsonplaceholder.typicode.com/todos')
  //           .then(response =>  response.json())
  // }

  ngOnInit(): void {
    // this.getAll().then(res => this.todos = res);
    
    this.todoService.getAll()
      .then(result => this.todos = result)
  }

  async addNewTask() {

    if(this.todoTile !== ""){

      let newTodo = await this.todoService.saveTodo({
        title: this.todoTile,
        completed: false,
        id: uid(),
        createdAt: Date.now()
      })

      this.todos.push(newTodo)    
  
      this.todoTile = "";
    }
  }

  completeTodo(id: string){
    // this.todos = this.todos.map(todo => {
    //   if (todo.id === id){
    //     todo.completed = true;
    //   }
    //   return todo;
    // })

    const encontrado = this.todos.find(todo => todo.id === id) as Todo;

    this.todoService.patchTodo({
      id: id,
      completed: !encontrado.completed
    }).then(res => {
        encontrado.completed = !encontrado.completed;
      })
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id != id)
  }
}
