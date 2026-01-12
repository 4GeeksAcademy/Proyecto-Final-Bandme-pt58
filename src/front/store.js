export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    currentUser: null,
    token: null,
    isAuthenticated: false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
       case "login_success":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
      return {
        ...store,
        token: action.payload.token,
        currentUser: action.payload.user,
        isAuthenticated: true,
      };

    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      return {
        ...store,
        token: null,
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      throw Error('Unknown action.');
  }    
}
