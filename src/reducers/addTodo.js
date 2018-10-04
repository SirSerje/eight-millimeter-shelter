import { AddTodo } from "../constants";

const todos = (state = {todos: []}, action) => {
  let {type, payload} = action
  if (type === AddTodo) {
    console.log('reducer AddTodo:', action)
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