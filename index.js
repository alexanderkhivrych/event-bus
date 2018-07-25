class Listeners {
  constructor() {
    this.list = {};
  }

  create(eventName, id, cb) {
    if (!this.list[eventName]) {
      this.list[eventName] = {};
    }
    this.list[eventName][id] = cb;
  }

  destroy(eventName, id) {
    delete this.list[eventName][id];
  }

  fire(eventName, data) {
    if (!this.list[eventName]) {
      throw 'Event not registered';
    }

    Object.keys(this.list[eventName]).forEach(id => {
      this.list[eventName][id].call(window, data);
    });
  }
}

class EventBus {
  constructor() {
    this.listeners = new Listeners();
  }

  on(eventName, id, cb, once) {
    this.listeners.create(eventName, id, cb);

    if (once) {
      this.unsubscribe(eventName, id);
    }
  }

  once(eventName, id, cb) {
    this.subscribe(eventName, id, cb, true);
  }

  off(eventName, id) {
    this.listeners.destroy(eventName, id);
  }

  emit(eventName, data) {
    this.listeners.fire(eventName, data);
  }
}

const eventBus = new EventBus();

if (!window.EventBus) {
  window.EventBus = eventBus;
}

export default window.EventBus;
