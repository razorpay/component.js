import "./polyfills";
import {
  createNode,
  deepFreeze,
  isString,
  isArray,
  isElement,
  isDefined,
  isObject
} from "./utils";

class Component {

  constructor (props, container) {
 
    const context={};

    Object.defineProperty(this, "context", {

      get() { return context },
      set: (obj) => {

        if (!isObject(obj)) {

          return;
        }

        Object.keys(obj).forEach((key) => {

          const value = context[key];

          return value
                   ? Object.assign(context[key], value)
                   : context[key] = obj[key];
        });

        Object.assign(this, context);
      } 
    });
 
    Object.defineProperty(this, "props", {value: deepFreeze(props || {})});

    this.__renderSubscribers = [];

    if (this.render) {
   
      // let other things in constructor get executed
      window.setTimeout(() => {
     
        let $el = null;

        if (this.render) {

          const html = this.render(props),
                node = html instanceof Node
                         ? html
                         : (this.parser || createNode)(html);

          $el = node;
        }

        Object.defineProperty(this, "$el", {value: $el});
        Object.defineProperty(this, "rendered", {value: true});
        this.__renderSubscribers.forEach((fn) => fn());
        delete this.__renderSubscribers;
        return this.ready && this.ready();
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

  appendChild(child, $el) {

    if (isArray(child) && child.length > 0) {

      child.forEach((child) => this.appendChild(child, $el));
      return this;
    }

    if (!Component.isComponent(child)) {
    
      return this;
    }

    return this.onRender(() => {

      const {context, $el:$parentEl} = this;

      if (!isDefined($el)) {

        $el = $parentEl;
      } else {

        $el = isElement($el)
                ? $el
                : isString($el)
                    ? this.$($el)
                    : null;

		if (!$el) {

		  return;
		}
      }

      if (context) {

        child.context = context;
      }

      return Component.mount(child, $el);
    });
  }

  destroy () {
  
    if (this.componentWillUnMount) {
    
      this.componentWillUnMount();
    }

    const $container = this.$el && this.$el.parentElement;

    return $container && 
           $container.removeChild(this.$el);
  }

  $(selector) {
  
    return this.$el && this.$el.querySelector(selector) || null; 
  }

  $$(selector) {
  
    return this.$el && this.$el.querySelectorAll(selector) || null;
  }

  static isComponent (input) {

    return input instanceof Component;
  }

  static mount (component, target) {

    if (!isElement(target) ||
        !Component.isComponent(component) ||
        component.mounted) {
    
      return;
    }

    return component.onRender(() => {

      target.appendChild(component.$el);
      Object.defineProperty(component, "mounted", {value: true});
      return component.componentDidMount && component.componentDidMount();
    });
  }
}

export default Component;
