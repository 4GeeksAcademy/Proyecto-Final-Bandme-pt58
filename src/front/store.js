export const initialStore = () => {
  // Verificar si hay usuario guardado en localStorage
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  return {
    message: null,
    currentUser: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    posts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };

    case 'login':
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...store,
        currentUser: action.payload.user,
        token: action.payload.token
      };

    case 'logout':
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...store,
        currentUser: null,
        token: null
      };

    case 'set_posts':
      return {
        ...store,
        posts: action.payload
      };

    case 'add_post':
      return {
        ...store,
        posts: [action.payload, ...store.posts]
      };

    default:
      return store;
  }
}
