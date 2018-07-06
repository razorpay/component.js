import Component from "component";

import "./styles.styl";

const completedClass = " completed";

class Todo extends Component {

  constructor(props, container) {
  
    super(props, container);

    this.index = props.index;
    this.completed = false;
    this.isVisible = false;
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  show () {

    this.isVisible = true;
    this.$el.style.display = "block"; 
  }

  hide () {

    this.isVisible = false;
    this.$el.style.display = "none";
  }

  setStatus (completed) {

    if (this.checkbox.checked === !!completed) {

      return;
    }

    this.checkbox.checked = !!completed;
    this.handleStatusChange(null, true);
  }

  handleRemove () {

    return this.props.onRemoveTodo(this);
  }

  handleStatusChange (e, isSynthetic) {

    const completed = this.completed = this.checkbox.checked;

    let className = this.$el.className;

    if (completed) {
    
      className = `${className}${completedClass}`;
    } else {
    
      className = className.replace(completedClass, "");
    }

    this.$el.className = className;

    return this.props.onStatusChange &&
           this.props.onStatusChange(this, isSynthetic);
  }

  componentWillMount () {
  
    const {completed} = this;

    this.checkbox = this.$el.querySelector("[type='checkbox']");

    if (completed) {

      this.checkbox.setAttribute("checked", completed);
    }

    this.checkbox.onchange = this.handleStatusChange;

    this.$el.querySelector(".close").onclick = this.handleRemove;
  }

  render () {

    const {text} = this.props;

    return(`
      <li class="todo" style="display: none">
        <div class="todo-check">
          <input type="checkbox" name="check"/>
        </div>
        <div class="todo-text">${text}</div>
        <span class="close">&times;</span>
      </li>
    `);
  }
}

export default Todo;
