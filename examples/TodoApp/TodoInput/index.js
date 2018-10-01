import Component from "component";

import "./styles.styl";

class TodoInput extends Component {

  constructor(props, container) {
    super(props, container);

    this.isCheckAllVisible = false;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleCheckAllChange = this.handleCheckAllChange.bind(this);
  }

  ready () {
    
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
      <div className="todo-input-container">
        <form className="todo-input" ref="form">
          <div className="checkbox" ref="checkbox">
            <input type="checkbox" 
                   name="checkAll"/>
          </div>
          <div className="input">
            <input type="text"
                   name="todoText"
                   placeholder="what needs to be done?"
                   ref="input"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default TodoInput;
