import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getTodos() {
    this.todos = this.db.list('tasks');
    return this.todos;
  }

  addTodos(task:string) {
    this.todos.push({
      task: task,
      is_completed: false
   });
  }

  checkTodos($key: string, status: boolean) {
    this.todos.update($key, {is_completed: status});
  }

  removeTodos($key: string) {
    this.todos.remove($key);
  }
}
