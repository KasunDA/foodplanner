const users = (state = {}, action) => {
  switch (action.type) {
    case 'INITIAL_USER':
      return Object.assign({}, state, action.localSettings);

    case 'SIGNIN':
    case 'REGISTER':
      if (action.status === "complete") {
        return Object.assign({}, state, action.data);
      }
      return state;
    case 'SAVE_SETTINGS':
      if (action.status === "complete") {
        return Object.assign({}, state, action.data, action.locally);
      }
      return state;

    case 'TRANSACTIONS':
      if (action.status === "complete") {
        return Object.assign({}, state, { transactions: action.data });
      }
      return state;

    case 'SIGNOUT':
      return {};

    case 'SEND_MONEY':
      if (action.status === "complete") {
        return { ...state, balance: state.balance - action.amount };
      }
      return state;

    default:
      return state;
  }
}

export default users;
