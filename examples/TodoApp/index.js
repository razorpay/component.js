import Component from 'component';
const { PublisherComponent } = Component;
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

import './index.styl';

const hasTodosClassName = ' has-todos';

class TodoApp extends PublisherComponent {

  constructor(props, container) {
    super(props, container);

    this.registerEvents('todosChange', 'visibleTodosChange');
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.statuses = ['All', 'Completed', 'Pending'];
    this.selectedStatus = this.statuses[0];
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleVisibleTodosChange = this.handleVisibleTodosChange.bind(this);
    this.handleTodoStatusChange = this.handleTodoStatusChange.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  toggleHasTodosClass() {

    const hasTodos = this.todoList.todos.length > 0;
    let className = this.$el.className;

    if (hasTodos) {

      className = `${className}${hasTodosClassName}`;
    } else {

      className = className.replace(hasTodosClassName, '');
    }

    this.$el.className = className;
  }

  handleStatusChange(status) {

    this.todoList.filter(status);
  }

  handleVisibleTodosChange() {

    this.events.visibleTodosChange.trigger(this.todoList.numVisibleTodos);
  }

  handleTodoStatusChange() {

    this.todoInput.setCheckAll(false);
  }

  handleRemoveTodo() {

    const todosLength = this.todoList.length;

    this.events.todosChange.trigger(todosLength);

    if (!todosLength) {

      this.todoInput.setCheckAll(false);
      this.toggleHasTodosClass();
    }
  }

  handleNewTodo(text) {

    const prevTodosLength = this.todoList.length;

    this.todoList.addTodo({ text });
    this.events.todosChange.trigger(this.todoList.length);

    if (!prevTodosLength) {

      this.toggleHasTodosClass();
    }
  }

  handleCheckAllChange(isChecked) {

    this.todoList.setAllTodosStatus(isChecked);
  }

  handleClearCompleted() {

    this.todoList.clearCompleted();
  }

  render() {
    return (
      <div className="todo-app" ref="todoApp">
        <TodoInput
          ref="todoInput"
          onSubmit={this.handleNewTodo}
          onCheckAllChange={this.handleCheckAllChange}
        />
        <TodoList
          ref="todoList"
          onVisibleTodosChange={this.handleVisibleTodosChange}
          onTodoStatusChange={this.handleTodoStatusChange}
          onRemoveTodo={this.handleRemoveTodo}
          status={this.selectedStatus}/>
        <TodoFooter
          ref="todoFooter"
          statuses={this.statuses}
          selectedStatus={this.selectedStatus}
          onStatusChange={this.handleStatusChange}
          onClearCompleted={this.handleClearCompleted}/>
      </div>
    );
  }
}

const todoApp = Component.render(TodoApp, {}, document.body);


