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
      console.warn(`Event "${eventName}" is not registered!`);
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
    const eventNames = Array.isArray(eventName) ? [...eventName] : [eventName];

    eventNames.forEach((name) => {
      this.listeners.create(name, id, cb);
    });

    if (once) {
      eventNames.forEach((name) => {
        this.unsubscribe(name, id);
      });
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

module.exports = window.EventBus;
