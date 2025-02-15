class State {
  constructor(initialState = {}) {
    if (typeof initialState !== "object" || initialState === null) {
      throw new Error("InitialState must be an object.");
    }
    this.state = initialState;
    this.subscribers = new Set();
    this.history = [initialState];
    this.historyIndex = 0;
    this.maxHistoryLength = 10;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    if (
      typeof newState !== "function" &&
      (typeof newState !== "object" || newState === null)
    ) {
      throw new Error("setState must receive an object or a function.");
    }

    try {
      const previousState = { ...this.state };

      this.state =
        typeof newState === "function"
          ? newState(this.state)
          : { ...this.state, ...newState };

      if (typeof this.state !== "object" || this.state === null) {
        throw new Error(
          "Invalid state update: State must always be an object."
        );
      }

      this.saveToHistory();
      this.notify();

      return {
        success: true,
        previousState,
        currentState: this.state,
        changes: this.getStateChanges(previousState, this.state),
      };
    } catch (error) {
      if (error.message.includes("Invalid state update")) {
        throw error;
      }
      throw new Error(`Error updating state: ${error.message}`);
    }
  }

  subscribe(callback) {
    if (typeof callback !== "function") {
      throw new Error("Subscribe method must receive a function.");
    }

    this.subscribers.add(callback);
    return () => {
      if (!this.subscribers.has(callback)) {
        console.warn("This callback has already been removed or not found.");
      }
      this.subscribers.delete(callback);
    };
  }

  notify() {
    try {
      this.subscribers.forEach((callback) => {
        try {
          callback(this.state);
        } catch (error) {
          console.error(`Error in subscriber callback: ${error.message}`);
        }
      });
    } catch (error) {
      throw new Error(`Error notifying subscribers: ${error.message}`);
    }
  }

  select(path) {
    if (typeof path !== "string") {
      throw new Error("Path must be a string.");
    }

    return path.split(".").reduce((obj, key) => {
      if (obj === null || obj === undefined) {
        return undefined;
      }
      return obj[key];
    }, this.state);
  }

  patch(path, value) {
    if (typeof path !== "string") {
      throw new Error("Path must be a string.");
    }

    const keys = path.split(".");
    const newState = { ...this.state };
    let current = newState;

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    this.setState(newState);
  }

  saveToHistory() {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push({ ...this.state });

    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.state = { ...this.history[this.historyIndex] };
      this.notify();
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.state = { ...this.history[this.historyIndex] };
      this.notify();
    }
  }

  reset() {
    this.state = { ...this.history[0] };
    this.notify();
  }

  watchValue(path, callback) {
    if (typeof path !== "string") {
      throw new Error("Path must be a string.");
    }

    let previousValue = this.select(path);

    return this.subscribe((state) => {
      const currentValue = this.select(path);
      if (currentValue !== previousValue) {
        callback(currentValue, previousValue);
        previousValue = currentValue;
      }
    });
  }

  getStateChanges(prevState, nextState, path = "") {
    const changes = [];

    for (const key in nextState) {
      const currentPath = path ? `${path}.${key}` : key;

      if (!(key in prevState)) {
        changes.push({
          type: "added",
          path: currentPath,
          value: nextState[key],
        });
      } else if (
        typeof nextState[key] === "object" &&
        nextState[key] !== null
      ) {
        changes.push(
          ...this.getStateChanges(prevState[key], nextState[key], currentPath)
        );
      } else if (prevState[key] !== nextState[key]) {
        changes.push({
          type: "updated",
          path: currentPath,
          oldValue: prevState[key],
          newValue: nextState[key],
        });
      }
    }

    for (const key in prevState) {
      const currentPath = path ? `${path}.${key}` : key;
      if (!(key in nextState)) {
        changes.push({
          type: "removed",
          path: currentPath,
          value: prevState[key],
        });
      }
    }

    return changes;
  }
}

export default State;
