const node = document.createElement("div");

function createNode (htmlString) {

  node.innerHTML = htmlString.trim();
  return node.firstChild;
}

class Component {

  constructor (container, props) {
  
    let $el = null;

    Object.defineProperty(this, "props", {value: props});

    if (this.render) {

      const html = this.render(props),
            node = createNode(html);

      $el = node;
    }

    Object.defineProperty(this, "$el", {value: $el});

    if (!$el) {
    
      return;
    }

    Object.defineProperty(this, "$container", {
      get() {
        return $el.parentElement;
      }
    });

    if (container) {
   
      // let other things in constructor get executed
      window.setTimeout(() => this.appendTo(container));
    }
  }

  addEventListener(...args) {
  
    if(this.$el) {
    
      this.$el.addEventListener(...args);
    }

    return this;
  }

  removeEventListener(...args) {
  
    if (this.$el) {
    
      this.$el.removeEventListener(...args);
    }

    return this;
  }

  appendTo (container) {

    const {$el} = this;

    if (!container || container === $el.parentElement) {
    
      return;
    }

    if (this.componentWillMount) {
    
      this.componentWillMount();
    }

    container.appendChild($el);

    if (this.componentDidMount) {
    
      this.componentDidMount();
    }
  }

  remove() {

    return this.$container && 
           this.$container.removeChild(this.$el);
  }

  destroy () {
  
    if (this.componentWillUnMount) {
    
      this.componentWillUnMount();
    }

    this.remove();
  }
}

class Button extends Component {

  constructor (container, props) {

    super(container, props);

    this.numClicks = 0;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
 
    if (this.numClicks) {
    
      return this.destroy();
    }

    this.$el.innerText  = "One more click, i'll be out!";
    this.numClicks += 1;
  }

  componentWillMount () {

    console.log("Button will mount");
  }

  componentDidMount () {
 
    this.addEventListener("click", this.handleClick);
  }

  componentWillUnMount () {
 
    this.removeEventListener("click", this.handleClick);
  }

  render () {

    const {color, children} = this.props;
  
    return (`
     <button style="color: ${color}">
       ${children}   
     </button>
    `);
  }
}

var x = new Button(document.body, {color: "red", children: "Dont click me!"});

