import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  addNewTask() {

    if(this.todoTile !== ""){

      this.todos.push({
        title: this.todoTile,
        completed: false,
        id: uid(),
        createdAt: Date.now()
      })    
  
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
    encontrado.completed = !encontrado.completed;
  }

  deleteTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id != id)
  }
}
