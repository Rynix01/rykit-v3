import State from "./State.js";

const createStore = (initialState = {}) => {
  try {
    const state = new State(initialState);

    return {
      getState: state.getState.bind(state),
      setState: state.setState.bind(state),
      subscribe: state.subscribe.bind(state),
      select: state.select.bind(state),
      patch: state.patch.bind(state),
      undo: state.undo.bind(state),
      redo: state.redo.bind(state),
      reset: state.reset.bind(state),
      watchValue: state.watchValue.bind(state),
    };
  } catch (error) {
    throw new Error(`Error creating store: ${error.message}`);
  }
};

export default createStore;
