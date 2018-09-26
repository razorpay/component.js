import Component from "component";

import "./styles.styl";

class TodoInput extends Component {

  constructor(...args) {
  
    super(...args);

    this.isCheckAllVisible = false;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
  }

  ready () {
  
    this.form = this.$el;
    this.input = this.form.todoText;
    this.checkbox = this.form.checkAll;
    this.form.onsubmit = this.onSubmit;

    this.checkbox.onchange = this.handleCheckAllChange;
  }

  onSubmit (e) {
    e.preventDefault();

    var inputText = this.input.value.trim();

    if (!inputText) {
    
      return;
    }

    if(this.props.onSubmit) {

      this.props.onSubmit(inputText);
    }

    this.input.value = "";
  }

  setCheckAll (isChecked) {
  
    this.checkbox.checked = !!isChecked;
  }

  handleCheckAllChange () {
  
    var isChecked = this.checkbox.checked;

    return this.props.onCheckAllChange &&
           this.props.onCheckAllChange(isChecked);
  }

  render () {
   
    return (
      <form className="todo-input">
        <div className="checkbox">
          <input type="checkbox" 
                 name="checkAll"/>
        </div>
        <div className="input">
          <input type="text"
                 name="todoText"
                 placeholder="what needs to be done?"/>
        </div>
      </form>
    );
  }
}

export default TodoInput;
