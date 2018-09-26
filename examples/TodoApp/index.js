import {mount, PublisherComponent} from "component";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

import "./index.styl";

const hasTodosClassName = " has-todos";

class TodoApp extends PublisherComponent {

  constructor(props, container) {
  
    super(props, container);

    this.registerEvents("todosChange", "visibleTodosChange");

    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.statuses = ["All", "Completed", "Pending"];
    this.selectedStatus = this.statuses[0];
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleVisibleTodosChange = this.handleVisibleTodosChange.bind(this);
    this.handleTodoStatusChange = this.handleTodoStatusChange.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);

    this.appendChild(
      this.todoInput = new TodoInput(
        {
          onSubmit: this.handleNewTodo,
          onCheckAllChange: this.handleCheckAllChange
        }
      ),
      ".todo-input-container"
    ).appendChild(
      this.todoList = new TodoList(
        {
          onVisibleTodosChange: this.handleVisibleTodosChange,
          onTodoStatusChange: this.handleTodoStatusChange,
          onRemoveTodo: this.handleRemoveTodo,
          status: this.selectedStatus
        }
      ),
      ".todo-list-container"
    ).appendChild(
      this.todoFooter = new TodoFooter(
        {
          statuses: this.statuses,
          selectedStatus: this.selectedStatus,
          onStatusChange: this.handleStatusChange,
          onClearCompleted: this.handleClearCompleted
        }
      ),
      ".todo-footer-container"
    );
  }

  toggleHasTodosClass () {
  
    const hasTodos = this.todoList.todos.length > 0;
    let className = this.$el.className;

    if (hasTodos) {
    
      className = `${className}${hasTodosClassName}`;
    } else {
    
      className = className.replace(hasTodosClassName, "");
    }

    this.$el.className = className;
  }

  handleStatusChange (status) {

    this.todoList.filter(status);
  }

  handleVisibleTodosChange () {

    this.events.visibleTodosChange.trigger(this.todoList.numVisibleTodos);
  }

  handleTodoStatusChange () {
  
    this.todoInput.setCheckAll(false);
  }

  handleRemoveTodo () {

    const todosLength = this.todoList.length;

    this.events.todosChange.trigger(todosLength);

    if (!todosLength) {
    
      this.todoInput.setCheckAll(false);
      this.toggleHasTodosClass();
    }
  }

  handleNewTodo (text) {
 
    const prevTodosLength = this.todoList.length;

    this.todoList.addTodo({text});
    this.events.todosChange.trigger(this.todoList.length);

    if (!prevTodosLength) {
    
      this.toggleHasTodosClass();
    }
  }

  handleCheckAllChange (isChecked) {

    this.todoList.setAllTodosStatus(isChecked);
  }

  handleClearCompleted () {
  
    this.todoList.clearCompleted();
  }

  render () {
  
    return (
      <TodoApp>
        <div class="todo-input-container">
          <TodoInput></TodoInput>
        </div>
        <div class="todo-list-container">
          <TodoList></TodoList>
        </div>
        <div class="todo-footer-container">
          <TodoFooter></TodoFooter>
        </div>
      </TodoApp>
    );
  }
}

const todoApp = mount(new TodoApp({}), document.body);
