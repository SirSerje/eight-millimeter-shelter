import {AddTodo} from "../constants";

const todos = (state = {todos: []}, action)=>{
  console.log('reducer >>>', action.type);
  switch(action.type){
    case AddTodo:
      const todo = {
        id: 17,
        isComplete: false,
        name: action.payload,
      }
      return {
        ...state,
        todos: [
          ...state.todos,
          todo
        ]
      };
    // case RemoveTodo: {
    //   const todos = state.todos.filter((todo)=> todo.id !== action.id);
    //   return {
    //     ...state,
    //     todos
    //   };
    // }
    // case CompleteTodo:
    //   const todos = state.todos.map(
    //     (todo) => {
    //       if(todo.id === action.id){
    //         todo.isComplete == !todo.isComplete;
    //         return todo;
    //       }
    //       return todo;
    //     }
    // )
      return {
        ...state,
        todos
      };
    default:
      return state;
  }
}

export default todos