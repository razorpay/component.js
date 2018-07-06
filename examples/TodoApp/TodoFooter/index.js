import Component from "../../../src";

import "./styles.styl";

class TodoFooter extends Component {

  constructor (props, container) {
  
    super(props, container);

    this.activeClass = " active";
    this.count = this.props.count || 0;
    this.statuses = this.props.statuses || [];
    this.selectedStatus = this.props.selectedStatus || this.statuses[0];
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  componentWillMount () {
  
    this.$statuses = this.$el.querySelectorAll(".status");
    this.$statuses.forEach(($status, index) => {
    
      var statusText = this.statuses[index];

      $status.onclick = this.handleStatusClick.bind(this, statusText, index);
    });

    this.$el.querySelector(".clear-completed").onclick = this.handleClearCompleted;
  }

  updateNumTodos (count) {
    
    this.$counter = this.$counter || this.$el.querySelector(".counter");
    this.$counter.innerText = count;
  }

  updateNumVisibleTodos (count) {

    this.$visibleTodosCounter = this.$visibleTodosCounter ||
                                this.$el.querySelector(".visible-todos-counter");

    this.$visibleTodosCounter.innerText = count;
  }

  handleClearCompleted () {
  
    this.props.onClearCompleted();
  }

  handleStatusClick (selectedStatus, selectedIndex) {
  
    if (this.selectedStatus === selectedStatus) {
    
      return;
    }

    this.$statuses.forEach(($status, index) => {
    
      let className = $status.className;

      if (selectedIndex === index) {
      
        className += this.activeClass;
      } else {
      
        className = className.replace(this.activeClass, "");
      }

      $status.className = className;
    });

    this.selectedStatus = selectedStatus;

    return this.props.onStatusChange &&
           this.props.onStatusChange(selectedStatus);
  }

  render () {

    const {statuses, selectedStatus, count} = this;

    return (`
      <div class="todo-footer">
        <div>
          Showing <span class="visible-todos-counter">${count}</span>
          of <span class="counter">${count}</span>
        </div>
        <div class="statuses">
          ${statuses.map((status) => (`
            <div class="status${status === selectedStatus ? ' active': ""}">
              ${status}
            </div>
          `)).join("")}
        </div>
        <div class="clear-completed">Clear Completed</div>
      </div>
    `);
  }
}

export default TodoFooter;
