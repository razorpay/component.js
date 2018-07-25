const node = document.createElement("div");

function createNode (htmlString) {

  node.innerHTML = htmlString.trim();
  return node.firstChild;
}

function deepFreeze(object) {

  var propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {
    let value = object[name];

    object[name] = value && typeof value === "object" ? 
      deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

class Component {

  constructor (props, container) {
  
    Object.defineProperty(this, "props", {value: deepFreeze(props || {})});

    this.rendered = false;
    this.__renderSubscribers = [];

    if (this.render) {
   
      // let other things in constructor get executed
      window.setTimeout(() => {
     
        let $el = null;

        if (this.render) {

          const html = this.render(props),
                node = (this.parser || createNode)(html);

          $el = node;
        }

        Object.defineProperty(this, "$el", {value: $el});

        this.rendered = true;

        this.__renderSubscribers.forEach((fn) => fn());

        this.__renderSubscribers = [];

        if (!$el) {
        
          return;
        }

        Object.defineProperty(this, "$container", {
          get() {
            return $el.parentElement;
          }
        });

        if (container) {

          this.appendTo(container);
        }
      });
    }
  }

  onRender (fn) {
  
    if (this.rendered) {
    
      fn();
    } else {

      this.__renderSubscribers.push(fn);
	}

	return this;
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

  $(selector)  {
  
    return this.$el && this.$el.querySelector(selector) || null; 
  }

  $$(selector) {
  
    return this.$el && this.$el.querySelectorAll(selector) || null;
  }

  appendTo (container) {

    return this.onRender(() => {

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
    });
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

export default Component;
