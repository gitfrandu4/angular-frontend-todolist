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
        createdAt: Date.now()
      })

      this.todos.push(newTodo as Todo)    
  
      this.todoTile = "";
    }
  }

  completeTodo(_id: string | undefined){
    // this.todos = this.todos.map(todo => {
    //   if (todo._id === _id){
    //     todo.completed = true;
    //   }
    //   return todo;
    // })

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
