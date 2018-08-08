import Component from "./Component";
import {isFunction} from "./utils";

const getEvent = () => {

  let subscribers = [];

  return {
    subscribe: (subscriber) => {
    
      return isFunction(subscriber) && subscribers.push(subscriber);
    },
    unSubscribe: (subscriber) => {
    
      const subscriberIndex = subscribers.indexOf(subscriber);

      return subscriberIndex >= 0 && subscribers.splice(subscriberIndex, 1);
    },
    publish: (...args) => {
    
      return subscribers.forEach(subscriber => subscriber(...args));
    },
    unSubscribeAll: () => subscribers = []
  };
}; 

class PublisherComponent extends Component {

  constructor (...props) {
  
    super(...props);

    this.events = {};
    this.context = {"events": this.events};

    Object.defineProperty(this, "destroyHandlers", {value: []});
  }

  registerEvent (eventName) {

    if (this.events[eventName]) {
    
      return;
    }

    const {subscribe, unSubscribe, publish, unSubscribeAll} = getEvent();

    this.events[eventName] = {
      subscribe,
      unSubscribe,
      trigger: (...args) => {
      
        return publish(...args);
      }
    };

    this.destroyHandlers.push(unSubscribeAll);
  }

  registerEvents (...eventNames) {
  
    eventNames.forEach(name => this.registerEvent(name));
    return this;
  }

  destroy () {
  
    super.destroy();
    this.destroyHandlers.forEach(item => item());
  }
}

export default PublisherComponent;
