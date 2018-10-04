import * as actionTypes from "../constants";

export const addTodo = (payload)=> {
  return {
    type: actionTypes.AddTodo,
    payload
  }
}

// export const removeTodo = (id)=> {
//   return {
//     type: removeTodo,
//     id
//   }
// }
//
// export const completeTodo = (id)=> {
//   return {
//     type: completeTodo,
//     id
//   }
// }
