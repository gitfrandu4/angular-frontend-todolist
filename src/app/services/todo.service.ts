import { Injectable } from '@angular/core';
import axios from 'axios';
import { Todo } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // private endpoint = 'https://jsonplaceholder.typicode.com/todos';
  private endpoint = 'http://localhost:5001/api/todos';

  constructor() { }

  public getAll() {

    // return axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    //   .then(result => result.data)

    return fetch(this.endpoint)
      .then(response => response.json())
  }

  public saveTodo(newTodo: Todo): Promise<Todo>{
    return axios.post<Todo>(this.endpoint, newTodo)
      .then(result => result.data)
  }

  public deleteTodo(_id: string){

    return axios.delete<Todo>(`${this.endpoint}/${_id as string}`)
      .then(result => result.data)
  }

  public patchTodo(modifiedTodo: Partial<Todo>){
    return axios.patch<Todo>(`${this.endpoint}/${modifiedTodo._id}`, modifiedTodo)
      .then(result => result.data)
  }
}
