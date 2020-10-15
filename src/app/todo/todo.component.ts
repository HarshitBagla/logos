import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: any[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().snapshotChanges().subscribe(item => {
      this.todos = [];
      item.forEach(
        element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.todos.push(x);
        }
      )

      //Sorting todos
      this.todos.sort((a,b) => {
        return a.is_completed - b.is_completed;
        })
      });
    }

    onAdd(todoTask): void {
      this.todoService.addTodos(todoTask.value);
      todoTask.value = null;
    }

    changeComplete($key:string, is_completed) {
      this.todoService.checkTodos($key, !is_completed);
    }

}
