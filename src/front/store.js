// Estado inicial del store
export const initialStore = () => {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  return {
    message: null,
    todos: [
      { id: 1, title: "Make the bed", background: null },
      { id: 2, title: "Do my homework", background: null },
    ],
    currentUser: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    posts: [],
  };
};

// Reducer para manejar acciones
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task": {
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    }

    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...store,
        currentUser: action.payload.user,
        token: action.payload.token,
      };

    case "logout":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...store,
        currentUser: null,
        token: null,
      };

    case "set_posts":
      return {
        ...store,
        posts: action.payload,
      };

    case "add_post":
      return {
        ...store,
        posts: [action.payload, ...store.posts],
      };

    default:
      throw new Error("Unknown action.");
  }
}
