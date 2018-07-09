import Component from "component";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

import "./index.styl";

const hasTodosClassName = " has-todos";

class TodoApp extends Component {

  constructor(props, container) {
  
    super(props, container);
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.statuses = ["All", "Completed", "Pending"];
    this.selectedStatus = this.statuses[0];
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleVisibleTodosChange = this.handleVisibleTodosChange.bind(this);
    this.handleTodoStatusChange = this.handleTodoStatusChange.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
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

    this.todoFooter.updateNumVisibleTodos(this.todoList.numVisibleTodos);
  }

  handleTodoStatusChange () {
  
    this.todoInput.setCheckAll(false);
  }

  handleRemoveTodo () {

    const todosLength = this.todoList.length;

    this.todoFooter.updateNumTodos(todosLength);

    if (!todosLength) {
    
      this.todoInput.setCheckAll(false);
      this.toggleHasTodosClass();
    }
  }

  handleNewTodo (text) {
 
    const prevTodosLength = this.todoList.length;

    this.todoList.addTodo({text});
    this.todoFooter.updateNumTodos(this.todoList.length);

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

  componentWillMount () {
  
    this.todoInput = new TodoInput(
      {
        onSubmit: this.handleNewTodo,
        onCheckAllChange: this.handleCheckAllChange
      },
      this.$el.querySelector(".todo-input-container")
    );
    this.todoList = new TodoList(
      {
        onVisibleTodosChange: this.handleVisibleTodosChange,
        onTodoStatusChange: this.handleTodoStatusChange,
        onRemoveTodo: this.handleRemoveTodo,
        status: this.selectedStatus
      },
      this.$el.querySelector(".todo-list-container")
    );
    this.todoFooter = new TodoFooter(
      {
        statuses: this.statuses,
        selectedStatus: this.selectedStatus,
        onStatusChange: this.handleStatusChange,
        onClearCompleted: this.handleClearCompleted
      },
      this.$el.querySelector(".todo-footer-container")
    );
  }

  render () {
  
    return (`
      <div class="todo-app">
        <div class="todo-input-container"></div>
        <div class="todo-list-container"></div>
        <div class="todo-footer-container"></div>
      </div>
    `);
  }
}

const todoApp = new TodoApp({}, document.body);
