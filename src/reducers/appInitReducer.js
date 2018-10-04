import { APP_INIT } from "../constants";

 todos = (state = {todos: []}, action) => {

  let {type, payload} = action

  if (type === APP_INIT) {
    const todo = {
      id: 17,
      isComplete: false,
      name: payload,
    }
    return {
      ...state,
      todos: [
        ...state.todos,
        todo
      ]
    };
  }

  return {
    ...state,
    todos
  };
}

export default todos