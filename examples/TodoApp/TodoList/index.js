import Component from "component";
import Todo from "./Todo";

import "./styles.styl";

class TodoList extends Component {

  constructor(...args) {

    super(...args);

    this.status = this.props.status; 
    this.todos = this.props.todos || [];
    this.numVisibleTodos = this.todos.length;
    this.addTodo = this.addTodo.bind(this);
    this.handleTodoStatusChange = this.handleTodoStatusChange.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
  }

  get length () {
  
    return this.todos.length;
  }

  componentWillMount() {
  
    this.$todoList = this.$el;
    this.todos.forEach(this.addTodo);
  }

  setVisibility (status, todo) {


    const shouldShow = status === "All" || 
                       status === "Completed" && todo.completed ||
                       status === "Pending" && !todo.completed;

    if (shouldShow && !todo.isVisible) {

      todo.show();
      this.numVisibleTodos++;
    } else if (!shouldShow && todo.isVisible) {

      todo.hide();
      this.numVisibleTodos--;
    }

    return shouldShow;
  }

  setAllTodosStatus(isChecked) {

    this.todos.forEach((todo) => todo.setStatus(isChecked));
  }

  handleTodoStatusChange(todo, isSynthetic) {

    let {numVisibleTodos} = this;

    this.setVisibility(this.status, todo);

    if (numVisibleTodos !== this.numVisibleTodos) {

      this.props.onVisibleTodosChange();
    }

    if (!isSynthetic) {
    
      this.props.onTodoStatusChange();
    }
  }

  addTodo(item) {

    const todo = new Todo({
      ...item,
      index: this.todos.length,
      onStatusChange: this.handleTodoStatusChange,
      onRemoveTodo: this.handleRemoveTodo
    });

    this.todos.push(todo);

    todo.onRender(() => {

      const isVisible = this.setVisibility(this.status, todo);

      if (isVisible) {

        this.props.onVisibleTodosChange();
      }
    });

    todo.appendTo(this.$el);
  }

  filter(status) {

    this.status = status;

    let {numVisibleTodos} = this;

    if (status !== "All") {

      this.todos.forEach((todo, index) => {

        this.setVisibility(status, todo);
      });
    } else {

      this.numVisibleTodos = this.todos.length;
      this.todos.forEach(todo => todo.show());
    }

    if (numVisibleTodos !== this.numVisibleTodos) {

      this.props.onVisibleTodosChange();
    }
  }

  handleRemoveTodo(todo) {
 
    todo.destroy();

    const index = this.todos.indexOf(todo);

    this.todos.splice(index, 1);

    if (todo.isVisible) {

      this.numVisibleTodos--;
      this.props.onVisibleTodosChange();
    }

    this.props.onRemoveTodo();
  }

  clearCompleted() {
  
    this.todos.filter(todo => todo.completed)
              .forEach(this.handleRemoveTodo);
  }

  render () {
    return (`<ol class="todo-list"></ol>`);
  }
}

export default TodoList;
